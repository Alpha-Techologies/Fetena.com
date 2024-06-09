import { Icon } from "@iconify/react";
import { Select, Card,Tag  } from "antd";
import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import useSocketIO from "../../utils/socket/useSocketIO";
import * as faceapi from "face-api.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import _ from "lodash";
import { toast } from "react-toastify";

import ChatWindow from "./ChatWindow";
import ExamineeListWindow from "./ExamineeListWindow";
import MonitoringTab from "./MonitoringTab";
import ResultsTab from "./ResultsTab";
import VideoMonitorWindow from "./VideoMonitorWindow";
import { current } from "@reduxjs/toolkit";

const MonitoringPage = () => {
  const [activeTabKey1, setActiveTabKey1] = useState("tab1");
  const [inputValue, setInputValue] = useState("");
  const [examStatus, setExamStatus] = useState();
  const [seeStatusOf, setSeeStatusOf] = useState("all");
  const { user } = useSelector((state) => state.auth);
  const [socket] = useSocketIO();
  const { workspace } = useSelector((state) => state.data);
  const { userOrganizationsIdAndRole } = useSelector((state) => state.data);
  const [examsList, setExamsList] = useState([]);
  const [currentExam, setCurrentExam] = useState({});
  const [examineeList, setExamineeList] = useState([]);
  const [examineeStatusStats, setExamineeStatusStats] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const navigate = useNavigate();
  // const serverURL = "http://localhost:3000";
  const serverURL = import.meta.env.VITE_SOCKET_URL;
  let tempExam = {};

  const fetchData = async (page = 1, active = true, access = "") => {
    const id = workspace._id;
    console.log("fetching data", userOrganizationsIdAndRole[id], id);

    if (
      userOrganizationsIdAndRole[id] &&
      (userOrganizationsIdAndRole[id] === "admin" ||
        userOrganizationsIdAndRole[id] === "examiner")
    ) {
      try {
        const response = await axios.get(
          `/api/exams/my-exam/${id}?active=${active}&access=${access}`
        );

        console.log(response, "resp fetch all exams  ");
        const tempExamsList = response.data.data.data.map((obj) => ({
          value: obj._id,
          label: obj.examName,
        }));
        console.log(tempExamsList);
        setExamsList(tempExamsList);
        console.log(examsList);
        if (examsList) {
          await fetchExamDetails(tempExamsList[0].value);
          await fetchExamineeList(tempExamsList[0].value);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  };

  const fetchExamDetails = async (examId) => {
    console.log("fetchExamDetails");
    try {
      const response = await axios.get(`/api/exams/${examId}`);
      // console.log(response, 'response from fetch single exam');
      tempExam = response.data.data.data[0];
      setCurrentExam(tempExam);
      setExamStatus(tempExam.access);
      console.log(currentExam, "currentExam");
    } catch (error) {
      console.error("Error fetching exam details:", error);
    }
  };

  const fetchExamineeList = async (examId) => {
    try {
      const response = await axios.get(`/api/exams/exam-history/${examId}`);
      console.log(examId);
      console.log(response, "response from fetch single exam");
      // setExamineeList(response.data.data.data);
      const tempExamineeList = response.data.data.data;
      setExamineeList(tempExamineeList);
      const expectedStatuses = [
        "inprogress",
        "submitted",
        "terminated",
        "interrupted",
      ];
      const tempExamineeStatusCount = _.defaults(
        _.countBy(tempExamineeList, "status"),
        _.fromPairs(expectedStatuses.map((status) => [status, 0]))
      );
      setExamineeStatusStats(tempExamineeStatusCount);
      console.log(examineeStatusStats, "temp examinee stat");
      console.log(examineeStatusStats.inprogress, "examinee stats");
    } catch (error) {
      console.error("Error fetching exam details:", error);
      // toast.error("Failed to fetch exam details");
    }
  };

  useEffect(() => {
    if (!workspace) {
      // Handle the case where workspace is null, for example, redirect the user or show an error message
      // navigate to the /dashboard/exams/userexams page
      navigate("/dashboard/exams/userexams");
    } else {
      fetchData(1, true);
      if (examsList) {
        // fetchExamDetails(examsList[0].value);
        // fetchExamineeList(examsList[0].value);
      }
    }
  }, []);

  useEffect(() => {
    console.log(socket, "socket in join");
    if (socket) {
      console.log("receiving userjoined", socket);

      const handleUserJoined = (takeExamId, examId) => {
        console.log("userJoined received", examId);
        fetchExamineeList(examId);
        toast.success("New User Joined Exam!");
      };

      socket.on("userJoined", handleUserJoined);

      return () => {
        socket.off("userJoined", handleUserJoined);
      };
    }
  }, [socket]);

  // useEffect to join socket of the invigilator
  useEffect(() => {
    if (examStatus === "open") {
      // Emit an event to the server
      socket.emit("joinInvigilator", currentExam._id);
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

  const contentList = {
    tab1: (
      <MonitoringTab
        examineeList={examineeList}
        examineeStatusStats={examineeStatusStats}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        seeStatusOf={seeStatusOf}
        setSeeStatusOf={setSeeStatusOf}
        socket={socket}
        fetchExamineeList={fetchExamineeList}
      />
    ),
    tab2: (
      <ResultsTab
        seeStatusOf={seeStatusOf}
        setSeeStatusOf={setSeeStatusOf}
        currentExam={currentExam}
        currentUser={currentUser}
        fetchExamDetails={fetchExamDetails}
        setCurrentUser={setCurrentUser}
        examineeList={examineeList}
      />
    ),
  };

  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };

  const handleExamChange = (value) => {
    fetchExamDetails(value);
  };

  const handleExamStatusChange = async (value) => {
    console.log(value, currentExam.access, "examStatus");
    // if (value === "close") socket.emit("closeExam", currentExam._id);
    try {
      const response = await axios.patch(`/api/exams/${currentExam._id}`, {
        access: value,
      });

      if (response.status === 200) {
        fetchExamDetails(currentExam._id);
      }
    } catch (error) {
      console.error("Error fetching exam details:", error);
    }
  };

  return (
    <>
      {!examsList.length ? (
        <div>
          <div className="flex justify-between gap-4 items-center">
          <h1 className='text-2xl font-bold text-blue-900 text-left mb-2'>Exam Monitoring</h1>
          </div>
          <p>You currently have no exams created.</p>
        </div>
      ) : (
        <div>
          <div className="flex justify-between gap-4 items-center  mb-2">
          <h1 className='text-2xl font-bold text-blue-900 text-left'>Exam Monitoring</h1>
            <div className="flex items-center justify-center gap-4">
              <span className="font-bold text-blue-900 text-[1rem]">Exam : </span>
              <Select
                defaultValue={examsList[0].value}
                style={{
                  width: 120,
                }}
                onChange={handleExamChange}
                options={examsList}
              />
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <Card>
              <div className="flex justify-between my-4">
                <p className="text-lg">
                  <span className="font-semibold">Exam :</span> <span className="font-bold text-blue-900"> {currentExam.examName}</span>
                </p>
                {examStatus === "open" ? (
                  <span className="text-success-500 font-semibold flex gap-2 items-center">
                    <Icon icon="heroicons-outline:status-online" />
                    <Tag color="green">Online</Tag>
                  
                    
                  </span>
                ) : (
                  <span className="text-error-500 font-semibold flex gap-2 items-center">
                    <Icon icon="codicon:eye-closed" />   <Tag color="red">Closed</Tag>{" "}
                  </span>
                )}
              </div>

              <div className="w-full  flex flex-wrap items-center justify-between py-2 px-8 rounded-sm border ">
                <p className="font-semibold">
                  <span className="font-bold text-blue-700">Starts at : </span>
                  {new Date(currentExam.startDate).toLocaleString()}
                </p>
                <p className="font-semibold">
                  <span className="font-bold text-blue-700">Points : </span>
                  {currentExam.points}
                </p>
                {/* <p className='font-semibold'>
              <span className='font-bold text-blue-700'>Questions : </span>{exam.questions}
            </p> */}
                <p className="font-semibold">
                  <span className="font-bold text-blue-700">Time limit : </span>
                  {currentExam.duration} Minutes
                </p>
                <p className="font-semibold">
                  <span className="font-bold text-blue-700">Access : </span>
                  <Select
                    value={currentExam.access}
                    onChange={handleExamStatusChange}
                    style={{
                      width: 80,
                    }}
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
              </div>
            </Card>
            <div className="flex gap-2 min-h-screen max-h-fit">
              <ExamineeListWindow
                examineeList={examineeList}
                setSeeStatusOf={setSeeStatusOf}
              />
              <Card
                style={{
                  width: "100%",
                }}
                tabList={tabList}
                activeTabKey={activeTabKey1}
                onTabChange={onTab1Change}
              >
                {contentList[activeTabKey1]}
              </Card>
              <div className="flex flex-col items-center gap-4">
                <ChatWindow
                  currentUser={currentUser}
                  seeStatusOf={seeStatusOf}
                  currentExam={currentExam}
                  socket={socket}
                />
                {seeStatusOf !== "all" && (
                  <VideoMonitorWindow
                    socket={socket}
                    currentUser={currentUser}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default MonitoringPage;
