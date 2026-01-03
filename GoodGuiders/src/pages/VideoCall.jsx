// // src/components/VideoCall.jsx
// import { useEffect, useRef, useState } from "react";
// import PropTypes from "prop-types";
// import { Video, createLocalAudioTrack, createLocalVideoTrack } from "twilio-video";
// import axios from "axios";

// /**
//  * VideoCall: shows one remote area and one small local preview.
//  * - Attaches only video tracks
//  * - Avoids duplicate attachments using data-sid
//  * - Ensures End Call button is above everything (z-index)
//  */
// export default function VideoCall({
//   userName,
//   // roomName,
//   uniqueName,
//   receiverId,
//   onClose,
// }) {
//   const [room, setRoom] = useState(null);
//   const localVideoRef = useRef();
//   const remoteVideosRef = useRef();
//   // const audioElsRef = useRef([]);
//   const closedRef = useRef(false);
//   // const startedRef = useRef(false);
//   const joinedRef = useRef(false);
//   const errorShownRef = useRef(false);

//   // helper to attach a track but avoid duplicates
//   const attachTrack = (track, container = remoteVideosRef) => {
//     if (!track || !container.current) return;
//     try {
//       const sid = track.sid || track.trackSid || track.mediaStreamTrack?.id;
//       if (container.current.querySelector(`[data-track="${sid}"]`)) return;

//       const el = track.attach();
//       el.setAttribute("data-track", sid);
//       el.style.width = "100%";
//       el.style.height = "100%";
//       el.style.objectFit = "contain";
// el.style.background = "black";
//       container.current.appendChild(el);
//     } catch (e) {
//       console.warn("attachTrack error", e);
//     }
//   };

//   const detachTrackElementsBySid = (sid) => {
//     if (!remoteVideosRef.current) return;
//     const els = remoteVideosRef.current.querySelectorAll(
//       `[data-track="${sid}"]`
//     );
//     els.forEach((el) => {
//       try {
//         el.remove();
//       } catch (e) {
//         console.warn("Ignored error:", e);
//       }
//     });
//   };

//   // ------------------------------
//   // Poll backend for call status
//   // ------------------------------
//   useEffect(() => {
//     const interval = setInterval(async () => {
//       try {
//         const res = await axios.get(
//           `http://127.0.0.1:5000/api/video/${uniqueName}`
//         );
//         if (res.data.callStatus === "ended") {
//           if (!closedRef.current) {
//             closedRef.current = true;
//             onClose();
//           } // close modal if other participant ended/declined
//         }
//       } catch (err) {
//         console.error("Polling call status error:", err);
//       }
//     }, 2000);

//     return () => clearInterval(interval);
//   }, [uniqueName, onClose]);

//   // ------------------------------
//   // Join Twilio room
//   // ------------------------------
//   // ------------------------------
//   // Join Twilio room (CORRECT)
//   // ------------------------------
// useEffect(() => {
//   let activeRoom;

//   const joinRoom = async () => {
//     if (joinedRef.current) return;
//     joinedRef.current = true;

//     try {
//       // 🎥 get camera ONCE
//       const videoTrack = await createLocalVideoTrack();
//       const audioTrack = await createLocalAudioTrack();

//       if (localVideoRef.current) {
//         localVideoRef.current.innerHTML = "";
//         localVideoRef.current.appendChild(videoTrack.attach());
//       }

//       const { data } = await axios.get(
//         `http://127.0.0.1:5000/api/video/token?identity=${encodeURIComponent(
//           userName
//         )}&room=${encodeURIComponent(uniqueName)}`
//       );

//       activeRoom = await Video.connect(data.token, {
//         tracks: [videoTrack, audioTrack],
//       });

//       setRoom(activeRoom);

//       activeRoom.participants.forEach(p => {
//         p.tracks.forEach(pub => pub.track && attachTrack(pub.track));
//       });

//       activeRoom.on("trackSubscribed", attachTrack);

//     } catch (err) {
//       console.error("Join room failed:", err);

