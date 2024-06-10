import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-chat-elements/dist/main.css";

import useSocketIO from "../../utils/socket/useSocketIO";
import { takeExam } from "../../Redux/features/dataActions";
import axios from "axios";

import ExamStartConfirmationModal from "./ExamStartConfirmationModal";
import ExamScreen from "./ExamScreen";
import moment from "moment";

const TakeExamScreen = () => {
  const { user } = useSelector((state) => state.auth);
  const [startExam, setStartExam] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [takeExamId, setTakeExamId] = useState("");
  const [userAnswersId, setUserAnswersId] = useState("");
  const [examinee, setExaminee] = useState({});

  const [exam, setExam] = useState(null);
  const [socket] = useSocketIO();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { id } = useParams();

  // useEffect to join chat room for examinee
  useEffect(() => {
    // console.log("this is runnning and start is changing");
    if (startExam) {
      const now = moment().format("YYYY-MM-DD HH:mm:ss");
      dispatch(takeExam({id, now}))
        .then((res) => {
          console.log(res.payload);
          if (res.meta.requestStatus === "fulfilled") {
            const temp = res.payload.data._id;
            setTakeExamId(temp);
            setUserAnswersId(res.payload.data.userAnswers);
            // console.log(
            //   temp,
            //   "takeExamId",
            //   res.payload.data.userAnswers,
            //   "userAnswersId"
            // );

            socket.emit("joinExam", id, res.payload.data._id);
          } else {
            toast.error(res.payload.message);
            exitFullscreen();
            navigate(-1);
            return;
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("There is some error in the server!");
        });
    }
  }, [startExam]);

  useEffect(() => {
    const getTakeExamId = async (takeExamId) => {
      try {
        const response = await axios.get(`/api/exams/exam-taker/${takeExamId}`);

        console.log(response, "resp getTakeExamId  ");
        const tempExaminee = response.data.data.data[0];
        console.log(tempExaminee);

        setExaminee(response.data.data.data[0]);
        console.log(examinee);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (takeExamId) {
      getTakeExamId(takeExamId);
    }
  }, [takeExamId]);

  // useEffect to load the exam
  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const response = await axios.get(`/api/exams/${id}`);
        setExam(response.data.data.data[0]);
        console.log("this is the data", response.data.data.data[0]);
      } catch (error) {
        console.error("Error fetching exam details:", error);
        toast.error("Failed to fetch exam details");
      }
    };

    fetchExamDetails();
  }, [id]);

  const requestFullscreen = async () => {
    const element = document.documentElement;

    if (element.requestFullscreen) {
      await element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      await element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      await element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      await element.msRequestFullscreen();
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


  const handleStartExam = () => {
    setStartExam(true);
    if (exam) {
      exam?.securityLevel === "high" && requestFullscreen();

    }
  };

  const handleCancelFinishExam = () => {
    toast.success("Exited the Exam!");
    setStartExam(false);
  };


  return !startExam ? (
    <div>
      {" "}
      <ExamStartConfirmationModal handleStartExam={handleStartExam} />{" "}
    </div>
  ) : (
    <div>
      {" "}
      <ExamScreen
        socket={socket}
        exam={exam}
        examinee={examinee}
        requestFullscreen={requestFullscreen}
        userAnswersId={userAnswersId}
        startExam={startExam}
        takeExamId={takeExamId}
        setStartExam={setStartExam}
        exitFullscreen={exitFullscreen}
      />{" "}
    </div>
  );
};
export default TakeExamScreen;
