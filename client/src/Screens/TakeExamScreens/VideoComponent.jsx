import { useRef } from "react";
import Peer from "peerjs";



const VideoComponent = ({socket}) => {
  const videoRef = useRef(null);
  const peerClientRef = useRef(null);

  useEffect(() => {
    const setupVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (videoRef.current) {
          addVideoStream(videoRef.current, stream);
        }

        peerClientRef.current = new Peer();

        peerClientRef.current.on('open', (streamerId) => {
          socket.emit('join-as-streamer', streamerId);
        });

        peerClientRef.current.on('close', (streamerId) => {
          socket.emit('disconnect-as-streamer', streamerId);
        });

        socket.on('viewer-connected', (viewerId) => {
          console.log('viewer connected');
          connectToNewViewer(viewerId, stream);
        });

      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    setupVideoStream();

    return () => {
      if (peerClientRef.current) {
        peerClientRef.current.destroy();
      }

    };
  }, []);

  const addVideoStream = (videoElement, stream) => {
    videoElement.srcObject = stream;
    videoElement.muted = true;

    const videoOnPlay = () => {
      videoElement.play();
    };

    videoElement.onloadedmetadata = videoOnPlay;
  };

  const connectToNewViewer = (viewerId, stream) => {
    peerClientRef.current.call(viewerId, stream);
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


export default VideoComponent