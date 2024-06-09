import { useCallback, useEffect, useRef, useState } from "react";
import Peer from "peerjs";
import * as faceapi from "face-api.js";
import axios from "axios";
import { toast } from "react-toastify";
import debounce from "lodash/debounce";

const VideoComponent = ({ socket, takeExamId }) => {
  const videoRef = useRef(null);
  const peerClientRef = useRef(null);
  const [stream, setStream] = useState(null);
  const canvasRef = useRef(null);
  const [videoOnPlay, setVideoOnPlay] = useState(false);

  // capture the canvas image
  const captureCanvaImage = async () => {
    console.log("chap", canvasRef.current, videoRef.current);
    // get the canvas from canvasRef
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // draw the video element to the canvas
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    // get the image data from the canvas
    const imageData = canvas.toDataURL("image/png");

    //download the image to check
    // const a = document.createElement("a");
    // a.href = imageData;
    // a.download = "image.png";
    // a.click();

    // convert the data URL to a Blob
    const response = await fetch(imageData);
    const blob = await response.blob();

    // create an image file from the Blob
    const imageFile = new File([blob], "image.png", {
      type: "image/png",
    });

    // send the image to the server
    try {
      const formData = new FormData();
      formData.append("image", imageFile);
      // add the take exam id to the form data
      formData.append("takeExamId", takeExamId);

      // send the image to the server using axios
      const response = await axios.post("/api/exams/take-exam/ai", formData);
    } catch (error) {}
  };

  const debounceHandleImageCapture = useCallback(
    debounce(captureCanvaImage, 10000),
    []
  );

  const handleCapture = () => {
    console.log("capturing image debounce");
    // debounce the image capture
    debounceHandleImageCapture();
  };

  // Setup video stream
  useEffect(() => {
    const modelUrl = `${import.meta.env.VITE_CLIENT_URL}models`;
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

        faceapi.matchDimensions(canvasElement, displaySize);
        setInterval(async () => {
          const detections = await faceapi
            .detectAllFaces(
              videoElement,
              new faceapi.TinyFaceDetectorOptions({ scoreThreshold: 0.1 })
            )
            .withFaceLandmarks();

          if (detections.length > 1 || detections.length === 0) {
            // handleCapture();
            captureCanvaImage();
          }

          const resizedDetections = faceapi.resizeResults(
            detections,
            displaySize
          );
          canvasElement
            .getContext("2d")
            .clearRect(0, 0, canvasElement.width, canvasElement.height);
          faceapi.draw.drawDetections(canvasElement, resizedDetections);
          faceapi.draw.drawFaceLandmarks(canvasElement, resizedDetections);
        }, 10000);
      });
    });

    const setupVideoStream = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        setStream(mediaStream);

        if (videoRef.current) {
          addVideoStream(videoRef.current, mediaStream);
        }
      } catch (error) {
        console.error("Error accessing media devices:", error);
      }
    };

    setupVideoStream();

    return () => {
      // Stop video stream tracks
      // reload the page
      window.location.reload();

      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }

      // Clear the video element's srcObject
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  // Setup PeerJS and socket listeners
  useEffect(() => {
    // Initialize PeerJS with optional custom server settings
    peerClientRef.current = new Peer();

    peerClientRef.current.on("open", (streamerId) => {
      socket.emit("join-as-streamer", streamerId);
    });

    peerClientRef.current.on("close", () => {
      socket.emit("disconnect-as-streamer");
    });

    socket.on("viewer-connected", (viewerId) => {
      console.log("viewer connected");
      connectToNewViewer(viewerId);
    });

    socket.on("viewer-disconnected", () => {
      console.log("viewer disconnected");
    });

    peerClientRef.current.on("error", (err) => {
      console.error("PeerJS error:", err);
    });

    return () => {
      // Destroy PeerJS instance and remove socket listeners
      if (peerClientRef.current) {
        peerClientRef.current.destroy();
      }
      socket.off("viewer-connected");
      socket.off("viewer-disconnected");
    };
  }, [socket]);

  // Function to add video stream to a video element
  const addVideoStream = (videoElement, stream) => {
    videoElement.srcObject = stream;
    videoElement.muted = true;
    videoElement.onloadedmetadata = () => {
      videoElement.play();
    };
  };

  // Function to connect to a new viewer using PeerJS
  const connectToNewViewer = (viewerId) => {
    if (peerClientRef.current && stream) {
      const call = peerClientRef.current.call(viewerId, stream);
      call.on("error", (err) => {
        console.error("Call error:", err);
      });
    }
  };

  return (
    <div id="video_container" className="relative hidden">
      <video
        onPlay={() => videoOnPlay && videoOnPlay()}
        ref={videoRef}
        id="video"
        width="340"
        height="255"
        className="h-auto max-w-none "
      />
      <canvas
        className="absolute top-0 left-0"
        width="340"
        height="255"
        ref={canvasRef}
        id="canvas"
      />
    </div>
  );
};

export default VideoComponent;