//       // 🚫 SHOW ALERT ONLY ONCE
//       if (!errorShownRef.current) {
//         errorShownRef.current = true;
//         alert("Camera failed to start. Please close other apps using camera.");
//       }

//       onClose();
//     }
//   };

//   joinRoom();

//   return () => {
//     joinedRef.current = false;

//     if (activeRoom) {
//       activeRoom.localParticipant.tracks.forEach(pub => {
//         pub.track.stop();
//         pub.track.detach().forEach(el => el.remove());
//       });
//       activeRoom.disconnect();
//     }

//     if (localVideoRef.current) localVideoRef.current.innerHTML = "";
//     if (remoteVideosRef.current) remoteVideosRef.current.innerHTML = "";
//   };
// }, []);

//   // ------------------------------
//   // End call handler
//   // ------------------------------
//   const handleEndCall = async () => {
//     try {
//       if (room) room.disconnect();
//       // setRoom(null);
//       await axios.put(
//         `http://127.0.0.1:5000/api/video/${uniqueName}/end-call`,
//         {
//           caller: userName,
//           receiverId: receiverId, // or actual receiver userId/email
//           reason: "finished",
//         }
//       );
//       if (!closedRef.current) {
//         closedRef.current = true;
//         onClose();
//       }
//     } catch (e) {
//       console.error("handleEndCall error:", e);
//     }
//   };

//   // ------------------------------
//   // Render UI
//   // ------------------------------
//   return (
//     <div
//       style={{
//         position: "fixed",
//         inset: 0,
//         backgroundColor: "#000",
//         display: "flex",
//         alignItems: "center",
//         justifyContent: "center",
//         zIndex: 2147483647,
//       }}
//     >
//       <div
//         ref={remoteVideosRef}
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "100%",
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "center",
//           gap: "8px",
//           padding: "8px",
//         }}
//       />
//       <div
//         ref={localVideoRef}
//         style={{
//           position: "absolute",
//           bottom: 20,
//           right: 20,
//           width: 180,
//           height: 120,
//           borderRadius: 12,
//           overflow: "hidden",
//           border: "2px solid rgba(255,255,255,0.9)",
//           background: "#222",
//           zIndex: 2147483648,
//         }}
//       />
//       <div
//         style={{
//           position: "absolute",
//           bottom: 20,
//           left: "50%",
//           transform: "translateX(-50%)",
//           zIndex: 2147483649,
//         }}
//       >
//         <button
//           onClick={handleEndCall}
//           style={{
//             background: "#e53935",
//             color: "#fff",
//             border: "none",
//             padding: "10px 18px",
//             borderRadius: 999,
//             fontWeight: "600",
//             cursor: "pointer",
//             boxShadow: "0 6px 18px rgba(0,0,0,0.3)",
//           }}
//         >
//           End Call
//         </button>
//       </div>
//     </div>
//   );
// }

// VideoCall.propTypes = {
//   userName: PropTypes.string.isRequired,
//   // roomName: PropTypes.string.isRequired,
//   uniqueName: PropTypes.string.isRequired,
//   receiverId: PropTypes.string.isRequired,
//   // tracks: PropTypes.array.isRequired,
//   onClose: PropTypes.func.isRequired,
// };

import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import Video, {
  createLocalAudioTrack,
  createLocalVideoTrack,
} from "twilio-video";
import axios from "axios";
import { io } from "socket.io-client";

