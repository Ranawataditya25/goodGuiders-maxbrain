import { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import Video from "twilio-video";

export default function VideoCall({ userName, roomName, onClose }) {
  const [room, setRoom] = useState(null);
  const localVideoRef = useRef();
  const remoteVideosRef = useRef();

  useEffect(() => {
    let activeRoom;

    const joinRoom = async () => {
      try {
        const res = await fetch(
          `http://127.0.0.1:5000/api/video/token?identity=${userName}&room=${roomName}`
        );
        const data = await res.json();

        const joinedRoom = await Video.connect(data.token, {
          video: true,
          audio: true,
        });

        activeRoom = joinedRoom;
        setRoom(joinedRoom);

        // Attach your local video
        joinedRoom.localParticipant.videoTracks.forEach((publication) => {
          localVideoRef.current.innerHTML = "";
          localVideoRef.current.appendChild(publication.track.attach());
        });

        // Attach remote participants
        const attachParticipantTracks = (participant) => {
          participant.tracks.forEach((publication) => {
            if (publication.isSubscribed) {
              remoteVideosRef.current.appendChild(publication.track.attach());
            }
          });
          participant.on("trackSubscribed", (track) => {
            remoteVideosRef.current.appendChild(track.attach());
          });
        };

        joinedRoom.participants.forEach(attachParticipantTracks);
        joinedRoom.on("participantConnected", attachParticipantTracks);

        joinedRoom.on("participantDisconnected", (participant) => {
          console.log(`${participant.identity} disconnected`);
        });
      } catch (error) {
        console.error("Error joining room:", error);
      }
    };

    joinRoom();

    return () => {
      if (activeRoom) {
        activeRoom.localParticipant.tracks.forEach((publication) => {
          publication.track.stop();
          publication.track.detach().forEach((el) => el.remove());
        });
        activeRoom.disconnect();
        console.log("Disconnected from room cleanup");
      }
    };
  }, [userName, roomName]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col justify-center items-center z-50">
      {/* Remote videos */}
      <div
        ref={remoteVideosRef}
        className="absolute top-0 left-0 w-full h-full grid grid-cols-2 grid-rows-2 gap-1 p-1"
      />

      {/* Local video small */}
      <div
        ref={localVideoRef}
        className="absolute bottom-6 right-6 w-48 h-36 border-2 border-white rounded-xl overflow-hidden shadow-lg"
      />

      {/* End call button */}
      <button
        onClick={() => {
          if (room) {
            room.disconnect();
            setRoom(null);
          }
          onClose();
        }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-red-600 text-white px-5 py-2 rounded-full shadow-lg z-50"
      >
        End Call
      </button>
    </div>
  );
}

VideoCall.propTypes = {
  userName: PropTypes.string.isRequired,
  roomName: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};
