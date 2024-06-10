import React, { useEffect, useState, useCallback } from "react";
import {
  Card,
  Form,
  Input,
  Select,
  Layout,
  FloatButton,
  Radio,
  Modal,
  Result,
} from "antd";
import { Icon } from "@iconify/react";
import fetena_logo from "../../assets/fetena_logo.png";
import { toast } from "react-toastify";
import "react-chat-elements/dist/main.css";

import axios from "axios";
const { Header, Sider, Content } = Layout;

import ExamTools from "./ExamTools";
import ChatComponent from "./ChatComponent";
import debounce from "lodash/debounce";
import { useNavigate } from "react-router-dom";
import VideoComponent from "./VideoComponent";
import ReactQuill from "react-quill";

const ExamScreen = ({
  socket,
  exam,
  examinee,
  requestFullscreen,
  userAnswersId,
  takeExamId,
  setStartExam,
  exitFullscreen,
  startExam,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [answers, setAnswer] = useState({});
  const [userExplanation, setUserExplanation] = useState("");
  const [showUserActivityModal, setShowUserActivityModal] = useState(false);
  const [userActivityMessage, setUserActivityMessage] = useState("");
  const [showResultModal, setShowResultModal] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCharging, setIsCharging] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(0);
  const [showMaterial, setShowMaterial] = useState(false)
  const [inputValue, setInputValue] = useState("");
  const [isUserSwitchingAway, setIsUserSwitchingAway] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [userScore, setUserScore] = useState(null);
  const [userAnswer, setUserAnswer] = useState("")
  const { TextArea } = Input;
  const navigate = useNavigate();

  // useEffect to handle battery dispaly and screen change
  useEffect(() => {
    if (exam?.securityLevel === "high") {
      document.addEventListener("fullscreenchange", handleFullscreenChange);
      document.addEventListener("visibilitychange", handleVisibilityChange);
      window.addEventListener("blur", handleBlur);

    }

    const getBatteryInfo = async () => {
      try {
        const battery = await navigator.getBattery();
        setBatteryLevel(Math.round(battery.level * 100));
        setIsCharging(battery.charging);

        battery.addEventListener("chargingchange", () => {
          setIsCharging(battery.charging);
        });

        battery.addEventListener("levelchange", () => {
          setBatteryLevel(Math.round(battery.level * 100));
        });
      } catch (error) {
        console.error("Error getting battery information:", error);
      }
    };

    getBatteryInfo();

    return () => {
      if (exam?.securityLevel === "high") {
        document.removeEventListener("fullscreenchange", handleFullscreenChange);
        document.removeEventListener("visibilitychange", handleVisibilityChange);
        window.removeEventListener("blur", handleBlur);

      }
    };
  }, []);

  //socket related events listening
  useEffect(() => {
    if (socket) {
      socket.on("examTerminated", async (takeExamId, message) => {
        console.log("terminating exam", takeExamId, message);
        const terminateExam = async () => {
          try {
            await axios.patch(`/api/exams/take-exam/${takeExamId}`, {
              status: "terminated",
              examEndTime: Date.now(),
            });

            // also put the user activity log
            socket.emit("userActivityLog", takeExamId, exam._id, {
              action: "Exam Terminated",
              reason: "-",
              actionType: "warning",
            });
          } catch (error) {
            console.error("Error fetching exam details:", error);
            // toast.error("Failed to terminate exam");
          }
        };

        await terminateExam();
        // terminate the exam
        toast.error(message);
        setStartExam(false);
        navigate(-1);
        exitFullscreen();
      });
    }
  }, [socket]);

  useEffect(() => {
    if (Object.keys(examinee).length !== 0) {
      // the examinee has no information recorded in hte server
      if (examinee.userActivityLogs.length === 0) {
        // send the user activity to the server using socket
        socket.emit("userActivityLog", takeExamId, exam._id, {
          action: "User has started the exam",
          reason: "-",
          actionType: "info",
        });
      } else {
        // ask the user why re-entered the exam
        promptUserExplanation("User has re-entered the exam");
      }
    }

    // receive the answers from the server using axios
    const getAnswer = async () => {
      try {
        console.log(userAnswersId, "user answer id");
        const response = await axios.get(`/api/useranswers/${userAnswersId}`);
        const answersResponse = response.data.data.data[0].questionAnswers;
        const temp = {};
        answersResponse.forEach((answer) => {
          temp[answer.questionId] = answer.answerText;
        });
        setAnswer(temp);
        console.log(temp, answers, "get value each time");
      } catch (error) {
        console.error("Error fetching answer from the server:", error);
      }
    };

    getAnswer();
  }, [requestFullscreen]);

  const handleBlur = () => {
    promptUserExplanation("User is out of Focus of the Exam Window");
  };

  const handleFullscreenChange = () => {
    console.log("handle fullscreen change");
    if (
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement
    ) {
      setIsFullscreen(true);
    } else {
      setIsFullscreen(false);
      console.log("not in fullscreen mode");
      // alert("You are not in fullscreen mode")
      promptUserExplanation("Examinee is not in fullscreen mode");
      // requestFullscreen(); // Re-request fullscreen to prevent exit
    }
  };

  function handleVisibilityChange() {
    if (document.visibilityState === "hidden") {
      setIsUserSwitchingAway(true);
      // alert("User is switching away from the fullscreen tab/window");
      promptUserExplanation("Examinee is switching away from the tab/window");
    } else {
      setIsUserSwitchingAway(false);
      // console.log("User is back to the fullscreen tab/window");
    }
  }

  const handleUserActivity = async () => {
    // warn the user to return to the exam with the message and give the user 30 seconds
    setShowUserActivityModal(false);
    console.log("User activity message:", userActivityMessage);

    const userActivity = {
      action: userActivityMessage,
      reason: userExplanation,
      actionType: "warning",
    };

    console.log(userActivity, takeExamId, takeExamId, "user activity");
    socket.emit("userActivityLog", takeExamId, exam._id, userActivity);
    setUserExplanation("");
    await requestFullscreen();
    // try {
    //   // send the user activity to the server using socket
    //   socket.emit("userActivity", {
    //     message: userActivityMessage,
    //     explanation: userExplanation,
    //   });
    // } catch (error) {
    //   console.error("Error sending user activity to the server:", error);
    //   toast.error("Failed to send user activity to the server");
    // }
  };
  const handleFinishExam = async (message) => {
    const finishExam = async () => {
      try {
        const response = await axios.patch(
          `/api/exams/take-exam/${takeExamId}`,
          {
            status: "submitted",
          }
        );

        // submit the exam and get the evaluation from the backend
        const answerResponse = await axios.post(
          `/api/useranswers/eval/${userAnswersId}`
        );

        // console.log(answerResponse.data.response.score, 'answerResponse')

        setUserScore(answerResponse.data.response.score);
        // setShowResultModal(true)

        // socket give info about exam End
        socket.emit("userActivityLog", takeExamId, exam?._id, {
          actionType: "info",
          action: "Exam Submitted",
          reason: "-",
        });
        console.log(response, "eserjio");
        return response.status;
      } catch (error) {
        console.error("Error fetching exam details:", error);
        toast.error("Failed to submit exam");
        return error.response.status;
      }
    };

    const resp = await finishExam();

    if (resp === 200) {
      setShowResultModal(true);
    }
  };
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

  // function that handles the examinee activities that will caouse the user to be blocked
  const promptUserExplanation = (message) => {
    // prompt the user to explain why he/she was blocked
    // set a timeout of 30 second for the user to come back and explain before blocking

    // use a set time out to block the user and promise
    // start the count down from 30 seconds
    // if the user comes back and explains the reason, then unblock the user

    // setCountdown(30);

    // const interval = setInterval(() => {
    //   setCountdown((prev) => prev - 1);
    //   if (countdown === 0){
    //     clearInterval(interval)
    //     setShowUserActivityModal(false);
    //     console.log("times up");
    //   }
    // }, 1000);
    console.log("show user activity");
    setShowUserActivityModal(true);
    console.log("user activity:", showUserActivityModal);
    setUserActivityMessage(message);
  };

  // send the answer to the server using axios
  const postAnswer = (answers, userAnswersId) => {
    try {
      if (Object.keys(answers).length === 0) return;
      const answerResponse = [];
      for (const key in answers) {
        answerResponse.push({
          questionId: key,
          answerText: answers[key],
        });
      }

      axios.post(`/api/useranswers/${userAnswersId}`, {
        questionAnswers: answerResponse,
      });
    } catch (error) {
      console.error("Error sending answer to the server:", error);
    }
  };

  // add debounce for the handle answer
  const debounceHandleAnswer = useCallback(debounce(postAnswer, 600), []);

  const handleAnswer = (questionId, answer) => {
    setAnswer({
      ...answers,
      [questionId]: answer,
    });
    debounceHandleAnswer(answers, userAnswersId);
  };

  const ExplainModal = ({
    showUserActivityModal,
    setShowUserActivityModal,
    handleUserActivity,
    userActivityMessage,
    setUserExplanation,
    userExplanation,
  }) => {
    // const [countdownTime, setCountdownTime] = useState(30);

    // useEffect(() => {
    //   let timer;
    //   if (showUserActivityModal) {
    //     timer = setInterval(() => {
    //       setCountdownTime((prevTime) => prevTime - 1);
    //     }, 1000);
    //   }

    //   return () => clearInterval(timer);
    // }, [showUserActivityModal]);

    // useEffect(() => {
    //   if (countdownTime === 0) {
    //     setShowUserActivityModal(false);
    //     handleFinishExam("Exam Time is Over. Exam Submitted Successfully!");
    //     console.log("times up");
    //   }
    // }, [countdownTime, setShowUserActivityModal]);

    return (
      <Modal
        title='Locked Out'
        open={showUserActivityModal}
        onOk={handleUserActivity}
        // onCancel={handleFinishExam}
        footer={[
          <button
            key='back'
            onClick={handleUserActivity}
            className='bg-primary-500 text-white cursor-pointer rounded px-4 py-2'>
            Submit
          </button>,
        ]}>
        <div className=''>
          You have been temporarly locked out from the exam.
        </div>
        <div>This is because: {userActivityMessage}</div>
        {/* <div>
          The Exam Will Automatically Terminate in : {countdownTime} Seconds
        </div> */}
        <Input
          placeholder="enter your explanation here"
          onChange={(e) => {
            setUserExplanation(e.target.value);
          }}
        />
      </Modal>
    );
  };

  const handleFinishResultModal = () => {
    setShowResultModal(false)
    setStartExam(false);
    navigate(-1);
    exitFullscreen();
    toast.success(message);
  };

  return (
    <Layout className='h-screen'>
      <Modal
        open={showResultModal}
        title='Exam Submitted Successfully!'
        onOk={handleFinishResultModal}>
        <Result
          status='success'
          title={`You have scored ${userScore}`}
        />
      </Modal>

      {/*<ExplainModal
        showUserActivityModal={showUserActivityModal}
        setShowUserActivityModal={setShowUserActivityModal}
        handleUserActivity={handleUserActivity}
        userActivityMessage={userActivityMessage}
        setUserExplanation={setUserExplanation}
        userExplanation={userExplanation}
      /> */}

      <Modal
        title='Locked Out'
        open={showUserActivityModal}
        onOk={handleUserActivity}
        // onCancel={handleFinishExam}
        footer={[
          <button
            key='back'
            onClick={handleUserActivity}
            className='bg-primary-500 text-white cursor-pointer rounded px-4 py-2'>
            Submit
          </button>,
        ]}>
        <div className=''>
          You have been temporarly locked out from the exam.
        </div>
        <div>This is because: {userActivityMessage}</div>
        {/* <div>
          The Exam Will Automatically Terminate in : {countdownTime} Seconds
        </div> */}
        <Input
          value={userExplanation}
          placeholder='enter your explanation here'
          onChange={(e) => {
            setUserExplanation(e.target.value);
          }}
        />
      </Modal>
      <FloatButton
        onClick={() => setShowChat(!showChat)}
        shape='circle'
        icon={<Icon icon='grommet-icons:chat' />}
        tooltip={<div>Exam Chat</div>}
        badge={{
          dot: true,
        }}
      />
      {showChat && (
        <ChatComponent
          exam={exam}
          socket={socket}
          examinee={examinee}
        />
      )}
      <Sider
        style={{
          width: 600,
        }}
        className='flex flex-col gap-4 text-white h-screen'
        // collapsible
        theme='light'
        // collapsed={collapsed}
        // onCollapse={(value) => setCollapsed(value)}
      >
        <img
          src={fetena_logo}
          alt='Fetena.com Logo'
          className='w-24 my-4 mx-auto'
        />
        <ExamTools
          exam={exam}
          showMaterial={showMaterial}
          setShowMaterial={setShowMaterial}
          isCharging={isCharging}
          batteryLevel={batteryLevel}
          examinee={examinee}
        />
        {takeExamId && exam.securityLevel === "high" ? (
          <VideoComponent
            socket={socket}
            takeExamId={takeExamId}
          />
        ) : null}
        {"VideoComponent"}
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            backgroundColor: "#fff",
          }}>
          Exam Session
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
          className='overflow-auto'>
          {exam.examType === "online" ? (
            <div>
              <div className='flex gap-2 w-full'>
                <div
                  className={`flex flex-col gap-4 my-4 mt-8 ${
                    exam.material && showMaterial ? "w-1/2" : "w-full "
                  } `}>
                  {exam.questions.map((question, index) => (
                    <div
                      key={index}
                      className='mb-4'>
                      {question.questionType === "True/False" ? (
                        <Card className=' w-11/12 mx-auto bg-gray-50 rounded-none'>
                          <div className='flex gap-8 items-center justify-between mx-4 border-b pb-2'>
                            <h3 className='text-blue-900 font-semibold text-lg'>
                              Question {index + 1}
                            </h3>
                            <p className='font-semibold text-blue-900'>
                              Points {question.points}
                            </p>
                          </div>
                          <div className='mt-4 mx-4 flex items-start'>
                            <h3 className='font-semibold text-[1rem]'>
                              {question.questionText}
                            </h3>
                          </div>
                          <div className='mt-8 flex items-start mx-4 '>
                            <Form.Item
                              label='Your Answer'
                              className='w-48'>
                              <Select
                                onChange={(e) => {
                                  answers[question._id] = e;
                                  handleAnswer(question._id, e);
                                }}
                                value={answers[question._id]}>
                                <Select.Option value='true'>True</Select.Option>
                                <Select.Option value='false'>
                                  False
                                </Select.Option>
                              </Select>
                            </Form.Item>
                          </div>
                        </Card>
                      ) : question.questionType === "choose" ? (
                        <Card className='bg-gray-50 w-11/12 mx-auto'>
                          <div className='flex gap-8 items-center justify-between mx-4 border-b pb-2'>
                            <h3 className='text-blue-900 font-semibold text-lg'>
                              Question {index + 1}
                            </h3>
                            <p className='font-semibold text-blue-900'>
                              Points {question.points}
                            </p>
                          </div>
                          <div className='mt-4 mx-4 flex items-start border-b pb-4'>
                            <h3 className='font-semibold text-[1rem]'>
                              {question.questionText}
                            </h3>
                          </div>
                          <div className='mt-4 w-full flex items-start mx-4 gap-4'>
                            <div className='flex flex-col'>
                              <Radio.Group
                                onChange={(e) => {
                                  answers[question._id] = e.target.value;
                                  handleAnswer(question._id, e.target.value);
                                }}
                                value={answers[question._id]}>
                                {question.questionChoice.map(
                                  (choice, choiceIndex) => (
                                    <Form.Item
                                      key={choiceIndex}
                                      label={`${String.fromCharCode(
                                        65 + choiceIndex
                                      )}`}>
                                      <div className='flex gap-4 justify-center'>
                                        <p className='font-semibold'>
                                          {choice}
                                        </p>
                                        <div className='flex gap-2 items-center'>
                                          <Radio value={choice}></Radio>
                                          <span className='text-blue-700'></span>
                                        </div>
                                      </div>
                                    </Form.Item>
                                  )
                                )}
                              </Radio.Group>
                            </div>
                          </div>
                        </Card>
                      ) : question.questionType === "shortAnswer" ? (
                        <Card className='bg-gray-50 w-11/12 mx-auto my-2'>
                          <div className='flex gap-8 items-center justify-between mx-4 border-b pb-2'>
                            <h3 className='text-blue-900 font-semibold text-lg'>
                              Question {index + 1}
                            </h3>
                            <p className='font-semibold text-blue-900'>
                              Points {question.points}
                            </p>
                          </div>

                          <div className='mt-4 mx-4 flex items-start '>
                            <h3 className='font-semibold text-[1rem]'>
                              {question.questionText}
                            </h3>
                          </div>

                          <div className='mt-4 flex items-start mx-4 mb-4'>
                            <TextArea
                              rows={4}
                              onChange={(e) => {
                                answers[question._id] = e.target.value;
                                handleAnswer(question._id, e.target.value);
                              }}
                              value={answers[question._id]}
                              placeholder='Enter your question here'>
                              {answers[question._id]}
                            </TextArea>
                          </div>
                        </Card>
                      ) : question.questionType === "essay" ? (
                        <Card className='bg-gray-50 w-11/12 mx-auto my-8'>
                          <div className='flex gap-8 items-center justify-between mx-4 border-b pb-2'>
                            <h3 className='text-blue-900 font-semibold text-lg'>
                              Question {index + 1}
                            </h3>
                            <p className='font-semibold text-blue-900'>
                              Points {question.points}
                            </p>
                          </div>

                          <div className='mt-4 mx-4 flex items-start'>
                            <h3 className='font-semibold text-[1rem]'>
                              {question.questionText}
                            </h3>
                          </div>

                          <div className='mt-4 flex items-start mx-4 mb-4'>
                            <TextArea
                              rows={4}
                              onChange={(e) => {
                                answers[question._id] = e.target.value;
                                handleAnswer(question._id, e.target.value);
                              }}
                              value={answers[question._id]}
                              placeholder='Enter your question here'
                            />
                          </div>
                        </Card>
                      ) : null}
                    </div>
                  ))}
                </div>
                {exam.material && showMaterial && (
                  <div className='w-1/2'>
                    <iframe
                      src={`http://localhost:8080${exam.material}`}
                      title={exam.examFile}
                      className='w-full h-full'
                    />
                  </div>
                )}
              </div>
              <button
                onClick={() => handleFinishExam("Exam submitted successfully!")}
                className='bg-primary-500 text-white cursor-pointer rounded px-4 py-2'>
                Finish
              </button>
            </div>
          ) : exam.examType === "pdfUpload" ? (
            <div className='flex flex-col gap-4 justify-center h-full w-full'>
              <div className='flex items-center justify-end'>
                <button
                  onClick={() =>
                    handleFinishExam("Exam submitted successfully!")
                  }
                  className='bg-primary-500 text-white cursor-pointer rounded px-4 py-2'>
                  Finish
                </button>
              </div>
              <div className='flex gap-2 h-full'>
                {(exam.material && showMaterial) ? (<iframe
                  src={`http://localhost:8080${exam.examFile}`}
                  title={exam.examFile}
                  className='w-1/2 h-full'
                />) : <div className='w-1/2'>
                    <iframe
                      src={`http://localhost:8080${exam.material}`}
                      title={exam.examFile}
                      className='w-full h-full'
                    />
                  </div>}
                <ReactQuill
                  className='w-1/2 h-full flex-1 bg-white'
                  value={userAnswer}
                  onChange={setUserAnswer}
                />
              </div>

              
            </div>
          ) : (
            <div className={` flex gap-4 h-full w-full`}>
              <iframe
                src={`http://localhost:8080${exam.examFile}`}
                title={exam.examFile}
                className={`${
                  exam.material && showMaterial ? "w-1/2" : "w-full "
                }`}
              />
              {exam.material && showMaterial && (
                <div className='w-1/2'>
                  <iframe
                    src={`http://localhost:8080${exam.material}`}
                    title={exam.examFile}
                    className='w-full h-full'
                  />
                </div>
              )}
            </div>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default ExamScreen;
