import { createContext, useContext, useEffect, useRef, useState } from "react";
import useSound from "use-sound";
import PropTypes from "prop-types";
import { socket } from "../socket";

const CallContext = createContext();

export const CallProvider = ({ userEmail, children }) => {
  const [incomingCall, setIncomingCall] = useState(null);
  const incomingCallRef = useRef(null);
  const ringRef = useRef(false);
  const audioUnlockedRef = useRef(false);
  const [audioUnlocked, setAudioUnlocked] = useState(false);
  const audioElRef = useRef(null); // fallback ringtone audio element
  const acceptElRef = useRef(null); // fallback accept sound
  const rejectElRef = useRef(null); // fallback reject sound
  const missedElRef = useRef(null); // fallback missed sound


  const [playRing, ringControls] = useSound("/sounds/ringtone.mp3", {
    loop: true,
    interrupt: true,
  });

  const [playAccept] = useSound("/sounds/accepted.mp3");
  const [playReject] = useSound("/sounds/rejected.mp3");
  const [playMissed] = useSound("/sounds/missed.mp3");

useEffect(() => {
  // initialize fallback audio element once
  if (!audioElRef.current) {
    audioElRef.current = new Audio("/sounds/ringtone.mp3");
    audioElRef.current.preload = "auto";
    audioElRef.current.muted = false;
    audioElRef.current.volume = 1;

    // attach to DOM (display none) so some browsers allow playback on user gesture
    try {
      audioElRef.current.style.display = "none";
      if (!audioElRef.current.parentElement) document.body.appendChild(audioElRef.current);
    } catch (e) {
      console.warn("Could not append audio to DOM:", e);
    }

    // When the HTMLAudio element actually starts playing (e.g., manual console play or user gesture),
    // treat it as an audio unlock so deferred ringtones can start.
    const onPlaying = () => {
      console.log("🔓 HTMLAudio 'playing' event detected — unlocking audio");
      if (!audioUnlockedRef.current) {
        audioUnlockedRef.current = true;
        setAudioUnlocked(true);
        console.log("🔓 Audio unlocked via 'playing' event");
        if (incomingCallRef.current && !ringRef.current) {
          console.log("🔔 Starting ringtone after unlock via playing event");
          ringRef.current = true;
          safePlayRing().then((ok) => console.log("🔔 safePlayRing result:", ok));
        }
      }
    };

    const onAudioError = (e) => {
      console.error("Audio element error:", e);
    };

    audioElRef.current.addEventListener("playing", onPlaying);
    audioElRef.current.addEventListener("error", onAudioError);

    // initialize other short notification sounds (accept/reject/missed) as hidden audio elements
    try {
      acceptElRef.current = new Audio("/sounds/accepted.mp3");
      acceptElRef.current.preload = "auto";
      acceptElRef.current.muted = false;
      acceptElRef.current.volume = 1;
      acceptElRef.current.style.display = "none";
      document.body.appendChild(acceptElRef.current);

      rejectElRef.current = new Audio("/sounds/rejected.mp3");
      rejectElRef.current.preload = "auto";
      rejectElRef.current.muted = false;
      rejectElRef.current.volume = 1;
      rejectElRef.current.style.display = "none";
      document.body.appendChild(rejectElRef.current);

      missedElRef.current = new Audio("/sounds/missed.mp3");
      missedElRef.current.preload = "auto";
      missedElRef.current.muted = false;
      missedElRef.current.volume = 1;
      missedElRef.current.style.display = "none";
      document.body.appendChild(missedElRef.current);
    } catch (e) {
      console.warn("Could not append short notification audio elements:", e);
    }

    // cleanup listeners and element on unmount
    return () => {
      try {
        if (audioElRef.current) {
          audioElRef.current.removeEventListener("playing", onPlaying);
          audioElRef.current.removeEventListener("error", onAudioError);
          if (audioElRef.current.parentElement) audioElRef.current.parentElement.removeChild(audioElRef.current);
        }

        [acceptElRef, rejectElRef, missedElRef].forEach((ref) => {
          try {
            if (ref.current && ref.current.parentElement) ref.current.parentElement.removeChild(ref.current);
          } catch (e) {
            /* ignore */
          }
        });
      } catch (e) {
        console.warn("Error during audio cleanup:", e);
      }
    };
  }
}, []);

useEffect(() => {
  incomingCallRef.current = incomingCall;
}, [incomingCall]);

// Helper: try to play using useSound or fallback to HTMLAudio
const safePlayRing = async (opts) => {
  try {
    const maybe = playRing(opts);
    if (maybe && typeof maybe.then === "function") {
      await maybe;
    }

    console.log("🔊 use-sound play succeeded (library)");

    // Some browsers or the `use-sound` implementation may resolve a play promise
    // but not actually produce audible output (device/output mismatch or policy).
    // If we have a fallback HTMLAudio element available and it is still paused,
    // attempt to force it to play as a fallback.
    try {
      if (audioElRef.current && audioElRef.current.paused) {
        audioElRef.current.loop = true;
        audioElRef.current.muted = false;
        audioElRef.current.volume = 1;
        if (!audioElRef.current.parentElement) {
          audioElRef.current.style.display = "none";
          document.body.appendChild(audioElRef.current);
        }
        await audioElRef.current.play();
        console.log("🔊 Forced HTMLAudio fallback started after use-sound resolved", {
          paused: audioElRef.current.paused,
          muted: audioElRef.current.muted,
          volume: audioElRef.current.volume,
        });
      }
    } catch (e) {
      console.warn("Forced HTMLAudio fallback play failed:", e);
    }

    return true;
  } catch (err) {
    console.warn("use-sound failed to play, falling back to HTMLAudio:", err);
    try {
      if (audioElRef.current) {
        // ensure it's audible
        audioElRef.current.loop = true;
        audioElRef.current.muted = false;
        audioElRef.current.volume = 1;

        console.log("🔧 HTMLAudio fallback before play:", {
          src: audioElRef.current.src,
          muted: audioElRef.current.muted,
          volume: audioElRef.current.volume,
          paused: audioElRef.current.paused,
          currentTime: audioElRef.current.currentTime,
        });

        await audioElRef.current.play();

        console.log("🔊 HTMLAudio fallback play succeeded", {
          paused: audioElRef.current.paused,
          muted: audioElRef.current.muted,
          volume: audioElRef.current.volume,
          currentTime: audioElRef.current.currentTime,
        });

        return true;
      }
    } catch (fallbackErr) {
      console.error("Fallback audio play failed:", fallbackErr);
    }
    return false;
  }
};

// Helper to play short sounds (accept/reject/missed) with HTMLAudio fallback
const safePlaySound = async (playFn, fallbackRef, fallbackSrc) => {
  // First try the use-sound library (preferred)
  try {
    const maybe = playFn && playFn();
    if (maybe && typeof maybe.then === "function") await maybe;
    console.log("🔊 use-sound play succeeded (short sound)");

    // Even if use-sound resolved, ensure fallback element is playing (some platforms may not emit sound)
    try {
      const el = fallbackRef && fallbackRef.current;
      if (el && el.paused) {
        el.muted = false;
        el.volume = 1;
        await el.play();
        console.log("🔊 Forced HTMLAudio fallback short sound started after use-sound resolved", { src: el.src, paused: el.paused });
      }
    } catch (e) {
      console.warn("Forced fallback short sound after use-sound resolved failed:", e);
    }

    return true;
  } catch (err) {
    console.warn("use-sound failed for short sound, falling back to HTMLAudio:", err);
  }

  // Fallback: create or use provided HTMLAudio element and play it
  try {
    let el = fallbackRef && fallbackRef.current;
    if (!el && fallbackSrc) {
      el = new Audio(fallbackSrc);
      el.preload = "auto";
      el.muted = false;
      el.volume = 1;
      el.style.display = "none";
      fallbackRef.current = el;
      try { document.body.appendChild(el); } catch (e) {}
    }
    if (el) {
      await el.play();
      console.log("🔊 HTMLAudio fallback short sound played", { src: el.src });
      return true;
    }
  } catch (e) {
    console.error("Fallback short sound failed:", e);
  }

  return false;
};

const safeStopRing = () => { 
  try {
    ringControls.stop();
  } catch (e) {}
  try {
    if (audioElRef.current) {
      audioElRef.current.pause();
      audioElRef.current.currentTime = 0;
    }
  } catch (e) {}
  ringRef.current = false;
};

// Expose an unlock function so UI can call it explicitly (e.g., "Enable sound" button)
const unlockAudio = async () => {
  if (audioUnlockedRef.current) {
    return;
  }

  try {
    // attempt to play a short test sound to satisfy browser gesture requirement
    await safePlayRing({ forceSoundEnabled: true });

    setTimeout(() => {
      if (!incomingCallRef.current) {
        safeStopRing();
      }

      audioUnlockedRef.current = true;
      setAudioUnlocked(true);
      console.log("🔓 Audio unlocked");

      if (incomingCallRef.current && !ringRef.current) {
        console.log("🔔 Audio unlocked during incoming call — starting ringtone");
        ringRef.current = true;
        safePlayRing().then((ok) => console.log("🔔 safePlayRing result:", ok));
      }
    }, 800);
  } catch (e) {
    console.error("Audio unlock failed", e);
  }
};

useEffect(() => {
  // attach gesture listeners once to capture user gesture
  window.addEventListener("pointerdown", unlockAudio, { once: true });
  window.addEventListener("keydown", unlockAudio, { once: true });

  return () => {
    window.removeEventListener("pointerdown", unlockAudio);
    window.removeEventListener("keydown", unlockAudio);
  };
}, []);

  useEffect(() => {
    if (!socket || !userEmail) return;

    const onConnectLog = () => console.log("🔌 CallContext sees socket connected:", socket.id, "connected:", socket.connected);
    socket.on('connect', onConnectLog);
    onConnectLog();

    const onIncoming = (data, ack) => {
      console.log("📞 Incoming call socket event", data, "audioUnlocked:", audioUnlockedRef.current, "ringing:", ringRef.current);

      // send ack back so server knows we received the event
      try {
        if (typeof ack === "function") {
          ack({ received: true, socketId: socket.id });
        }
      } catch (e) {
        console.warn("ACK callback failed", e);
      }

      setIncomingCall({
        caller: data.from,
        uniqueName: data.uniqueName,
        receiverId: userEmail,
      });

      // debug: show fallback audio element state (if present)
      try {
        if (audioElRef.current) {
          console.log("🔍 audioEl state on incoming:", {
            src: audioElRef.current.src,
            muted: audioElRef.current.muted,
            volume: audioElRef.current.volume,
            paused: audioElRef.current.paused,
            currentTime: audioElRef.current.currentTime,
          });
        }
      } catch (e) {
        console.warn("Failed to read audioEl state", e);
      }

      try {
        if (!ringRef.current && audioUnlockedRef.current) {
          console.log("🔔 Starting ringtone");
          // mark ringing first so logs/reporting reflect the new state immediately
          ringRef.current = true;
          // use the safe player which handles both use-sound and HTMLAudio fallback
          safePlayRing()
            .then((ok) => console.log("🔔 safePlayRing result:", ok))
            .finally(() => console.log("🔔 ringRef after start:", ringRef.current));
        } else {
          console.log("🔕 Audio locked — ringtone deferred");
        }
      } catch (err) {
        console.error("❌ Failed to play ringtone", err);
      }
    };

    const onAccepted = () => {
      console.log("✅ Call accepted");
      if (ringRef.current) {
        console.log("🔕 Stopping ringtone");
        safeStopRing();
      }
      safePlaySound(playAccept, acceptElRef, "/sounds/accepted.mp3");
    };

    const onRejected = () => {
      console.log("❌ Call rejected");
      safeStopRing();
      safePlaySound(playReject, rejectElRef, "/sounds/rejected.mp3");
      setIncomingCall(null);
    };

    const onMissed = () => {
      console.log("⏱️ Call missed");
      safeStopRing();
      safePlaySound(playMissed, missedElRef, "/sounds/missed.mp3");
      setIncomingCall(null);
    };

    const onEnded = () => {
      console.log("📴 Call ended");
      safeStopRing();
      setIncomingCall(null);
    };

    socket.on("incoming_call", onIncoming);
    socket.on("call_accepted", onAccepted);
    socket.on("call_rejected", onRejected);
    socket.on("call_missed", onMissed);
    socket.on("call_ended", onEnded);

    return () => {
      socket.off('connect', onConnectLog);
      socket.off("incoming_call", onIncoming);
      socket.off("call_accepted", onAccepted);
      socket.off("call_rejected", onRejected);
      socket.off("call_missed", onMissed);
      socket.off("call_ended", onEnded);
    };
  }, [userEmail]);

useEffect(() => {
  const onVisibility = () => {
    if (
      document.visibilityState === "visible" &&
      incomingCall &&
      !ringRef.current &&
      audioUnlockedRef.current
    ) {
      safePlayRing();
      ringRef.current = true;
    }
  };

  document.addEventListener("visibilitychange", onVisibility);
  return () =>
    document.removeEventListener("visibilitychange", onVisibility);
}, [incomingCall]);

// Stop ringing when incomingCall is cleared (e.g., user rejected locally)
useEffect(() => {
  if (!incomingCall && ringRef.current) {
    console.log("🔕 incomingCall cleared — stopping ringtone");
    safeStopRing();
  }
}, [incomingCall]);

  return (
    <CallContext.Provider value={{ incomingCall, setIncomingCall, audioUnlocked, unlockAudio, stopRinging: safeStopRing }}>
      {children}
    </CallContext.Provider>
  );
};

CallProvider.propTypes = {
  userEmail: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export const useCall = () => useContext(CallContext);
