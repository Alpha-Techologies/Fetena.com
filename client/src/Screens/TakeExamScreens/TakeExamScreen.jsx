import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import {
  Card,
  Form,
  Input,
  Select,
  Layout,
  FloatButton,
  Radio,
  Tag,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import fetena_logo from "../../assets/fetena_logo.png";
import moment from "moment";
import { toast } from "react-toastify";
import "react-chat-elements/dist/main.css";

import useSocketIO from "../../utils/socket/useSocketIO";
import { takeExam } from "../../Redux/features/dataActions";
import axios from "axios";

import ExamStartConfirmationModal from './ExamStartConfirmationModal'
import ExamTools from "./ExamTools";
import ChatComponent from "./ChatComponent";

const { Header, Sider, Content } = Layout;

const TakeExamScreen = () => {
  const { user } = useSelector((state) => state.auth);
  const [startExam, setStartExam] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isUserSwitchingAway, setIsUserSwitchingAway] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isCharging, setIsCharging] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [takeExamId, setTakeExamId] = useState("");

  const [exam, setExam] = useState(null);
  const [socket] = useSocketIO();
  const dispatch = useDispatch();
  const { TextArea } = Input;

  const navigate = useNavigate();

  const { id } = useParams();

  // useEffect to join chat room for examinee
  useEffect(() => {
    console.log("this is runnning and start is changing");
    if (startExam) {
      dispatch(takeExam(id))
        .then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            console.log(res.payload);
            const temp = res.payload.data._id;
            setTakeExamId(temp);
            console.log(temp, "takeExamId");

            socket.emit("joinExam", id, res.payload.data._id);
          } else {
            toast.error(res.payload.message);
            return;
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error("There is some error in the server!");
        });
    }
  }, [startExam]);

  // useEffect to handle battery dispaly and screen change
  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("visibilitychange", handleVisibilityChange);

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
    };
  }, []);

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
      // requestFullscreen(); // Re-request fullscreen to prevent exit
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

  function handleVisibilityChange() {
    if (document.visibilityState === "hidden") {
      setIsUserSwitchingAway(true);
      // alert("User is switching away from the fullscreen tab/window");
    } else {
      setIsUserSwitchingAway(false);
      // console.log("User is back to the fullscreen tab/window");
    }
  }

  const handleStartExam = () => {
    setStartExam(true);
    requestFullscreen();
  };

  const handleFinishExam = () => {
    setStartExam(false);
    navigate(-1);
    // document.exitFullscreen();
    exitFullscreen();
  };


  const ExamScreen = () => {
    const [collapsed, setCollapsed] = useState(false);
    

    const onChangeTabs = (key) => {
      console.log(key);
    };

    return (
      <Layout className='h-screen'>
        <FloatButton
          onClick={() => setShowChat(!showChat)}
          shape='circle'
          icon={<Icon icon='grommet-icons:chat' />}
          tooltip={<div>Exam Chat</div>}
          badge={{
            dot: true,
          }}
        />
        {<ChatComponent exam={exam} socket={socket} />}
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
          <ExamTools exam={exam} isCharging={isCharging} batteryLevel={batteryLevel} />
          {/* <VideoComponent /> */}
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
            className="overflow-auto">
            <div className='flex flex-col gap-4 my-4 mt-8 '>
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
                          <Select>
                            <Select.Option value='true'>True</Select.Option>
                            <Select.Option value='false'>False</Select.Option>
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
                          <Radio.Group value={question.correctAnswer}>
                            {question.questionChoice.map(
                              (choice, choiceIndex) => (
                                <Form.Item
                                  key={choiceIndex}
                                  label={`${String.fromCharCode(
                                    65 + choiceIndex
                                  )}`}>
                                  <div className='flex gap-4 justify-center'>
                                    <p className='font-semibold'>{choice}</p>
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
                          placeholder='Enter your question here'
                        />
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
                          placeholder='Enter your question here'
                        />
                      </div>
                    </Card>
                  ) : null}
                </div>
              ))}
            </div>
            <button
              onClick={handleFinishExam}
              className='bg-primary-500 text-white cursor-pointer rounded px-4 py-2'>
              Finish
            </button>
          </Content>
        </Layout>
      </Layout>
    );
  };

  return !startExam ? (
    <div>
      {" "}
      <ExamStartConfirmationModal handleStartExam={handleStartExam} />{" "}
    </div>
  ) : (
    <div>
      {" "}
      <ExamScreen />{" "}
    </div>
  );
};

export default TakeExamScreen;
