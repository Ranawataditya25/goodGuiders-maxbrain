// src/components/VideoCall.jsx
import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Video from "twilio-video";
import axios from "axios";

/**
 * VideoCall: shows one remote area and one small local preview.
 * - Attaches only video tracks
 * - Avoids duplicate attachments using data-sid
 * - Ensures End Call button is above everything (z-index)
 */
export default function VideoCall({ userName, roomName, uniqueName, onClose }) {
  const [room, setRoom] = useState(null);
  const localVideoRef = useRef();
  const remoteVideosRef = useRef();

  // helper to attach a track but avoid duplicates
  const attachTrack = (track, container = remoteVideosRef) => {
    if (!track || !container.current) return;
    try {
      const sid = track.sid || track.trackSid || track.mediaStreamTrack?.id;
      if (container.current.querySelector(`[data-track="${sid}"]`)) return;

      const el = track.attach();
      el.setAttribute("data-track", sid);
      el.style.width = "100%";
      el.style.height = "100%";
      el.style.objectFit = "cover";
      container.current.appendChild(el);
    } catch (e) {
      console.warn("attachTrack error", e);
    }
  };

  const detachTrackElementsBySid = (sid) => {
    if (!remoteVideosRef.current) return;
    const els = remoteVideosRef.current.querySelectorAll(`[data-track="${sid}"]`);
    els.forEach((el) => {
      try {
        el.remove();
      } catch (e) {
        console.warn("Ignored error:", e);
      }
    });
  };

  // ------------------------------
  // Poll backend for call status
  // ------------------------------
  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const res = await axios.get(`http://127.0.0.1:5000/api/video/${uniqueName}`);
        if (res.data.callStatus === "idle") {
          onClose(); // close modal if other participant ended/declined
        }
      } catch (err) {
        console.error("Polling call status error:", err);
      }
    }, 2000);
  
    return () => clearInterval(interval);
  }, [uniqueName, onClose]);

  // ------------------------------
  // Join Twilio room
  // ------------------------------
  useEffect(() => {
    let activeRoom;
    const joinRoom = async () => {
      try {
        const { data } = await axios.get(
          `http://127.0.0.1:5000/api/video/token?identity=${encodeURIComponent(userName)}&room=${encodeURIComponent(roomName)}`
        );
        activeRoom = await Video.connect(data.token, { audio: true, video: true });
        setRoom(activeRoom);

        // Attach local video
        const attachLocal = () => {
          if (!localVideoRef.current) return;
          localVideoRef.current.innerHTML = "";
          activeRoom.localParticipant.videoTracks.forEach((pub) => {
            const track = pub.track;
            if (!track) return;
            attachTrack(track, localVideoRef);
          });
        };
        attachLocal();

        // Attach remote participants
        const attachParticipant = (participant) => {
          participant.tracks.forEach((pub) => {
            if (!pub.track) return;
            if (pub.track.kind !== "video") return;
            attachTrack(pub.track);
          });

          participant.on("trackSubscribed", (track) => {
            if (track.kind !== "video") return;
            attachTrack(track);
          });

          participant.on("trackUnsubscribed", (track) => {
            const sid = track.sid || track.trackSid || track.mediaStreamTrack?.id;
            detachTrackElementsBySid(sid);
          });
        };

        activeRoom.participants.forEach(attachParticipant);
        activeRoom.on("participantConnected", attachParticipant);
        activeRoom.on("participantDisconnected", (participant) => {
          detachTrackElementsBySid(participant.sid);
        });

        activeRoom.localParticipant.on("trackPublished", attachLocal);
      } catch (err) {
        console.error("Error joining Twilio room:", err);
      }
    };

    joinRoom();

    return () => {
      if (activeRoom) {
        activeRoom.localParticipant.tracks.forEach((pub) => {
          try {
            pub.track.stop && pub.track.stop();
            pub.track.detach &&
              pub.track.detach().forEach((el) => el.remove());
          } catch (e) {
            console.warn("Ignored error:", e);
          }
        });
        if (remoteVideosRef.current) remoteVideosRef.current.innerHTML = "";
        if (localVideoRef.current) localVideoRef.current.innerHTML = "";
        activeRoom.disconnect();
      }
    };
  }, [userName, roomName]);

  // ------------------------------
  // End call handler
  // ------------------------------
  const handleEndCall = async () => {
    try {
      if (room) room.disconnect();
      // setRoom(null);
      await axios.put(`http://127.0.0.1:5000/api/video/${uniqueName}/end-call`);
      onClose();
    } catch (e) {
      console.error("handleEndCall error:", e);
    }
  };

  // ------------------------------
  // Render UI
  // ------------------------------
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#000",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2147483647,
      }}
    >
      <div
        ref={remoteVideosRef}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          padding: "8px",
        }}
      />
      <div
        ref={localVideoRef}
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          width: 180,
          height: 120,
          borderRadius: 12,
          overflow: "hidden",
          border: "2px solid rgba(255,255,255,0.9)",
          background: "#222",
          zIndex: 2147483648,
        }}
      />
      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2147483649,
        }}
      >
        <button
          onClick={handleEndCall}
          style={{
            background: "#e53935",
            color: "#fff",
            border: "none",
            padding: "10px 18px",
            borderRadius: 999,
            fontWeight: "600",
            cursor: "pointer",
            boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
          }}
        >
          End Call
        </button>
      </div>
    </div>
  );
}

VideoCall.propTypes = {
  userName: PropTypes.string.isRequired,
  roomName: PropTypes.string.isRequired,
  uniqueName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
