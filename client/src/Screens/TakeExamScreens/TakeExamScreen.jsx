import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";

const TakeExamScreen = () => {
  const socket = io("http://localhost:3000");
  const roomId = "123efr";
  const { user } = useSelector((state) => state.auth);
  const userId = user._id;
  const [startExam, setStartExam] = useState(false);
  const[isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    socket.emit("joinRoom", { userId, roomId });
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('keyup', handleKeyUp);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const requestFullscreen = () => {
    const element = document.documentElement;

    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };

  const exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  const handleFullscreenChange = () => {
    if (
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement
    ) {
      setIsFullscreen(true);
    } else {
      setIsFullscreen(false);
      requestFullscreen(); // Re-request fullscreen to prevent exit
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "Escape" & isFullscreen) {
      requestFullscreen();
    }
  };

  const handleStartExam = () => {
    setStartExam(true);
    // requestFullscreen()
  };

  const handleFinishExam = () => {
    setStartExam(false);
    // exitFullscreen();
  }

  return !startExam ? (
    <div> <button onClick={handleStartExam}>Start Exam</button> </div>
  ) : (
    <div>TakeExamScreen <button onClick={handleFinishExam}>Finish</button></div>
  );

}
  
export default TakeExamScreen;
