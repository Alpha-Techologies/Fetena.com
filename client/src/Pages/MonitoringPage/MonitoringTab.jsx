import { Icon } from "@iconify/react";
import { Tag, Table, Card, Avatar, Timeline, Button } from "antd";
import axios from "axios";
import _ from "lodash";
import moment from "moment";
import { useEffect } from "react";
import { toast } from "react-toastify";

const MonitoringTab = ({
  examineeStatusStats,
  examineeList,
  currentUser,
  setCurrentUser,
  seeStatusOf,
  setSeeStatusOf,
  socket,
  fetchExamineeList,
}) => {
  // const serverURL = "http://localhost:3000";
  const serverURL = false
    ? "http://localhost:8080"
    : "http://13.49.21.227:8080";
  const currentTime = moment();

  const handleEndExam = async (status, userId) => {
    const tempCurrentUser = _.find(
      examineeList,
      (item) => item.user && item.user._id === userId
    );

    if (status === "inprogress") {
      socket.emit("terminateExaminee", tempCurrentUser._id);
      fetchExamineeList(tempCurrentUser.exam);
    } else {
      const letUserIn = async (id) => {
        // updat the take exam of the user to inprogress
        try {
          const response = await axios.patch(`/api/exams/take-exam/${id}`, {
            status: "inprogress",
          });
        } catch (error) {
          toast.error("Failed to let user in: " + error.message);
        }
      };
      await letUserIn(tempCurrentUser._id);

      fetchExamineeList(tempCurrentUser.exam);
    }
  };

  const overviewTableColumns = [
    {
      title: "Profile",
      dataIndex: "profilePhoto",
      key: "profilePhoto",
      render: (text) => <Avatar src={serverURL + text} />,
    },
    {
      title: "Name",
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Start Time",
      dataIndex: "startTime",
      key: "startedAt",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (_, { status }) => (
        <>
          {status === "inprogress" ? (
            <Tag color={"green"}>In Progress</Tag>
          ) : status === "terminated" ? (
            <Tag color={"red"}>Terminated</Tag>
          ) : status === "interrupted" ? (
            <Tag color={"blue"}>Interrupted</Tag>
          ) : (
            <Tag color={"orange"}>Submitted</Tag>
          )}
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          className={`font-bold uppercase ${
            record.status === "inprogress" ? "red" : "blue"
          } `}
          onClick={() => handleEndExam(record.status, record.userId)}
        >
          {record.status === "inprogress" ? "End Exam" : "Let In"}
        </Button>
      ),
    },
  ];

  const overviewTableData = _.map(examineeList, (item) => ({
    profilePhoto: item.user.profilePhoto,
    fullName: item.user.fullName,
    email: item.user.email,
    userId: item.user.id,
    status: item.status,
    startTime: item.startTime,
  }));

  const MonitoringOverviewPage = ({
    examineeStatusStats,
    overviewTableColumns,
    overviewTableData,
  }) => {
    return (
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-3 gap-4 w-full">
          <Card>
            <div>
              <p className="font-bold text-xl italic">
                {examineeStatusStats.inprogress +
                  examineeStatusStats.submitted +
                  examineeStatusStats.interrupted +
                  examineeStatusStats.terminated}
              </p>
              <p>Total Examinees</p>
            </div>
          </Card>
          <Card>
            <div>
              <p className="font-bold text-xl italic">
                {examineeStatusStats.submitted}
              </p>
              <p>Submitted</p>
            </div>
          </Card>
          <Card>
            <div>
              <p className="font-bold text-xl italic">
                {examineeStatusStats.inprogress}
              </p>
              <p>Ongoing</p>
            </div>
          </Card>
          <Card>
            <div>
              <p className="font-bold text-xl italic">
                {examineeStatusStats.terminated}
              </p>
              <p>Terminated</p>
            </div>
          </Card>
          <Card>
            <div>
              <p className="font-bold text-xl italic">
                {examineeStatusStats.interrupted}
              </p>
              <p>Interrupted</p>
            </div>
          </Card>
        </div>
        <Table
          onRow={(record, rowIndex) => {
            return { onDoubleClick: (e) => setSeeStatusOf(record.userId) };
          }}
          columns={overviewTableColumns}
          dataSource={overviewTableData}
        />
      </div>
    );
  };

  const MonitoringIndividualPage = ({
    examineeList,
    setCurrentUser,
    currentUser,
    socket,
    fetchExamineeList,
    handleEndExam,
  }) => {
    useEffect(() => {
      if (socket) {
        socket.on("userActivityLog", (takeExamId, activityLog) => {
          fetchExamineeList(currentUser.exam);
        });
      }
    });

    const tempCurrentUser = _.find(
      examineeList,
      (item) => item.user && item.user._id === seeStatusOf
    );

    setCurrentUser(tempCurrentUser);

    // TODO: after merging the branch that has the end exam for user functionality add the userActivityLogs for the Terminated.
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between w-full">
          <div
            onClick={() => setSeeStatusOf("all")}
            className="flex items-center gap-2 text-primary-500 cursor-pointer"
          >
            <Icon icon="lets-icons:back" />
            Back to Overview
          </div>
          {currentUser?.status === "submitted" ? (
            <div className="bg-green-500 text-white flex items-center gap-2 py-2 px-4 rounded">
              <Icon icon="mdi:tick" />
              Has submitted Exam
            </div>
          ) : currentUser?.status === "inprogress" ? (
            <div
              onClick={() =>
                handleEndExam(currentUser?.status, currentUser?.user?._id)
              }
              className="bg-red-500 text-white flex items-center gap-2 py-2 px-4 rounded cursor-pointer"
            >
              <Icon icon="material-symbols:tab-close" />
              End Exam for Student
            </div>
          ) : (
            <div
              onClick={() =>
                handleEndExam(currentUser?.status, currentUser?.user?._id)
              }
              className="bg-blue-500 text-white flex items-center gap-2 py-2 px-4 rounded cursor-pointer"
            >
              <Icon icon="mdi:restart" />
              Resume Exam for Student
            </div>
          )}
        </div>
        <div className="flex flex-col items-start">
          <div className="flex items-center justify-start">
            <span className="font-bold text-xl justified">
              {currentUser?.user?.fullName}
            </span>
            {currentUser?.status === "inprogress" ? (
              <p className="text-green-500 ml-2 flex items-center justify-center">
                <Icon icon="icon-park-outline:dot" /> Ongoing
              </p>
            ) : currentUser?.status === "completed" ||
              currentUser?.status === "submitted" ? (
              <p className="text-gray-500 ml-2 flex items-center justify-center">
                <Icon icon="icon-park-outline:dot" /> Finished
              </p>
            ) : (
              <p className="text-red-500 ml-2 flex items-center justify-center">
                <Icon icon="icon-park-outline:dot" /> Hasn't Finished
              </p>
            )}
          </div>
          <p className="text-gray-500">
            {" "}
            <span className="text-primary-500 font-semibold">
              {" "}
              Email:{" "}
            </span>{" "}
            {currentUser?.user?.email}
          </p>
        </div>

        <p className="font-bold ">Examinee History</p>
        <Timeline>
          {currentUser?.userActivityLogs.map((item, index) => (
            <Timeline.Item
              key={index}
              dot={
                <Icon
                  className="w-5 h-5"
                  icon={
                    item.actionType === "warning"
                      ? "octicon:blocked-16"
                      : "octicon:blocked-16"
                  }
                />
              }
              color={item.actionType === "warning" ? "red" : "blue"}
            >
              <span>
                <span className="text-red-500 italic"></span> {item.action}{" "}
                <br />
                <span className="text-black-500">Reason </span> {item.reason}{" "}
                <br />
                <span className="italic text-gray-500">
                  {new Date(item.timestamp).toLocaleString()}
                </span>
              </span>
            </Timeline.Item>
          ))}
        </Timeline>
        {/* <Timeline
          items={[
            {
              dot: (
                <Icon className="w-5 h-5" icon="mdi:stopwatch-start-outline" />
              ),
              color: "blue",
              children: (
                <span>
                  Started the Exam at <br />{" "}
                  <span className="italic text-gray-500">
                    {currentUser?.startTime}
                  </span>
                </span>
              ),
            },
            {
              dot: <Icon className="w-5 h-5" icon="octicon:blocked-16" />,
              color: "red",
              children: (
                <span>
                  <span className="text-red-500 italic">[BLOCKED]</span>{" "}
                  Switched Tab at <br />{" "}
                  <span className="italic text-gray-500">
                    {currentTime.format()}
                  </span>
                </span>
              ),
            },
            {
              dot: <Icon className="w-5 h-5" icon="octicon:blocked-16" />,
              color: "red",
              children: (
                <span>
                  <span className="text-red-500 italic">[BLOCKED]</span> Escaped
                  Full Screen at <br />
                  <span className="italic text-gray-500">
                    {currentTime.format()}
                  </span>
                </span>
              ),
            },
            {
              dot: <Icon className="w-5 h-5" icon="radix-icons:resume" />,
              color: "blue",
              children: (
                <span>
                  Re-entered Exam at <br />
                  <span className="italic text-gray-500">
                    {currentTime.format()}
                  </span>
                </span>
              ),
            },
            {
              dot: <Icon className="w-5 h-5" icon="iconoir:submit-document" />,
              color: "green",
              children: (
                <span>
                  Submitted Exam <br />{" "}
                  <span className="italic text-gray-500">
                    {currentTime.format()}
                  </span>
                </span>
              ),
            },
          ]}
        /> */}
      </div>
    );
  };

  return (
    <>
      {seeStatusOf === "all" ? (
        <MonitoringOverviewPage
          overviewTableColumns={overviewTableColumns}
          overviewTableData={overviewTableData}
          examineeStatusStats={examineeStatusStats}
        />
      ) : (
        <MonitoringIndividualPage
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          examineeList={examineeList}
          socket={socket}
          fetchExamineeList={fetchExamineeList}
          handleEndExam={handleEndExam}
        />
      )}
    </>
  );
};

export default MonitoringTab;
