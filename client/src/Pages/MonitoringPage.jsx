import { Icon } from "@iconify/react";
import {
  Select,
  Card,
  Timeline,
  Tabs,
  Table,
  Tag,
  List,
  Avatar,
  Input,
  Collapse,
  Form,
  Alert,
  InputNumber,
} from "antd";
import moment from "moment";
import Button from "../Components/Button";
import React, { useState, useEffect, useRef } from "react";
import { MessageList } from "react-chat-elements";
import { useSelector } from "react-redux";
import useSocketIO from "../utils/socket/useSocketIO";
import * as faceapi from "face-api.js";
import Peer from "peerjs";

const inputReferance = React.createRef();
const { Search, TextArea } = Input;
const currentTime = moment();

const MonitoringPage = () => {
  const [activeTabKey1, setActiveTabKey1] = useState("tab1");
  const [inputValue, setInputValue] = useState("");
  const [examStatus, setExamStatus] = useState("closed");
  const [seeStatusOf, setSeeStatusOf] = useState("all");
  const [chatMessage, setChatMessage] = useState("");
  const [chatList, setChatList] = useState([]);
  const { user } = useSelector((state) => state.auth);
  const [socket] = useSocketIO();
  console.log(faceapi);
  const serverURL = "http://localhost:3000";
  // const socket = io(serverURL);

  // useEffect to join socket of the invigilator
  useEffect(() => {
    if (examStatus === "open") {
      // Emit an event to the server
      socket.emit("joinInvigilator", "665cd9ad02c0ca39fcda44d4");
    }
  }, [examStatus]);

  const tabList = [
    {
      key: "tab1",
      tab: "Monitoring",
    },
    {
      key: "tab2",
      tab: "Results",
    },
  ];

  const examineeList = [
    {
      title: "Overview",
    },
    {
      title: "Yohannes Teshome",
    },
    {
      title: "Yohannes Mesganaw",
    },
    {
      title: "Yosef Lakew",
    },
    {
      title: "Tibebe Solomon",
    },
  ];

  const ChatWindow = () => {
    useEffect(() => {
      console.log(socket, "socket in chat");
      if (socket) {
        console.log("receiving message admin", socket);

        const handleReceiveMessage = (message) => {
          console.log("message received");
          console.log(message);
          const newMessage = {
            position: "left",
            title: "Examinee",
            type: "text",
            text: message.message,
            date: "message.date",
          };
          setChatList((prev) => [...prev, newMessage]);
        };

        socket.on("receiveMessage", handleReceiveMessage);

        return () => {
          socket.off("receiveMessage", handleReceiveMessage);
        };
      }
    }, [socket]);

    const announceMessage = () => {
      console.log("announce message function");
      if (chatMessage !== "" && socket) {
        socket.emit("announcement", "665cd9ad02c0ca39fcda44d4", chatMessage);
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

    const sendMessage = () => {
      console.log("send message function");
      if (chatMessage !== "") {
        socket.emit("sendMessage", "665cd9ad02c0ca39fcda44d4", true, {
          sender: user._id,
          receiver: "6645e752b0e194684daa1ee4",
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
      <Card className='h-fit'>
        <div className='flex items-center justify-center text-primary-500 gap-4'>
          {seeStatusOf === "all" ? (
            <Icon
              className='w-5 h-5'
              icon='mingcute:announcement-line'
            />
          ) : (
            <Icon
              className='w-5 h-5'
              icon='fluent:chat-12-filled'
            />
          )}
          <p className='text-md'>
            {seeStatusOf === "all" ? "Announce" : " Message Yohannes Teshome"}
          </p>
        </div>
        <div className='h-full flex flex-col justify-between'>
          <MessageList
            key={1}
            className='message-list mt-2 mb-2 bg-[#f5f5f5] rounded-lg h-full py-2'
            lockable={true}
            toBottomHeight={"100%"}
            dataSource={chatList}
          />

          <div className='flex items-center gap-2'>
            <Input
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder={
                seeStatusOf === "all"
                  ? "Message All"
                  : "Message Yohannes Teshome"
              }
            />
            <Icon
              onClick={
                seeStatusOf === "all"
                  ? () => announceMessage()
                  : () => sendMessage()
              }
              className='w-5 h-5 text-primary-500'
              icon='carbon:send-filled'
            />
          </div>
        </div>
      </Card>
    );
  };

  const ExamineeListWindow = () => {
    return (
      <Card className='w-2/6 h-fit'>
        <div className='flex flex-col gap-4'>
          <p className='font-semibold'>Examinees</p>

          <Search
            placeholder='Search Examinee'
            allowClear
          />

          <span className='font-semibold italic'>Submitted (4)</span>
        </div>
        <List
          itemLayout='horizontal'
          dataSource={examineeList}
          renderItem={(item, index) => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}
                  />
                }
                title={
                  <a onClick={() => setSeeStatusOf("01234")}>{item.title}</a>
                }
              />
            </List.Item>
          )}
        />
      </Card>
    );
  };

  // const VideoMonitorWindow = () => {
  //   const videoRef = useRef(null);
  //   const canvasRef = useRef(null);
  //   // const [socket, setSocket] = useState(null);
  //   const [myPeer, setMyPeer] = useState(null);
  //   const [videoOnPlay, setVideoOnPlay] = useState(false);

  //   useEffect(() => {
  //     const modelUrl = "http://localhost:4000/models";
  //     Promise.all([
  //       faceapi.nets.tinyFaceDetector.loadFromUri(modelUrl),
  //       faceapi.nets.faceLandmark68Net.loadFromUri(modelUrl),
  //       faceapi.nets.faceRecognitionNet.loadFromUri(modelUrl),
  //       faceapi.nets.faceExpressionNet.loadFromUri(modelUrl),
  //     ]).then(() => {
  //       const videoElement = videoRef.current;
  //       const canvasElement = canvasRef.current;
  //       const displaySize = {
  //         width: videoElement.width,
  //         height: videoElement.height,
  //       };

  //       setVideoOnPlay(() => {
  //         canvasElement

  //           .getContext("2d")
  //           .clearRect(0, 0, canvasElement.width, canvasElement.height);
  //         console.log("adding the vancaf");
  //         faceapi.matchDimensions(canvasElement, displaySize);
  //         setInterval(async () => {
  //           const detections = await faceapi
  //             .detectAllFaces(
  //               videoElement,
  //               new faceapi.TinyFaceDetectorOptions()
  //             )
  //             .withFaceLandmarks();
  //           console.log(detections.length);

  //           const resizedDetections = faceapi.resizeResults(
  //             detections,
  //             displaySize
  //           );
  //           canvasElement
  //             .getContext("2d")
  //             .clearRect(0, 0, canvasElement.width, canvasElement.height);
  //           faceapi.draw.drawDetections(canvasElement, resizedDetections);
  //           faceapi.draw.drawFaceLandmarks(canvasElement, resizedDetections);
  //         }, 100);
  //       });
  //     });

  //     // const newSocket = io("http://localhost:3000", {
  //     //   transports: ["websocket"],
  //     // });
  //     // setSocket(newSocket);

  //     const newPeer = new Peer();
  //     setMyPeer(newPeer);

  //     // newSocket.on("connect", () => {
  //     //   console.log("Connected as viewer");
  //     // });
  //     console.log(socket, "the socket");

  //     if (socket) {
  //       newPeer.on("open", (viewerId) => {
  //         socket.emit("join-as-viewer", viewerId);
  //       });

  //       newPeer.on("call", (call) => {
  //         call.answer();
  //         call.on("stream", (stream) => {
  //           addVideoStream(videoRef.current, stream);
  //         });
  //       });

  //       newPeer.on("connection", (conn) => {
  //         conn.on("close", () => {
  //           setTimeout(reload, 1000);
  //         });
  //       });
  //       console.log(socket, "socekt");

  //       socket.on("disconnect", () => {
  //         console.log("disconnected viewer");
  //       });
  //     }

  //     return () => {
  //       newPeer.disconnect();
  //     };
  //   }, [socket]);

  //   const addVideoStream = (video, stream) => {
  //     video.srcObject = stream;
  //     video.addEventListener("loadedmetadata", () => {
  //       video.play();
  //     });
  //   };

  //   const reload = () => {
  //     window.location.reload();
  //   };

  //   const soundToggle = () => {
  //     console.log("sound toggle", videoRef.current.muted);
  //     videoRef.current.muted = !videoRef.current.muted;
  //   };

  //   return (
  //     <div
  //       id='video_container'
  //       className='relative'>
  //       <video
  //         onPlay={() => videoOnPlay && videoOnPlay()}
  //         ref={videoRef}
  //         id='video'
  //         width='340'
  //         height='255'
  //         className='h-auto max-w-none '
  //       />
  //       <canvas
  //         className='absolute top-0 left-0'
  //         width='340'
  //         height='255'
  //         ref={canvasRef}
  //         id='canvas'
  //       />
  //       <button
  //         className='cursor-pointer'
  //         onClick={soundToggle}>
  //         {videoRef.current.muted ? "Unmute" : "Mute"}
  //       </button>
  //     </div>
  //   );
  // };

  const MonitoringTab = () => {
    const overviewTableColumns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Warning Count",
        dataIndex: "warning",
        key: "warning",
      },
      {
        title: "Status",
        key: "status",
        dataIndex: "status",
        render: (_, { status }) => (
          <>
            {status === "Active" ? (
              <Tag color={"green"}>Active</Tag>
            ) : status === "Blocked" ? (
              <Tag color={"red"}>Blocked</Tag>
            ) : (
              <Tag color={"orange"}>Submitted</Tag>
            )}
          </>
        ),
      },
      {
        title: "Action",
        key: "action",
        render: (_, record) => <a>End Exam</a>,
      },
    ];

    const overviewTableData = [
      {
        key: "1",
        name: "John Brown",
        email: "johnbrown@gmail.com",
        warning: "3",
        status: "Blocked",
      },
      {
        key: "2",
        name: "John Brown",
        email: "johnbrown@gmail.com",
        warning: "3",
        status: "Active",
      },
      {
        key: "3",
        name: "John Brown",
        email: "johnbrown@gmail.com",
        warning: "3",
        status: "Submitted",
      },
    ];

    const MonitoringOverviewPage = () => {
      return (
        <div className='flex flex-col gap-2'>
          <div className='grid grid-cols-3 gap-4 w-full'>
            <Card>
              <div>
                <p className='font-bold text-xl italic'>14</p>
                <p>Total Examinees</p>
              </div>
            </Card>
            <Card>
              <div>
                <p className='font-bold text-xl italic'>4</p>
                <p>Submitted</p>
              </div>
            </Card>
            <Card>
              <div>
                <p className='font-bold text-xl italic'>10</p>
                <p>Ongoing</p>
              </div>
            </Card>
          </div>
          <Table
            columns={overviewTableColumns}
            dataSource={overviewTableData}
          />
        </div>
      );
    };

    const MonitoringIndividualPage = () => {
      return (
        <div className='flex flex-col gap-4'>
          <div className='flex justify-between w-full'>
            <div
              onClick={() => setSeeStatusOf("all")}
              className='flex items-center gap-2 text-primary-500 cursor-pointer'>
              <Icon icon='lets-icons:back' />
              Back to Overview
            </div>
            {"aa" === "a" ? (
              <div className='bg-green-500 text-white flex items-center gap-2 py-2 px-4 rounded'>
                <Icon icon='mdi:tick' />
                Has submitted Exam
              </div>
            ) : "aa" === "a" ? (
              <div className='bg-red-500 text-white flex items-center gap-2 py-2 px-4 rounded cursor-pointer'>
                <Icon icon='material-symbols:tab-close' />
                End Exam for Student
              </div>
            ) : (
              <div className='bg-blue-500 text-white flex items-center gap-2 py-2 px-4 rounded cursor-pointer'>
                <Icon icon='mdi:restart' />
                Resume Exam for Student
              </div>
            )}
          </div>
          <div className='flex flex-col items-start'>
            <div className='flex items-center justify-start'>
              <span className='font-bold text-xl justified'>
                Yohannes Teshome
              </span>
              {false ? (
                <p className='text-green-500 ml-2 flex items-center justify-center'>
                  <Icon icon='icon-park-outline:dot' /> Ongoing
                </p>
              ) : (
                <p className='text-gray-500 ml-2 flex items-center justify-center'>
                  <Icon icon='icon-park-outline:dot' /> Finished
                </p>
              )}
            </div>
            <p className='text-gray-500'>
              {" "}
              <span className='text-primary-500 font-semibold'>
                {" "}
                Email:{" "}
              </span>{" "}
              0J9qg@example.com
            </p>
          </div>

          <p className='font-bold '>Examinee History</p>

          <Timeline
            items={[
              {
                dot: (
                  <Icon
                    className='w-5 h-5'
                    icon='mdi:stopwatch-start-outline'
                  />
                ),
                color: "blue",
                children: (
                  <span>
                    Started the Exam at <br />{" "}
                    <span className='italic text-gray-500'>
                      {currentTime.format()}
                    </span>
                  </span>
                ),
              },
              {
                dot: (
                  <Icon
                    className='w-5 h-5'
                    icon='octicon:blocked-16'
                  />
                ),
                color: "red",
                children: (
                  <span>
                    <span className='text-red-500 italic'>[BLOCKED]</span>{" "}
                    Switched Tab at <br />{" "}
                    <span className='italic text-gray-500'>
                      {currentTime.format()}
                    </span>
                  </span>
                ),
              },
              {
                dot: (
                  <Icon
                    className='w-5 h-5'
                    icon='octicon:blocked-16'
                  />
                ),
                color: "red",
                children: (
                  <span>
                    <span className='text-red-500 italic'>[BLOCKED]</span>{" "}
                    Escaped Full Screen at <br />
                    <span className='italic text-gray-500'>
                      {currentTime.format()}
                    </span>
                  </span>
                ),
              },
              {
                dot: (
                  <Icon
                    className='w-5 h-5'
                    icon='radix-icons:resume'
                  />
                ),
                color: "blue",
                children: (
                  <span>
                    Re-entered Exam at <br />
                    <span className='italic text-gray-500'>
                      {currentTime.format()}
                    </span>
                  </span>
                ),
              },
              {
                dot: (
                  <Icon
                    className='w-5 h-5'
                    icon='iconoir:submit-document'
                  />
                ),
                color: "green",
                children: (
                  <span>
                    Submitted Exam <br />{" "}
                    <span className='italic text-gray-500'>
                      {currentTime.format()}
                    </span>
                  </span>
                ),
              },
            ]}
          />
        </div>
      );
    };

    return (
      <>
        {seeStatusOf === "all" ? (
          <MonitoringOverviewPage />
        ) : (
          <MonitoringIndividualPage />
        )}
      </>
    );
  };

  const ResultsTab = () => {
    const resultsTableColumns = [
      {
        title: "Name",
        dataIndex: "name",
        key: "name",
        render: (text) => <a>{text}</a>,
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Points",
        dataIndex: "points",
        key: "points",
      },
      {
        title: "Submision Time",
        key: "submissionTime",
        dataIndex: "submissionTime",
      },
    ];

    const resultsTableData = [
      {
        key: "1",
        name: "John Brown",
        email: "johnbrown@gmail.com",
        points: "8/10",
        submissionTime: currentTime.format(),
      },
      {
        key: "2",
        name: "John Brown",
        email: "johnbrown@gmail.com",
        points: "8/10",
        submissionTime: currentTime.format(),
      },
      {
        key: "3",
        name: "John Brown",
        email: "johnbrown@gmail.com",
        points: "8/10",
        submissionTime: currentTime.format(),
      },
    ];

    const ResultsOverviewPage = () => {
      return (
        <div className='flex flex-col gap-2'>
          <div className='grid grid-cols-3 gap-4 w-full'>
            <Card>
              <div>
                <p className='font-bold text-xl italic'>4</p>
                <p>Exams Marked</p>
              </div>
            </Card>
            <Card>
              <div>
                <p className='font-bold text-xl italic'>10</p>
                <p>Ongoing</p>
              </div>
            </Card>
          </div>
          <Table
            columns={resultsTableColumns}
            dataSource={resultsTableData}
          />
        </div>
      );
    };

    const ResultsIndividualPage = () => {
      return (
        <div className='flex flex-col gap-4'>
          <div className='flex justify-between w-full'>
            <div
              onClick={() => setSeeStatusOf("all")}
              className='flex items-center gap-2 text-primary-500 cursor-pointer'>
              <Icon icon='lets-icons:back' />
              Back to Overview
            </div>
            <div className='flex items-center gap-4'>
              <div className='px-4 py-1 rounded-full flex items-center gap-2 border border-primary-500 cursor-pointer'>
                <Icon icon='hugeicons:file-export' /> Export
              </div>
              <div className='px-4 py-1 rounded-full flex items-center gap-2 border border-primary-500 cursor-pointer'>
                <Icon icon='mdi:email-send-outline' /> Send to Email
              </div>
            </div>
          </div>
          <div className='flex items-start flex-col gap-4'>
            <div className='flex items-center justify-start'>
              <span className='font-bold text-xl justified'>
                Yohannes Teshome
              </span>
              {false ? (
                <p className='text-green-500 ml-2 flex items-center justify-center'>
                  <Icon icon='icon-park-outline:dot' /> Ongoing
                </p>
              ) : (
                <p className='text-gray-500 ml-2 flex items-center justify-center'>
                  <Icon icon='icon-park-outline:dot' /> Finished
                </p>
              )}
            </div>
            <p className='text-gray-500'>
              {" "}
              <span className='text-primary-500 font-semibold'>
                {" "}
                Email:{" "}
              </span>{" "}
              0J9qg@example.com
            </p>
          </div>
          {/* True/False Question */}
          <Card className=' w-11/12 mx-auto bg-gray-50 rounded-none'>
            <div className='flex gap-8 items-center justify-between mx-4 border-b pb-2'>
              <h3 className='text-blue-900 font-semibold text-lg'>
                Question 1
              </h3>
              <p className='font-semibold text-blue-900'>Points 1</p>
            </div>
            <div className='mt-4 mx-4 flex items-start'>
              <h3 className='font-semibold text-[1rem]'>Some question</h3>
            </div>
            <div className='mt-8 flex items-center h-fit justify-start mx-4 w-72 '>
              <Form.Item label='Your Answer'>
                <Select defaultActiveFirstOption={"true"}>
                  <Select.Option value='true'>True</Select.Option>
                  <Select.Option value='false'>False</Select.Option>
                </Select>
              </Form.Item>
              {/* {true ? (
                <Icon
                  className='text-green-500'
                  icon='icon-park-solid:correct'
                />
              ) : (
                <Icon
                  className='text-red-500'
                  icon='icomoon-free:cross'
                />
              )} */}
            </div>
            <div className='flex flex-col gap-2 w-full'>
              {"aa" === "a" ? (
                <Tag
                  className='flex items-center w-fit gap-2'
                  color='blue'>
                  <Icon icon='mdi:checkbox-marked-outline' />
                  Manually Marked
                </Tag>
              ) : "aa" === "aa" ? (
                <Tag
                  className='flex items-center w-fit gap-2'
                  color='green'>
                  <Icon icon='lucide:bot' />
                  Automatically Marked
                </Tag>
              ) : (
                <Tag
                  className='flex items-center w-fit gap-2'
                  color='red'>
                  <Icon icon='mage:file-question-mark' />
                  Not Yet Marked
                </Tag>
              )}
              <div className='flex gap-2 items-center w-full'>
                <Alert
                  message='Answered Correctly'
                  className='w-[90%]'
                  type='success'
                  showIcon
                />
                <InputNumber
                  className='w-[10%]'
                  min={1}
                  max={10}
                  defaultValue={3}
                />
              </div>
              <div className='flex flex-col gap-2 w-full'>
                {"aa" === "a" ? (
                  <Tag
                    className='flex items-center w-fit gap-2'
                    color='blue'>
                    <Icon icon='mdi:checkbox-marked-outline' />
                    Manually Marked
                  </Tag>
                ) : "aa" === "aa" ? (
                  <Tag
                    className='flex items-center w-fit gap-2'
                    color='green'>
                    <Icon icon='lucide:bot' />
                    Automatically Marked
                  </Tag>
                ) : (
                  <Tag
                    className='flex items-center w-fit gap-2'
                    color='red'>
                    <Icon icon='mage:file-question-mark' />
                    Not Yet Marked
                  </Tag>
                )}
                <div className='flex gap-2 items-center w-full'>
                  <Alert
                    message='Incorrect Answer'
                    className='w-[90%]'
                    type='error'
                    showIcon
                  />
                  <InputNumber
                    className='w-[10%]'
                    min={1}
                    max={10}
                    defaultValue={3}
                  />
                </div>
              </div>
            </div>
          </Card>
          {/* Short Answer */}
          <Card className='bg-gray-50 w-11/12 mx-auto my-2'>
            <div className='flex gap-8 items-center justify-between mx-4 border-b pb-2'>
              <h3 className='text-blue-900 font-semibold text-lg'>
                Question 2
              </h3>
              <p className='font-semibold text-blue-900'>Points 1</p>
            </div>

            <div className='mt-4 mx-4 flex items-start '>
              <h3 className='font-semibold text-[1rem]'>Some Question</h3>
            </div>

            <div className='mt-4 flex items-start mx-4 mb-4'>
              <TextArea
                rows={4}
                placeholder='Enter your question here'
              />
            </div>
            <div className='flex flex-col gap-2 w-full'>
              <div className='flex flex-col gap-2 w-full'>
                <div className='flex gap-2 items-center justify-between w-full'>
                  <Tag
                    className='flex items-center w-fit gap-2'
                    color='blue'>
                    <Icon icon='mdi:checkbox-marked-outline' />
                    Manually Marked Question
                  </Tag>

                  <InputNumber
                    className='w-[10%]'
                    min={1}
                    max={10}
                    defaultValue={3}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      );
    };

    return (
      <div>
        {seeStatusOf === "all" ? (
          <ResultsOverviewPage />
        ) : (
          <ResultsIndividualPage />
        )}
      </div>
    );
  };

  const contentList = {
    tab1: <MonitoringTab />,
    tab2: <ResultsTab />,
  };

  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };

  const handleExamStatusChange = (value) => {
    setExamStatus(value);
  };

  return (
    <>
      <div className='flex justify-between gap-4 items-center'>
        <h1 className='text-3xl font-bold my-2'>Exam Monitoring</h1>
        <div className='flex items-center justify-center gap-4'>
          <span>Exam: </span>
          <Select
            defaultValue='lucy'
            style={{
              width: 120,
            }}
            onChange={handleChange}
            options={[
              {
                value: "jack",
                label: "Jack",
              },
              {
                value: "lucy",
                label: "Lucy",
              },
              {
                value: "Yiminghe",
                label: "yiminghe",
              },
              {
                value: "disabled",
                label: "Disabled",
                disabled: true,
              },
            ]}
          />
        </div>
      </div>
      <div className='flex flex-col gap-4'>
        <Card>
          <div className='flex justify-between my-4'>
            <p className='font-bold text-lg'>Exam: Exam Name</p>
            {examStatus === "open" ? (
              <span className='text-success-500 flex gap-2 items-center'>
                <Icon icon='heroicons-outline:status-online' />
                Online
              </span>
            ) : (
              <span className='text-error-500 flex gap-2 items-center'>
                <Icon icon='codicon:eye-closed' /> Closed{" "}
              </span>
            )}
          </div>
          <div className='w-full  flex flex-wrap justify-between py-2 px-8 rounded-sm border '>
            <p className='font-semibold flex items-center gap-2'>
              <span className='font-bold text-blue-700'>Exam Key : </span>{" "}
              <span className='italic cursor-pointer'>tyEr23h</span>
              <Icon
                className='text-gray-500 '
                icon='ph:clipboard'
              />
            </p>
            <p className='font-semibold'>
              <span className='font-bold text-blue-700'>Access : </span>
              <Select
                defaultValue={examStatus}
                style={{
                  width: 80,
                }}
                onChange={handleExamStatusChange}
                options={[
                  {
                    value: "open",
                    label: "Open",
                  },
                  {
                    value: "closed",
                    label: "Closed",
                  },
                ]}
              />
            </p>

            {/* <Button className='bg-error-500 text-white'>End Exam</Button> */}
          </div>
        </Card>
        <div className='flex gap-2 min-h-screen max-h-fit'>
          <ExamineeListWindow />
          <Card
            style={{
              width: "100%",
            }}
            tabList={tabList}
            activeTabKey={activeTabKey1}
            onTabChange={onTab1Change}>
            {contentList[activeTabKey1]}
          </Card>
          <div className='flex flex-col items-center gap-4'>
            <ChatWindow />
            {seeStatusOf !== "all" && 'videoMonitorWindow'}
          </div>
        </div>
      </div>
    </>
  );
};
export default MonitoringPage;
