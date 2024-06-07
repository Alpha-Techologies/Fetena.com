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

const ExamScreen = ({
  socket,
  exam,
  examinee,
  requestFullscreen,
  userAnswersId,
  takeExamId,
  setStartExam,
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [answers, setAnswer] = useState({});
  const [userExplanation, setUserExplanation] = useState("");
  const [showUserActivityModal, setShowUserActivityModal] = useState(false);
  const [userActivityMessage, setUserActivityMessage] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isCharging, setIsCharging] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [isUserSwitchingAway, setIsUserSwitchingAway] = useState(false);
  const { TextArea } = Input;
  const navigate = useNavigate();

  // useEffect to handle battery dispaly and screen change
  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("blur", handleBlur);

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
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  useEffect(() => {
    console.log("examinee", examinee);

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
  const handleFinishExam = async () => {
    const finishExam = async () => {
      try {
        const response = await axios.patch(
          `/api/exams/take-exam/${takeExamId}`,
          {
            status: "submitted",
          }
        );

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
      setStartExam(false);
      navigate(-1);
      // document.exitFullscreen();
      exitFullscreen();
      toast.success("Exam submitted successfully!");
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

    // setCountDown(30);

    // const interval = setInterval(() => {
    //   setCountDown((prev) => prev - 1);
    // }, 1000);

    // setTimeout(() => {
    //   clearInterval(interval);
    // }, 30000);

    setShowUserActivityModal(true);
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

  return (
    <Layout className="h-screen">
      <Modal
        title="Locked Out"
        open={showUserActivityModal}
        onOk={handleUserActivity}
        // onCancel={handleFinishExam}
        footer={[
          <button
            key="back"
            onClick={handleUserActivity}
            className="bg-primary-500 text-white cursor-pointer rounded px-4 py-2"
          >
            Submit
          </button>,
        ]}
      >
        <div className="">
          You have been temporarly locked out from the exam
        </div>
        <div>This is because: </div>
        <div>{userActivityMessage}</div>
        {/* <div>
            The Exam Will Automatically Terminate in : {countDown} Seconds
          </div> */}
        <Input
          placeholder="enter your explanation here"
          onChange={(e) => {
            setUserExplanation(e.target.value);
          }}
        />
      </Modal>
      <FloatButton
        onClick={() => setShowChat(!showChat)}
        shape="circle"
        icon={<Icon icon="grommet-icons:chat" />}
        tooltip={<div>Exam Chat</div>}
        badge={{
          dot: true,
        }}
      />
      {<ChatComponent exam={exam} socket={socket} examinee={examinee} />}
      <Sider
        style={{
          width: 600,
        }}
        className="flex flex-col gap-4 text-white h-screen"
        // collapsible
        theme="light"
        // collapsed={collapsed}
        // onCollapse={(value) => setCollapsed(value)}
      >
        <img
          src={fetena_logo}
          alt="Fetena.com Logo"
          className="w-24 my-4 mx-auto"
        />
        <ExamTools
          exam={exam}
          isCharging={isCharging}
          batteryLevel={batteryLevel}
          examinee={examinee}
        />
        {/* <VideoComponent /> */}
        {"VideoComponent"}
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            backgroundColor: "#fff",
          }}
        >
          Exam Session
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
          }}
          className="overflow-auto"
        >
          <div className="flex flex-col gap-4 my-4 mt-8 ">
            {exam.questions.map((question, index) => (
              <div key={index} className="mb-4">
                {question.questionType === "True/False" ? (
                  <Card className=" w-11/12 mx-auto bg-gray-50 rounded-none">
                    <div className="flex gap-8 items-center justify-between mx-4 border-b pb-2">
                      <h3 className="text-blue-900 font-semibold text-lg">
                        Question {index + 1}
                      </h3>
                      <p className="font-semibold text-blue-900">
                        Points {question.points}
                      </p>
                    </div>
                    <div className="mt-4 mx-4 flex items-start">
                      <h3 className="font-semibold text-[1rem]">
                        {question.questionText}
                      </h3>
                    </div>
                    <div className="mt-8 flex items-start mx-4 ">
                      <Form.Item label="Your Answer" className="w-48">
                        <Select
                          onChange={(e) => {
                            answers[question._id] = e;
                            handleAnswer(question._id, e);
                          }}
                          value={answers[question._id]}
                        >
                          <Select.Option value="true">True</Select.Option>
                          <Select.Option value="false">False</Select.Option>
                        </Select>
                      </Form.Item>
                    </div>
                  </Card>
                ) : question.questionType === "choose" ? (
                  <Card className="bg-gray-50 w-11/12 mx-auto">
                    <div className="flex gap-8 items-center justify-between mx-4 border-b pb-2">
                      <h3 className="text-blue-900 font-semibold text-lg">
                        Question {index + 1}
                      </h3>
                      <p className="font-semibold text-blue-900">
                        Points {question.points}
                      </p>
                    </div>
                    <div className="mt-4 mx-4 flex items-start border-b pb-4">
                      <h3 className="font-semibold text-[1rem]">
                        {question.questionText}
                      </h3>
                    </div>
                    <div className="mt-4 w-full flex items-start mx-4 gap-4">
                      <div className="flex flex-col">
                        <Radio.Group
                          onChange={(e) => {
                            answers[question._id] = e.target.value;
                            handleAnswer(question._id, e.target.value);
                          }}
                          value={answers[question._id]}
                        >
                          {question.questionChoice.map(
                            (choice, choiceIndex) => (
                              <Form.Item
                                key={choiceIndex}
                                label={`${String.fromCharCode(
                                  65 + choiceIndex
                                )}`}
                              >
                                <div className="flex gap-4 justify-center">
                                  <p className="font-semibold">{choice}</p>
                                  <div className="flex gap-2 items-center">
                                    <Radio value={choice}></Radio>
                                    <span className="text-blue-700"></span>
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
                  <Card className="bg-gray-50 w-11/12 mx-auto my-2">
                    <div className="flex gap-8 items-center justify-between mx-4 border-b pb-2">
                      <h3 className="text-blue-900 font-semibold text-lg">
                        Question {index + 1}
                      </h3>
                      <p className="font-semibold text-blue-900">
                        Points {question.points}
                      </p>
                    </div>

                    <div className="mt-4 mx-4 flex items-start ">
                      <h3 className="font-semibold text-[1rem]">
                        {question.questionText}
                      </h3>
                    </div>

                    <div className="mt-4 flex items-start mx-4 mb-4">
                      <TextArea
                        rows={4}
                        onChange={(e) => {
                          answers[question._id] = e.target.value;
                          handleAnswer(question._id, e.target.value);
                        }}
                        value={answers[question._id]}
                        placeholder="Enter your question here"
                      >
                        {answers[question._id]}
                      </TextArea>
                    </div>
                  </Card>
                ) : question.questionType === "essay" ? (
                  <Card className="bg-gray-50 w-11/12 mx-auto my-8">
                    <div className="flex gap-8 items-center justify-between mx-4 border-b pb-2">
                      <h3 className="text-blue-900 font-semibold text-lg">
                        Question {index + 1}
                      </h3>
                      <p className="font-semibold text-blue-900">
                        Points {question.points}
                      </p>
                    </div>

                    <div className="mt-4 mx-4 flex items-start">
                      <h3 className="font-semibold text-[1rem]">
                        {question.questionText}
                      </h3>
                    </div>

                    <div className="mt-4 flex items-start mx-4 mb-4">
                      <TextArea
                        rows={4}
                        onChange={(e) => {
                          answers[question._id] = e.target.value;
                          handleAnswer(question._id, e.target.value);
                        }}
                        value={answers[question._id]}
                        placeholder="Enter your question here"
                      />
                    </div>
                  </Card>
                ) : null}
              </div>
            ))}
          </div>
          <button
            onClick={handleFinishExam}
            className="bg-primary-500 text-white cursor-pointer rounded px-4 py-2"
          >
            Finish
          </button>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ExamScreen;