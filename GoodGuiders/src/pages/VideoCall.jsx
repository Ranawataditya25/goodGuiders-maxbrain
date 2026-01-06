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

import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Video from "twilio-video";
import axios from "axios";
import { io } from "socket.io-client";

export default function VideoCall({
  userName,
  uniqueName,
  receiverId,
  onClose,
}) {
  const roomRef = useRef(null);
  const socketRef = useRef(null);
  const audioElsRef = useRef([]);
  const localVideoRef = useRef(null);
  const remoteVideosRef = useRef(null);
  const joinedRef = useRef(false);
  const closedRef = useRef(false);

  const [isMuted, setIsMuted] = useState(false);
  const [canJoin, setCanJoin] = useState(true);

  /* =======================
     HELPER: CLEANUP ALL
  ======================= */
const cleanupAll = (source) => {
  console.log("🧹 CLEANUP START from:", source);

  joinedRef.current = false;
  closedRef.current = false;
  setIsMuted(false);

  if (roomRef.current) {
    // 🔥 STOP LOCAL TRACKS EXPLICITLY
    roomRef.current.localParticipant.tracks.forEach((publication) => {
      publication.track.stop();
      publication.track.detach().forEach(el => el.remove());
    });

    roomRef.current.disconnect();
    roomRef.current = null;
  }

  // 🔥 STOP REMOTE AUDIO ELEMENTS
  audioElsRef.current.forEach(el => {
    el.pause();
    el.srcObject = null;
    el.remove();
  });
  audioElsRef.current = [];

  if (localVideoRef.current) localVideoRef.current.innerHTML = "";
  if (remoteVideosRef.current) remoteVideosRef.current.innerHTML = "";

setCanJoin(false);
  setTimeout(() => {
    setCanJoin(true);
    console.log("⏳ Media devices released, ready for next call");
  }, 1500);

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
      console.log("✅ Socket connected:", socketRef.current.id);
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
    if (!canJoin) {
    console.warn("⛔ Skipping join: media not released yet");
    return;
  }
    if (joinedRef.current) return;
    joinedRef.current = true;

    console.log("🚀 VideoCall mounted");

    const joinRoom = async () => {
      try {
        console.log("🔑 fetching token");

        const { data } = await axios.get(
          `http://127.0.0.1:5000/api/video/token?identity=${encodeURIComponent(
            userName
          )}&room=${encodeURIComponent(uniqueName)}`
        );
        console.log("✅ Token received");

        console.log("🔗 Connecting to Twilio room...");

        roomRef.current = await Video.connect(data.token, {
          audio: true,
          video: { facingMode: "user" },
        });
        console.log("✅ Room connected:", roomRef.current.name);

        roomRef.current.localParticipant.tracks.forEach((publication) => {
          if (publication.track.kind === "video" && localVideoRef.current) {
            const el = publication.track.attach();
            el.style.width = "100%";
            el.style.height = "100%";
            el.style.objectFit = "cover";
            el.style.position = "absolute";
            el.style.top = "0";
            el.style.left = "0";
            localVideoRef.current.appendChild(el);
            console.log("🎥 Local video track attached");
          }
        });

        roomRef.current.participants.forEach((participant) => {
          participant.tracks.forEach((publication) => {
            if (publication.track) {
              const el = publication.track.attach();

              if (publication.track.kind === "video") {
                el.style.position = "absolute";
                el.style.top = "0";
                el.style.left = "0";
                el.style.width = "100vw";
                el.style.height = "100vh";
                el.style.objectFit = "cover";
                el.style.backgroundColor = "black";
                remoteVideosRef.current?.replaceChildren(el);
              }

              if (publication.track.kind === "audio") {
                el.autoplay = true;
                el.controls = false;
                el.autoplay = true;
                el.controls = false;
                document.body.appendChild(el);
                audioElsRef.current.push(el);
              }
            }
          });
        });

        roomRef.current.on("trackSubscribed", (track) => {
          console.log(`📡 Track subscribed: ${track.kind}`);

          const el = track.attach();

          if (track.kind === "video") {
            console.log("🎥 Remote video attached");

            el.style.position = "absolute";
            el.style.top = "0";
            el.style.left = "0";
            el.style.width = "100vw";
            el.style.height = "100vh";
            el.style.objectFit = "cover";
            el.style.backgroundColor = "black";

            remoteVideosRef.current?.replaceChildren(el);
          }

          if (track.kind === "audio") {
            console.log("🔊 Remote audio attached");

            el.autoplay = true;
            el.controls = false;
            el.autoplay = true;
            el.controls = false;
            document.body.appendChild(el);
            audioElsRef.current.push(el);
          }
        });
        roomRef.current.on("trackUnsubscribed", (track) => {
          track.detach().forEach((el) => el.remove());
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
  }, [canJoin]);

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

  const toggleMute = () => {
    if (!roomRef.current) return;

    roomRef.current.localParticipant.audioTracks.forEach((publication) => {
      if (isMuted) {
        publication.track.enable();
      } else {
        publication.track.disable();
      }
    });

    console.log(isMuted ? "🎤 Mic unmuted" : "🔇 Mic muted");
    setIsMuted(!isMuted);
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
          inset: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "black",
        }}
      />

      {/* Local preview */}
      <div
        ref={localVideoRef}
        style={{
          position: "absolute",
          bottom: 20,
          right: 20,
          width: "22vw",
          maxWidth: 280,
          aspectRatio: "16 / 9",
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
          gap: 2,
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
        <button
          onClick={toggleMute}
          style={{
            background: isMuted ? "#e53935" : "#1faa59",
            color: "#fff",
            border: "none",
            padding: "10px 10px",
            borderRadius: "50%",
            width: 48,
            height: 48,
            fontSize: 18,
            cursor: "pointer",
            marginRight: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
          }}
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? "🔇" : "🔊"}
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
