import { useEffect, useRef } from "react";
import Peer from "peerjs";

const VideoComponent = ({ socket }) => {
  const videoRef = useRef(null);
  const peerClientRef = useRef(null);

  useEffect(() => {
    let stream;

    const setupVideoStream = async () => {
      try {
        if (navigator) {
          console.log(navigator, "here is the navigator");
          stream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
          });

          if (videoRef.current) {
            addVideoStream(videoRef.current, stream);
          }

          peerClientRef.current = new Peer();

          peerClientRef.current.on("open", (streamerId) => {
            socket.emit("join-as-streamer", streamerId);
          });

          peerClientRef.current.on("close", () => {
            socket.emit("disconnect-as-streamer");
          });

          socket.on("viewer-connected", (viewerId) => {
            console.log("viewer connected");
            connectToNewViewer(viewerId, stream);
          });

          peerClientRef.current.on("error", (err) => {
            console.error("PeerJS error:", err);
          });
        }
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    setupVideoStream();

    return () => {
      if (peerClientRef.current) {
        peerClientRef.current.destroy();
      }

      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }

      socket.off("viewer-connected");
    };
  }, [socket, navigator]);

  const addVideoStream = (videoElement, stream) => {
    videoElement.srcObject = stream;
    videoElement.muted = true;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  };

  const connectToNewViewer = (viewerId, stream) => {
    const call = peerClientRef.current.call(viewerId, stream);
    call.on("error", (err) => {
      console.error("Call error:", err);
    });
  };

  return (
    <div>
      <video
        id="video"
        width="340"
        height="120"
        autoPlay
        ref={videoRef}
        muted
      />
    </div>
  );
};

export default VideoComponent;
