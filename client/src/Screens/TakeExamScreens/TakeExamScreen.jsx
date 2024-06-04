import React, { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import io from "socket.io-client";
import {
  Button,
  Modal,
  Layout,
  Menu,
  Tabs,
  Switch,
  Divider,
  FloatButton,
} from "antd";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import fetena_logo from "../../assets/fetena_logo.png";
import moment from "moment";
import { toast } from "react-toastify";
import Draggable from "react-draggable";
import "react-chat-elements/dist/main.css";
import { MessageBox } from "react-chat-elements";
import { MessageList, Input } from "react-chat-elements";
import useSocketIO from "../../utils/socket/useSocketIO";
import * as math from "mathjs";
import { takeExam } from "../../Redux/features/dataActions";
import Peer from "peerjs";
const { Header, Sider, Content } = Layout;
const inputReferance = React.createRef();

const TakeExamScreen = () => {

  const roomId = "123efr";
  const { user } = useSelector((state) => state.auth);
  const userId = user._id;
  const [startExam, setStartExam] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isUserSwitchingAway, setIsUserSwitchingAway] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [isCharging, setIsCharging] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [takeExamId, setTakeExamId] = useState("");
  const [chatMessage, setChatMessage] = useState("");
  const [chatList, setChatList] = useState([]);
  const [socket] = useSocketIO();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    console.log('this is runnning and start is changing');
    if (startExam) {
      dispatch(takeExam("665cd9ad02c0ca39fcda44d4"))
        .then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            console.log(res.payload);
            const temp = res.payload.data._id;
            setTakeExamId(temp);
            console.log(temp, "takeExamId");

            socket.emit(
              "joinExam",
              "665cd9ad02c0ca39fcda44d4",
              res.payload.data._id
            );
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

  const ExamStartConfirmationModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
      handleStartExam();
    };
    const handleCancel = () => {
      setIsModalOpen(false);
      navigate(-1);
    };
    return (
      <>
        <Modal
          title='Get Ready for your Exam'
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}>
          <p>The exam is about to start.</p>
        </Modal>
      </>
    );
  };

  const Calculator = () => {
    const [expression, setExpression] = useState("");
    const [screenVal, setScreenVal] = useState("");
    const [customVariables, setCustomVariables] = useState({});

    const [mode, setMode] = useState("rad");

    const handleCalcChange = (e) => {
      setExpression(e.target.value);
    };

    const handleCalcClick = (input) => {
      setExpression((prevExpression) => prevExpression + input);
    };

    const calculate = () => {
      try {
        const allVariables = {
          ...customVariables,
          pi: Math.PI,
          e: Math.E,
          // Add factorial function
          fact: math.factorial,
          sin: mode === "rad" ? Math.sin : math.sin,
          cos: mode === "rad" ? Math.cos : math.cos,
          tan: mode === "rad" ? Math.tan : math.tan,
          asin: mode === "rad" ? Math.asin : math.asin,
          acos: mode === "rad" ? Math.acos : math.acos,
          atan: mode === "rad" ? Math.atan : math.atan,
        };

        const result = math.evaluate(expression, allVariables);
        if (typeof result === "number" && !isNaN(result)) {
          setScreenVal(Number(result).toFixed(4));
        } else {
          setScreenVal("Error: Invalid expression");
        }
      } catch (error) {
        setScreenVal("Error: Invalid expression");
      }
    };

    const clearScreen = () => {
      setExpression("");
      setScreenVal("");
    };

    const backspace = () => {
      const newExpression = expression.slice(0, -1);
      setExpression(newExpression);
    };

    const toggleMode = () => {
      // Toggle between "rad" and "deg" modes
      setMode(mode === "rad" ? "deg" : "rad");
    };

    return (
      <Draggable>
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-[#3A4764] text-white text-center h-fit w-[650px] p-4 rounded-lg'>
          <div className='flex flex-col gap-4'>
            <div className='input-section bg-[#182034] w-full h-[100px] px-4 rounded flex flex-col'>
              <div
                className='screen text-right text-[#EAE3DC] font-bold text-lg h-[25px]'
                value={expression}>
                {expression}
              </div>
              <Divider className='bg-white w-[80%]' />
              <div className='output text-right text-green-500 text-xl font-bold'>
                {screenVal}
              </div>
            </div>

            <div className='button-section flex bg-[#232C43] gap-4 h-fit rounded p-4'>
              <div className='numeric-pad grid grid-cols-3 gap-2'>
                {["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"].map(
                  (input) => (
                    <button
                      className='w-16 h-16 rounded bg-[#EAE3DC] font-bold text-2xl text-[#232C43]'
                      key={input}
                      onClick={() => handleCalcClick(input)}>
                      {input}
                    </button>
                  )
                )}
                <button
                  className='w-16 h-16 rounded bg-[#EAE3DC] font-bold text-2xl text-[#232C43]'
                  onClick={() => handleCalcClick(".")}>
                  ,
                </button>
              </div>
              <div className='operators grid grid-cols-4 gap-2'>
                {[
                  "+",
                  "-",
                  "*",
                  "/",
                  "^",
                  "sqrt(",
                  "sin(",
                  "cos(",
                  "tan(",
                  "cbrt(",
                  "asin(",
                  "acos(",
                  "atan(",
                  // Add open parenthesis
                  "(",
                  // Add close parenthesis
                  ")",
                ].map((input) => (
                  <button
                    className='w-16 h-16 rounded bg-[#EAE3DC] font-bold text-2xl text-[#232C43]'
                    key={input}
                    onClick={() => handleCalcClick(input)}>
                    {input}
                  </button>
                ))}

                <button
                  className='w-16 h-16 rounded bg-[#EAE3DC] font-bold text-2xl text-[#232C43] flex items-center justify-center'
                  onClick={() => handleCalcClick("pi")}>
                  <Icon icon='mdi:pi' />
                </button>
              </div>
              <div className='control-buttons grid grid-cols-1 gap-2'>
                <button
                  className='w-16 h-16 rounded bg-yellow-500 font-bold text-2xl text-[#EAE3DC]'
                  onClick={clearScreen}>
                  C
                </button>
                <button
                  className='w-16 h-16 rounded bg-green-500 font-bold text-2xl text-[#EAE3DC]'
                  onClick={calculate}>
                  =
                </button>
                <button
                  className='w-16 h-16 rounded bg-error-500 font-bold text-2xl text-[#EAE3DC]'
                  onClick={backspace}>
                  del
                </button>
                <button
                  className='w-16 h-16 rounded bg-[#EAE3DC] font-bold text-2xl text-[#232C43] flex items-center justify-center'
                  onClick={() => handleCalcClick("fact(")}>
                  <Icon icon='streamline:factorial' />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Draggable>
    );
  };

  const ChatComponent = () => {
    useEffect(() => {
      if (socket) {

        console.log("receiving message examinee", socket);

        const handleReceiveMessage = (message) => {
          console.log("message received");
          console.log(message);
          const newMessage = {
            position: "left",
            title: "Invigilator",
            type: "text",
            text: message.message,
            date: "message.date",
          };
          setChatList((prev) => [...prev, newMessage]);
        }

        const handleReceiveAnnouncement = (message) => {
          console.log("announcemet received");
          console.log(message);
          setChatList((prev) => [
            ...prev,
            {
              position: "left",
              title: "Invigilator",
              type: "text",
              text: message,
              date: "message.date",
            },
          ]);
        }

        socket.on("receiveMessage", handleReceiveMessage);
  
        socket.on("announcement", handleReceiveAnnouncement);

        return () => {
        socket.off("receiveMessage", handleReceiveMessage);
        socket.off("announcement", handleReceiveAnnouncement)
      };
      }
    }, [socket]);

    const sendMessage = () => {
      console.log("send message function");
      if (chatMessage !== "" && socket) {
        socket.emit("sendMessage", "665cd9ad02c0ca39fcda44d4", false, {
          sender: user._id,
          receiver: "6630daab4db53d7d765f3978",
          message: chatMessage,
        });
        setChatList((prev) => [
          ...prev,
          {
            position: "right",
            title: "You",
            type: "text",
            text: chatMessage,
            date: "message.date",
          },
        ]);
      }
    };

    return (
      <div className='h-screen flex flex-col justify-between'>
        <MessageList
          key={1}
          className='message-list mt-2 mb-2'
          lockable={true}
          toBottomHeight={"100%"}
          dataSource={chatList}
        />
        <div className='flex items-center gap-2 w-[90%]'>
          <Input
            className='w-full'
            value={chatMessage}
            placeholder={"Type your message here"}
            onChange={(e) => setChatMessage(e.target.value)}
          />
          <div className='w-[20%]'>
            <Icon
              onClick={() => sendMessage()}
              className='w-5 h-5 text-primary-500'
              icon='carbon:send-filled'
            />

          </div>
        </div>
      </div>
    );
  };

const VideoComponent = () => {
  const videoRef = useRef(null);
  const peerClientRef = useRef(null);
  // const socketRef = useRef(null);

  useEffect(() => {
  //         socketRef.current = io("http://localhost:3000", {
  //           transports: ["websocket"],
  //         });

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

        // console.log(socketRef, 'socketref');

        socket.on('viewer-connected', (viewerId) => {
          console.log('viewer connected');
          connectToNewViewer(viewerId, stream);
        });

        // socket.on('disconnect', () => {
        //   // socketRef.current.emit('disconnect-as-streamer', streamerId);
        // });
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    setupVideoStream();

    return () => {
      if (peerClientRef.current) {
        peerClientRef.current.destroy();
      }

      // if (socketRef.current) {
      //   socketRef.current.disconnect();
      // }
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

  const ExamScreen = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [currentTime, setCurrentTime] = useState(moment());
    const [showCalculator, setShowCalculator] = useState(false);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentTime(moment());
      }, 1000 * 60);

      return () => {
        clearInterval(interval);
      };
    }, []);

    const onChangeTabs = (key) => {
      console.log(key);
    };

    const ExamTools = () => {
      const onChangeSwitch = (checked) => {
        console.log(`switch to ${checked}`);
        setShowCalculator(checked);
      };
      return (
        <div className='flex flex-col flex-grow gap-12 h-auto justify-between'>
          <Menu
            theme='light'
            mode='inline'
            defaultSelectedKeys={["1"]}
            items={[
              {
                key: "1",
                // icon: <UserOutlined />,
                label: "Exam",
              },
              {
                key: "2",
                // icon: <UserOutlined />,
                label: "References",
              },
            ]}
          />
          {showCalculator && <Calculator />}
          <div className='flex flex-col gap-2 items-center justify-center text-black'>
            <div className='flex gap-2 items-center justify-center'>
              <Icon
                className='w-5 h-5'
                icon='ph:calculator-fill'
              />
              <p>Calculator</p>
              <Switch
                size='small'
                defaultChecked={showCalculator}
                onChange={onChangeSwitch}
              />
            </div>
            <div className='flex gap-2'>
              {isCharging ? (
                <Icon
                  className='text-green-500 w-6 h-6'
                  icon='tabler:battery-charging'
                />
              ) : batteryLevel < 10 ? (
                <Icon
                  className='text-error-500 w-6 h-6'
                  icon='tabler:battery'
                />
              ) : batteryLevel < 40 ? (
                <Icon
                  className='text-yellow-500 w-6 h-6'
                  icon='tabler:battery-2'
                />
              ) : batteryLevel < 50 ? (
                <Icon
                  className='text-yellow-500 w-6 h-6'
                  icon='tabler:battery-3'
                />
              ) : (
                <Icon
                  className='text-green-500 w-6 h-6'
                  icon='tabler:battery-4-filled'
                />
              )}
              <p>Battery Level: {batteryLevel}%</p>
            </div>

            <div className='flex gap-2'>
              <Icon
                className='w-6 h-6 text-primary-500'
                icon='mingcute:time-line'
              />
              <p>Time: {currentTime.format("hh:mm")}</p>
            </div>
          </div>
        </div>
      );
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
        {showChat && <ChatComponent />}
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
          <ExamTools />
          <VideoComponent />
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
            }}>
            <button onClick={handleFinishExam}>Finish</button>
          </Content>
        </Layout>
      </Layout>
    );
  };

  return !startExam ? (
    <div>
      {" "}
      <ExamStartConfirmationModal />{" "}
    </div>
  ) : (
    <div>
      {" "}
      <ExamScreen />{" "}
    </div>
  );
};

export default TakeExamScreen;
