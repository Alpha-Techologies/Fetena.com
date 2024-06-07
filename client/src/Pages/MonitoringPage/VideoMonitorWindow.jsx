import { useRef } from "react";
import Peer from "peerjs";



const VideoMonitorWindow = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  // const [socket, setSocket] = useState(null);
  const [myPeer, setMyPeer] = useState(null);
  const [videoOnPlay, setVideoOnPlay] = useState(false);

  useEffect(({socket}) => {
    const modelUrl = "http://localhost:4000/models";
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri(modelUrl),
      faceapi.nets.faceLandmark68Net.loadFromUri(modelUrl),
      faceapi.nets.faceRecognitionNet.loadFromUri(modelUrl),
      faceapi.nets.faceExpressionNet.loadFromUri(modelUrl),
    ]).then(() => {
      const videoElement = videoRef.current;
      const canvasElement = canvasRef.current;
      const displaySize = {
        width: videoElement.width,
        height: videoElement.height,
      };

      setVideoOnPlay(() => {
        canvasElement

          .getContext("2d")
          .clearRect(0, 0, canvasElement.width, canvasElement.height);
        console.log("adding the vancaf");
        faceapi.matchDimensions(canvasElement, displaySize);
        setInterval(async () => {
          const detections = await faceapi
            .detectAllFaces(
              videoElement,
              new faceapi.TinyFaceDetectorOptions()
            )
            .withFaceLandmarks();
          console.log(detections.length);

          const resizedDetections = faceapi.resizeResults(
            detections,
            displaySize
          );
          canvasElement
            .getContext("2d")
            .clearRect(0, 0, canvasElement.width, canvasElement.height);
          faceapi.draw.drawDetections(canvasElement, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvasElement, resizedDetections);
        }, 100);
      });
    });

    // const newSocket = io("http://localhost:3000", {
    //   transports: ["websocket"],
    // });
    // setSocket(newSocket);

    const newPeer = new Peer();
    setMyPeer(newPeer);

    // newSocket.on("connect", () => {
    //   console.log("Connected as viewer");
    // });
    console.log(socket, "the socket");

    if (socket) {
      newPeer.on("open", (viewerId) => {
        socket.emit("join-as-viewer", viewerId);
      });

      newPeer.on("call", (call) => {
        call.answer();
        call.on("stream", (stream) => {
          addVideoStream(videoRef.current, stream);
        });
      });

      newPeer.on("connection", (conn) => {
        conn.on("close", () => {
          setTimeout(reload, 1000);
        });
      });
      console.log(socket, "socekt");

      socket.on("disconnect", () => {
        console.log("disconnected viewer");
      });
    }

    return () => {
      newPeer.disconnect();
    };
  }, [socket]);

  const addVideoStream = (video, stream) => {
    video.srcObject = stream;
    video.addEventListener("loadedmetadata", () => {
      video.play();
    });
  };

  const reload = () => {
    window.location.reload();
  };

  const soundToggle = () => {
    console.log("sound toggle", videoRef.current.muted);
    videoRef.current.muted = !videoRef.current.muted;
  };

  return (
    <div
      id='video_container'
      className='relative'>
      <video
        onPlay={() => videoOnPlay && videoOnPlay()}
        ref={videoRef}
        id='video'
        width='340'
        height='255'
        className='h-auto max-w-none '
      />
      <canvas
        className='absolute top-0 left-0'
        width='340'
        height='255'
        ref={canvasRef}
        id='canvas'
      />
      <button
        className='cursor-pointer'
        onClick={soundToggle}>
        {videoRef.current.muted ? "Unmute" : "Mute"}
      </button>
    </div>
  );
};

export default VideoMonitorWindow;