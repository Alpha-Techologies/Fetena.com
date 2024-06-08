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
          if (res.meta.requestStatus === "fulfilled") {
            // console.log(res.payload);
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
            console.log("go back");
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

  // useEffect to handle battery dispaly and screen change
  // useEffect(() => {
  //   document.addEventListener("fullscreenchange", handleFullscreenChange);
  //   document.addEventListener("visibilitychange", handleVisibilityChange);
  //   window.addEventListener("blur", handleBlur);

  //   const getBatteryInfo = async () => {
  //     try {
  //       const battery = await navigator.getBattery();
  //       setBatteryLevel(Math.round(battery.level * 100));
  //       setIsCharging(battery.charging);

  //       battery.addEventListener("chargingchange", () => {
  //         setIsCharging(battery.charging);
  //       });

  //       battery.addEventListener("levelchange", () => {
  //         setBatteryLevel(Math.round(battery.level * 100));
  //       });
  //     } catch (error) {
  //       console.error("Error getting battery information:", error);
  //     }
  //   };

  //   getBatteryInfo();

  //   return () => {
  //     document.removeEventListener("fullscreenchange", handleFullscreenChange);
  //     document.removeEventListener("visibilitychange", handleVisibilityChange);
  //     window.removeEventListener("blur", handleBlur);
  //   };
  // }, []);

  // useEffect to load the exam
  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const response = await axios.get(`/api/exams/${id}`);
        setExam(response.data.data.data[0]);
        console.log("this is the fuckn data", response.data.data.data[0]);
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

  // // function that handles the examinee activities that will caouse the user to be blocked

  // const promptUserExplanation = (message) => {
  //   // prompt the user to explain why he/she was blocked
  //   // set a timeout of 30 second for the user to come back and explain before blocking

  //   // use a set time out to block the user and promise
  // start the count down from 30 seconds
  // if the user comes back and explains the reason, then unblock the user

  // setCountDown(30);

  // const interval = setInterval(() => {
  //   setCountDown((prev) => prev - 1);
  // }, 1000);

  // setTimeout(() => {
  //   clearInterval(interval);
  // }, 30000);

  //   setShowUserActivityModal(true);
  //   setUserActivityMessage(message);
  // };

  // const handleBlur = () => {
  //   promptUserExplanation("User is switching away from the tab/window");
  // };

  // const handleFullscreenChange = () => {
  //   console.log("handle fullscreen change");
  //   if (
  //     document.fullscreenElement ||
  //     document.mozFullScreenElement ||
  //     document.webkitFullscreenElement ||
  //     document.msFullscreenElement
  //   ) {
  //     setIsFullscreen(true);
  //   } else {
  //     setIsFullscreen(false);
  //     console.log("not in fullscreen mode");
  //     // alert("You are not in fullscreen mode")
  //     promptUserExplanation("You are not in fullscreen mode");
  //     // requestFullscreen(); // Re-request fullscreen to prevent exit
  //   }
  // };

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

  // function handleVisibilityChange() {
  //   if (document.visibilityState === "hidden") {
  //     setIsUserSwitchingAway(true);
  //     // alert("User is switching away from the fullscreen tab/window");
  //     promptUserExplanation("User is switching away from the tab/window");
  //   } else {
  //     setIsUserSwitchingAway(false);
  //     // console.log("User is back to the fullscreen tab/window");
  //   }
  // }

  const handleStartExam = () => {
    setStartExam(true);
    requestFullscreen();
  };

  const handleCancelFinishExam = () => {
    toast.success("Exited the Exam!");
    setStartExam(false);
  };

  // const ExamScreen = () => {
  //   const [collapsed, setCollapsed] = useState(false);
  //   const [answers, setAnswer] = useState({});
  //   const [userExplanation, setUserExplanation] = useState("");

  //   useEffect(() => {
  //     // send the answer to the server using axios
  //     const postAnswer = async () => {
  //       try {
  //         if(Object.keys(answers).length === 0) return;
  //         const answerResponse = [];
  //         for (const key in answers) {
  //           answerResponse.push({
  //             questionId: key,
  //             answerText: answers[key],
  //           });
  //         }

  //         await axios.post(`/api/useranswers/${userAnswersId}`, {
  //           questionAnswers: answerResponse,
  //         });
  //       } catch (error) {
  //         console.error("Error sending answer to the server:", error);
  //       }
  //     };

  //     postAnswer();
  //   }, [answers]);

  //   useEffect(() => {
  //     // receive the answers from the server using axios
  //     const getAnswer = async () => {
  //       try {
  //         const response = await axios.get(`/api/useranswers/${userAnswersId}`);
  //         const answers = response.data.data.data[0].questionAnswers;
  //         const temp = {};
  //         answers.forEach((answer) => {
  //           temp[answer.questionId] = answer.answerText;
  //         });
  //         setAnswer(temp);
  //       } catch (error) {
  //         console.error("Error fetching answer from the server:", error);
  //       }
  //     };

  //     getAnswer();
  //   }, []);

  //   const handleFinishExam = async () => {
  //     try {
  //       // submit the exam and get the evaluation from the backend
  //       const response = await axios.post(
  //         `/api/useranswers/eval/${userAnswersId}`
  //       );
  //       await axios.patch(`/api/exams/take-exam/${takeExamId}`, {
  //         status: "completed",
  //         examEndTime: Date.now(),
  //       });

  //       console.log(response);
  //       navigate("/dashboard");
  //     } catch (error) {
  //       console.error("Error fetching exam details:", error);
  //       toast.error("Failed to submit exam");
  //     }
  //   };

  //   // add debounce for the handle answer
  //   const debounceHandleAnswer = useCallback(
  //     debounce((questionId, answer) => {
  //       setAnswer({
  //         ...answers,
  //         [questionId]: answer,
  //       });
  //     }, 300)
  //   );

  //   const handleAnswer = (questionId, answer) => {
  //     console.log("handle answer", questionId, answer);
  //     debounceHandleAnswer(questionId, answer);
  //   };

  //   const onChangeTabs = (key) => {
  //     console.log(key);
  //   };

  //   return (
  //     <Layout className="h-screen">
  //       <Modal
  //         title="Locked Out"
  //         open={showUserActivityModal}
  //         onOk={handleUserActivity}
  //         // onCancel={handleFinishExam}
  //         footer={[
  //           <button
  //             key="back"
  //             onClick={handleUserActivity}
  //             className="bg-primary-500 text-white cursor-pointer rounded px-4 py-2"
  //           >
  //             Submit
  //           </button>,
  //         ]}
  //       >
  //         <div className="">
  //           You have been temporarly locked out from the exam
  //         </div>
  //         <div>This is because: </div>
  //         <div>{userActivityMessage}</div>
  //         {/* <div>
  //           The Exam Will Automatically Terminate in : {countDown} Seconds
  //         </div> */}
  //         <Input
  //           placeholder="enter your explanation here"
  //           onChange={(e) => {
  //             setUserExplanation(e.target.value);
  //           }}
  //         />
  //       </Modal>
  //       <FloatButton
  //         onClick={() => setShowChat(!showChat)}
  //         shape="circle"
  //         icon={<Icon icon="grommet-icons:chat" />}
  //         tooltip={<div>Exam Chat</div>}
  //         badge={{
  //           dot: true,
  //         }}
  //       />
  //       {<ChatComponent exam={exam} socket={socket} examinee={examinee} />}
  //       <Sider
  //         style={{
  //           width: 600,
  //         }}
  //         className="flex flex-col gap-4 text-white h-screen"
  //         // collapsible
  //         theme="light"
  //         // collapsed={collapsed}
  //         // onCollapse={(value) => setCollapsed(value)}
  //       >
  //         <img
  //           src={fetena_logo}
  //           alt="Fetena.com Logo"
  //           className="w-24 my-4 mx-auto"
  //         />
  //         <ExamTools
  //           exam={exam}
  //           isCharging={isCharging}
  //           batteryLevel={batteryLevel}
  //           examinee={examinee}
  //         />
  //         {/* <VideoComponent /> */}
  //         {"VideoComponent"}
  //       </Sider>
  //       <Layout>
  //         <Header
  //           style={{
  //             padding: 0,
  //             backgroundColor: "#fff",
  //           }}
  //         >
  //           Exam Session
  //         </Header>
  //         <Content
  //           style={{
  //             margin: "24px 16px",
  //             padding: 24,
  //             minHeight: 280,
  //           }}
  //           className="overflow-auto"
  //         >
  //           <div className="flex flex-col gap-4 my-4 mt-8 ">
  //             {exam.questions.map((question, index) => (
  //               <div key={index} className="mb-4">
  //                 {question.questionType === "True/False" ? (
  //                   <Card className=" w-11/12 mx-auto bg-gray-50 rounded-none">
  //                     <div className="flex gap-8 items-center justify-between mx-4 border-b pb-2">
  //                       <h3 className="text-blue-900 font-semibold text-lg">
  //                         Question {index + 1}
  //                       </h3>
  //                       <p className="font-semibold text-blue-900">
  //                         Points {question.points}
  //                       </p>
  //                     </div>
  //                     <div className="mt-4 mx-4 flex items-start">
  //                       <h3 className="font-semibold text-[1rem]">
  //                         {question.questionText}
  //                       </h3>
  //                     </div>
  //                     <div className="mt-8 flex items-start mx-4 ">
  //                       <Form.Item label="Your Answer" className="w-48">
  //                         <Select
  //                           onChange={(value) =>
  //                             handleAnswer(question._id, value)
  //                           }
  //                           value={answers[question._id]}
  //                         >
  //                           <Select.Option value="true">True</Select.Option>
  //                           <Select.Option value="false">False</Select.Option>
  //                         </Select>
  //                       </Form.Item>
  //                     </div>
  //                   </Card>
  //                 ) : question.questionType === "choose" ? (
  //                   <Card className="bg-gray-50 w-11/12 mx-auto">
  //                     <div className="flex gap-8 items-center justify-between mx-4 border-b pb-2">
  //                       <h3 className="text-blue-900 font-semibold text-lg">
  //                         Question {index + 1}
  //                       </h3>
  //                       <p className="font-semibold text-blue-900">
  //                         Points {question.points}
  //                       </p>
  //                     </div>
  //                     <div className="mt-4 mx-4 flex items-start border-b pb-4">
  //                       <h3 className="font-semibold text-[1rem]">
  //                         {question.questionText}
  //                       </h3>
  //                     </div>
  //                     <div className="mt-4 w-full flex items-start mx-4 gap-4">
  //                       <div className="flex flex-col">
  //                         <Radio.Group
  //                           onChange={(e) =>
  //                             handleAnswer(question._id, e.target.value)
  //                           }
  //                           value={answers[question._id]}
  //                         >
  //                           {question.questionChoice.map(
  //                             (choice, choiceIndex) => (
  //                               <Form.Item
  //                                 key={choiceIndex}
  //                                 label={`${String.fromCharCode(
  //                                   65 + choiceIndex
  //                                 )}`}
  //                               >
  //                                 <div className="flex gap-4 justify-center">
  //                                   <p className="font-semibold">{choice}</p>
  //                                   <div className="flex gap-2 items-center">
  //                                     <Radio value={choice}></Radio>
  //                                     <span className="text-blue-700"></span>
  //                                   </div>
  //                                 </div>
  //                               </Form.Item>
  //                             )
  //                           )}
  //                         </Radio.Group>
  //                       </div>
  //                     </div>
  //                   </Card>
  //                 ) : question.questionType === "shortAnswer" ? (
  //                   <Card className="bg-gray-50 w-11/12 mx-auto my-2">
  //                     <div className="flex gap-8 items-center justify-between mx-4 border-b pb-2">
  //                       <h3 className="text-blue-900 font-semibold text-lg">
  //                         Question {index + 1}
  //                       </h3>
  //                       <p className="font-semibold text-blue-900">
  //                         Points {question.points}
  //                       </p>
  //                     </div>

  //                     <div className="mt-4 mx-4 flex items-start ">
  //                       <h3 className="font-semibold text-[1rem]">
  //                         {question.questionText}
  //                       </h3>
  //                     </div>

  //                     <div className="mt-4 flex items-start mx-4 mb-4">
  //                       <TextArea
  //                         rows={4}
  //                         onChange={(e) =>
  //                           handleAnswer(question._id, e.target.value)
  //                         }
  //                         value={answers[question._id]}
  //                         placeholder="Enter your question here"
  //                       />
  //                     </div>
  //                   </Card>
  //                 ) : question.questionType === "essay" ? (
  //                   <Card className="bg-gray-50 w-11/12 mx-auto my-8">
  //                     <div className="flex gap-8 items-center justify-between mx-4 border-b pb-2">
  //                       <h3 className="text-blue-900 font-semibold text-lg">
  //                         Question {index + 1}
  //                       </h3>
  //                       <p className="font-semibold text-blue-900">
  //                         Points {question.points}
  //                       </p>
  //                     </div>

  //                     <div className="mt-4 mx-4 flex items-start">
  //                       <h3 className="font-semibold text-[1rem]">
  //                         {question.questionText}
  //                       </h3>
  //                     </div>

  //                     <div className="mt-4 flex items-start mx-4 mb-4">
  //                       <TextArea
  //                         rows={4}
  //                         onChange={(e) =>
  //                           handleAnswer(question._id, e.target.value)
  //                         }
  //                         value={answers[question._id]}
  //                         placeholder="Enter your question here"
  //                       />
  //                     </div>
  //                   </Card>
  //                 ) : null}
  //               </div>
  //             ))}
  //           </div>
  //           <button
  //             onClick={handleFinishExam}
  //             className="bg-primary-500 text-white cursor-pointer rounded px-4 py-2"
  //           >
  //             Finish
  //           </button>
  //         </Content>
  //       </Layout>
  //     </Layout>
  //   );
  // };

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
      />{" "}
    </div>
  );
};
export default TakeExamScreen;