export default function VideoCall({
  userName,
  uniqueName,
  receiverId,
  onClose,
}) {
  const roomRef = useRef(null);
  const videoTrackRef = useRef(null);
  const audioTrackRef = useRef(null);
  const socketRef = useRef(null);

  const localVideoRef = useRef(null);
  const remoteVideosRef = useRef(null);

  const joinedRef = useRef(false);
  const closedRef = useRef(false);

  /* =======================
     HELPER: CLEANUP ALL
  ======================= */
  const cleanupAll = (source) => {
    console.log("🧹 CLEANUP START from:", source);

    if (videoTrackRef.current) {
      console.log("🛑 stopping video track");
      videoTrackRef.current.stop();
      videoTrackRef.current.detach().forEach((el) => el.remove());
      videoTrackRef.current = null;
    }

    if (audioTrackRef.current) {
      console.log("🛑 stopping audio track");
      audioTrackRef.current.stop();
      audioTrackRef.current = null;
    }

    if (roomRef.current) {
      console.log("📴 disconnecting room");
      roomRef.current.disconnect();
      roomRef.current = null;
    }

    if (localVideoRef.current) localVideoRef.current.innerHTML = "";
    if (remoteVideosRef.current) remoteVideosRef.current.innerHTML = "";

    console.log("✅ CLEANUP DONE");
  };

  /* =======================
   SOCKET INIT
======================= */
  useEffect(() => {
    console.log("🔌 Connecting socket");

    socketRef.current = io("http://127.0.0.1:5000");

    socketRef.current.on("connect", () => {
      console.log("🆔 registering user on socket:", userName);

      socketRef.current.emit("register", userName);
    });

    return () => {
      console.log("❌ Disconnecting socket");
      socketRef.current?.disconnect();
      socketRef.current = null;
    };
  }, []);

  /* =======================
     JOIN ROOM
  ======================= */
  useEffect(() => {
    if (joinedRef.current) return;
    joinedRef.current = true;

    console.log("🚀 VideoCall mounted");

    const joinRoom = async () => {
      try {
        console.log("🎥 creating local tracks");

        videoTrackRef.current = await createLocalVideoTrack();
        audioTrackRef.current = await createLocalAudioTrack();

        if (localVideoRef.current) {
          localVideoRef.current.appendChild(videoTrackRef.current.attach());
        }

        console.log("🔑 fetching token");

        const { data } = await axios.get(
          `http://127.0.0.1:5000/api/video/token?identity=${encodeURIComponent(
            userName
          )}&room=${encodeURIComponent(uniqueName)}`
        );

        console.log("🔗 connecting to room");

        roomRef.current = await Video.connect(data.token, {
          tracks: [videoTrackRef.current, audioTrackRef.current],
        });

        console.log("✅ room connected");

        roomRef.current.on("trackSubscribed", (track) => {
          console.log("📡 remote track subscribed:", track.kind);
          remoteVideosRef.current?.appendChild(track.attach());
        });
      } catch (err) {
        console.error("❌ JOIN FAILED:", err);
        cleanupAll("join-failed");
        onClose();
      }
    };

    joinRoom();

    return () => {
      console.log("🔻 VideoCall unmount");
      cleanupAll("unmount");
    };
  }, []);

  /* =======================
   SOCKET: CALL ENDED
======================= */
  useEffect(() => {
    if (!socketRef.current) return;

    const onCallEnded = (data) => {
      if (data.uniqueName !== uniqueName) return;

      console.log("📴 call_ended received via socket");

      if (!closedRef.current) {
        closedRef.current = true;
        cleanupAll("remote-end");
        onClose(); // ✅ GO BACK TO CHAT PAGE
      }
    };

    socketRef.current.on("call_ended", onCallEnded);

    return () => {
      socketRef.current?.off("call_ended", onCallEnded);
    };
  }, [uniqueName]);

  /* =======================
     END CALL
  ======================= */
  const handleEndCall = async () => {
    if (closedRef.current) return;
    closedRef.current = true;

    console.log("☎️ END CALL clicked");

    try {
      await axios.put(
        `http://127.0.0.1:5000/api/video/${uniqueName}/end-call`,
        {
          caller: userName,
          receiverId,
          reason: "finished",
        }
      );
    } catch (err) {
      console.error("end-call API error:", err);
    }

    cleanupAll("manual-end");
    onClose();
  };

  /* =======================
     UI
  ======================= */
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
      {/* Remote video */}
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

      {/* Local preview */}
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

      {/* End button */}
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
  uniqueName: PropTypes.string.isRequired,
  receiverId: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
