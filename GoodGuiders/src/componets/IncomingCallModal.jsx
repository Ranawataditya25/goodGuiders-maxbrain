import { Button } from "react-bootstrap";
import { useCall } from "../context/CallContext";
import { useNavigate } from "react-router-dom";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export default function IncomingCallModal() {
  const { incomingCall, setIncomingCall, audioUnlocked, unlockAudio, stopRinging } = useCall();
  const navigate = useNavigate();

  if (!incomingCall) return null;

  const acceptCall = async () => {
    // stop ringing locally immediately
    try {
      stopRinging();
    } catch (e) {}

    try {
      await fetch(
        `${API}/video/${incomingCall.uniqueName}/answer-call`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            caller: incomingCall.caller,
            receiverId: incomingCall.receiverId,
          }),
        }
      );
    } catch (err) {
      console.error("Accept call API failed:", err);
    }

    setIncomingCall(null);

    // derive short display name (before @) so ChatPage shows friendly name instead of email
    const shortName = String(incomingCall.caller || "").split("@")[0] || incomingCall.caller;

    navigate(`/chat/${encodeURIComponent(incomingCall.caller)}`, {
      state: {
        autoJoinCall: true,
        uniqueName: incomingCall.uniqueName,
        mentorName: shortName,
      },
    });
  };

  const rejectCall = async () => {
    // stop ringing locally immediately
    try {
      stopRinging();
    } catch (e) {}

    try {
      await fetch(
        `${API}/video/${incomingCall.uniqueName}/end-call`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            caller: incomingCall.caller,
            receiverId: incomingCall.receiverId,
            reason: "rejected",
          }),
        }
      );
    } catch (err) {
      console.error("Reject call API failed:", err);
    }

    setIncomingCall(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded shadow text-center">
        <h5>{incomingCall.caller} is calling</h5>

        <div className="d-flex gap-2 justify-content-center mt-3">
          {!audioUnlocked && (
            <Button variant="secondary" onClick={unlockAudio}>
              Enable sound
            </Button>
          )}

          <Button variant="success" onClick={acceptCall}>
            Accept
          </Button>

          <Button variant="danger" onClick={rejectCall}>
            Reject
          </Button>
        </div>
      </div>
    </div>
  );
}