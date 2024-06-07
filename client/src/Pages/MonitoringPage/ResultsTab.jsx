import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Card,
  Table,
  Form,
  Select,
  Tag,
  Input,
  Alert,
  InputNumber,
  Button,
} from "antd";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import _ from "lodash";
import { toast } from "react-toastify";

const { TextArea } = Input;

const ResultsTab = ({
  seeStatusOf,
  setSeeStatusOf,
  currentExam,
  currentUser,
  setCurrentUser,
  examineeList,
  fetchExamDetails,
}) => {
  const [resultsTableData, setResultsTableData] = useState([]);
  const [completedExamsCount, setCompletedExamsCount] = useState(0);
  const [examCount, setExamCount] = useState({ ongoing: 0, completed: 0 });

  const currentTime = moment();

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

  useEffect(() => {
    if (currentExam) {
      const fetchMarkedResult = async () => {
        try {
          // fetch the result of this exam where the status is completed or terminated

          const response = await axios.get(
            `/api/exams/exam-history/${currentExam._id}`
          );

          // get  the length of the inprogress exam
          const inprogressExams = response.data.data.data.filter(
            (examTaker) => examTaker.status === "inprogress"
          );

          // get the length of the completed exam
          const completedExams = response.data.data.data.filter(
            (examTaker) =>
              examTaker.status === "completed" ||
              examTaker.status === "terminated"
          );

          setExamCount({
            ongoing: inprogressExams.length,
            completed: completedExams.length,
          });

          const examTakers = response.data.data.data.map((examTaker) => {
            console.log(currentExam, " the exam");
            const totalPoints = currentExam.questions.reduce(
              (acc, question) => acc + question.points,
              0
            );
            return {
              key: examTaker._id,
              name: examTaker.user.fullName,
              email: examTaker.user.email,
              points: `${examTaker.userAnswers.score}/${totalPoints}`,
              submissionTime: moment(examTaker.examEndTime).format(),
            };
          });
          setResultsTableData(examTakers);
        } catch (error) {}
      };

      fetchMarkedResult();
    }
  }, [currentExam]);

  // const resultsTableData = [
  //   {
  //     key: "1",
  //     name: "John Brown",
  //     email: "johnbrown@gmail.com",
  //     points: "8/10",
  //     submissionTime: currentTime.format(),
  //   },
  //   {
  //     key: "2",
  //     name: "John Brown",
  //     email: "johnbrown@gmail.com",
  //     points: "8/10",
  //     submissionTime: currentTime.format(),
  //   },
  //   {
  //     key: "3",
  //     name: "John Brown",
  //     email: "johnbrown@gmail.com",
  //     points: "8/10",
  //     submissionTime: currentTime.format(),
  //   },
  // ];

  const ResultsOverviewPage = () => {
    return (
      <div className='flex flex-col gap-2'>
        <div className='grid grid-cols-3 gap-4 w-full'>
          <Card>
            <div>
              <p className='font-bold text-xl italic'>{examCount.completed}</p>
              <p>Exams Marked</p>
            </div>
          </Card>
          <Card>
            <div>
              <p className='font-bold text-xl italic'>{examCount.ongoing}</p>
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
    const editQuestionPoint = async (question, answer) => {
      if (question.points < answer.point) {
        toast.error(
          "Points cannot be more than the total points of the question"
        );
        return;
      }

      //calculate the total points
      const totalPoints = currentUser.userAnswers.questionAnswers.reduce(
        (acc, question) => {
          return acc + question.point;
        },
        0
      );

      currentUser.userAnswers.score = totalPoints;

      try {
        const response = await axios.post(
          `/api/useranswers/${currentUser.userAnswers._id}`,
          currentUser.userAnswers
        );
        toast.success("Points Updated");
        fetchExamDetails(currentExam._id);
      } catch (error) {
        console.log(error);
      }
    };
    const tempCurrentUser = _.find(
      examineeList,
      (item) => item.user && item.user._id === seeStatusOf
    );
    setCurrentUser(tempCurrentUser);
    //TODO: Automatic Grading Reason from AI for the Grading
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
              {currentUser?.user?.fullName}
            </span>
            {currentUser?.status === "inprogress" ? (
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
            {currentUser?.user?.email}
          </p>
        </div>

        {currentExam.questions.map((question, index) => {
          console.log(
            "the question",
            question,
            currentUser?.userAnswers?.questionAnswers[index]
          );
          const answer = currentUser?.userAnswers?.questionAnswers[index];
          if (!answer) {
            return;
          }
          if (
            question.questionType === "True/False" ||
            question.questionType === "choose"
          ) {
            return (
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
                <div className='mt-8 flex items-center h-fit justify-start mx-4 w-72 '>
                  <div className='flex flex-col w-full gap-2'>
                    {question.questionChoice.map((choice, index) => {
                      if (choice === answer?.answerText) {
                        return (
                          <Alert
                            showIcon
                            message={choice}
                            type={
                              choice.correctAnswer === answer?.answerText
                                ? "success"
                                : "error"
                            }
                          />
                        );
                      } else if (choice == question.correctAnswer)
                        return <Alert message={choice} type="warning" />;
                      return <Alert message={choice} type="info" />;
                    })}
                  </div>
                  {/* <Form.Item label="Examinee Answer">
                    <Select defaultActiveFirstOption={answer.answerText}>
                      <Select.Option value="true">True</Select.Option>
                      <Select.Option value="false">False</Select.Option>
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
                <div className="flex flex-col gap-2 w-full">
                  {answer.manuallyMarked ? (
                    <div className="flex w-fit p-4">
                      <Tag
                        className='flex items-center w-fit gap-2'
                        color='blue'>
                        <Icon icon='mdi:checkbox-marked-outline' />
                        Manually Marked
                      </Tag>
                      <div className="flex">Marked by the Examiner</div>
                    </div>
                  ) : (
                    <div className='flex w-fit gap-2 p-4'>
                      <Tag
                        className='flex items-center w-fit gap-2'
                        color='green'>
                        <Icon icon='lucide:bot' />
                        Automatically Marked
                      </Tag>
                      <div className='flex'>{answer?.reason}</div>
                    </div>
                  )}
                  <div className="flex flex-col gap-2 w-full">
                    {question.correctAnswer === answer.answerText ? (
                      <Alert
                        message='Answered Correctly'
                        className='w-[90%]'
                        type='success'
                        showIcon
                      />
                    ) : (
                      <Alert
                        message="Incorrect Answer"
                        className="w-[90%]"
                        type="error"
                        showIcon
                      />
                    )}

                    <div className="flex gap-2 items-center justify-end">
                      points:
                      <InputNumber
                        className="w-[20%]"
                        min={0}
                        max={100000}
                        value={answer.point}
                        onChange={(value) => {
                          answer.point = value;
                          answer.manuallyMarked = true;
                        }}
                      />
                      <Button
                        onClick={(e) => editQuestionPoint(question, answer)}
                      >
                        Save Points
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          } else {
            return (
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
                    value={answer.answerText}
                    disabled={true}
                  />
                </div>
                <div className='flex flex-col gap-2 w-full'>
                  <div className='flex flex-col gap-2 w-full'>
                    <div className='flex gap-2 items-center justify-between w-full'>
                      {answer.manuallyMarked ? (
                        <Tag
                          className='flex items-center w-fit gap-2'
                          color='blue'>
                          <Icon icon='mdi:checkbox-marked-outline' />
                          Manually Marked
                        </Tag>
                      ) : (
                        <Tag
                          className='flex items-center w-fit gap-2'
                          color='green'>
                          <Icon icon='lucide:bot' />
                          Automatically Marked
                        </Tag>
                      )}
                      <InputNumber
                        className="w-[20%]"
                        min={0}
                        max={100000}
                        value={answer.point}
                        onChange={(value) => {
                          answer.point = value;
                          answer.manuallyMarked = true;
                        }}
                      />
                      <Button
                        onClick={() => editQuestionPoint(question, answer)}
                      >
                        Save Points
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            );
          }
        })}

        {/* True/False Question */}

        {/* <Card className=" w-11/12 mx-auto bg-gray-50 rounded-none">
          <div className="flex gap-8 items-center justify-between mx-4 border-b pb-2">
            <h3 className="text-blue-900 font-semibold text-lg">Question 1</h3>
            <p className="font-semibold text-blue-900">Points 1</p>
          </div>
          <div className="mt-4 mx-4 flex items-start">
            <h3 className="font-semibold text-[1rem]">Some question</h3>
          </div>
          <div className="mt-8 flex items-center h-fit justify-start mx-4 w-72 ">
            <Form.Item label="Your Answer">
              <Select defaultActiveFirstOption={"true"}>
                <Select.Option value="true">True</Select.Option>
                <Select.Option value="false">False</Select.Option>
              </Select>
            </Form.Item>
            {true ? (
                <Icon
                  className='text-green-500'
                  icon='icon-park-solid:correct'
                />
              ) : (
                <Icon
                  className='text-red-500'
                  icon='icomoon-free:cross'
                />
              )}
          </div>
          <div className="flex flex-col gap-2 w-full">
            {"aa" === "a" ? (
              <Tag className="flex items-center w-fit gap-2" color="blue">
                <Icon icon="mdi:checkbox-marked-outline" />
                Manually Marked
              </Tag>
            ) : "aa" === "aa" ? (
              <Tag className="flex items-center w-fit gap-2" color="green">
                <Icon icon="lucide:bot" />
                Automatically Marked
              </Tag>
            ) : (
              <Tag className="flex items-center w-fit gap-2" color="red">
                <Icon icon="mage:file-question-mark" />
                Not Yet Marked
              </Tag>
            )}
            <div className="flex gap-2 items-center w-full">
              <Alert
                message="Answered Correctly"
                className="w-[90%]"
                type="success"
                showIcon
              />
              <InputNumber
                className="w-[10%]"
                min={1}
                max={10}
                defaultValue={3}
              />
            </div>
            <div className="flex flex-col gap-2 w-full">
              {"aa" === "a" ? (
                <Tag className="flex items-center w-fit gap-2" color="blue">
                  <Icon icon="mdi:checkbox-marked-outline" />
                  Manually Marked
                </Tag>
              ) : "aa" === "aa" ? (
                <Tag className="flex items-center w-fit gap-2" color="green">
                  <Icon icon="lucide:bot" />
                  Automatically Marked
                </Tag>
              ) : (
                <Tag className="flex items-center w-fit gap-2" color="red">
                  <Icon icon="mage:file-question-mark" />
                  Not Yet Marked
                </Tag>
              )}
              <div className="flex gap-2 items-center w-full">
                <Alert
                  message="Incorrect Answer"
                  className="w-[90%]"
                  type="error"
                  showIcon
                />
                <InputNumber
                  className="w-[10%]"
                  min={1}
                  max={10}
                  defaultValue={3}
                />
              </div>
            </div>
          </div>
        </Card> */}
        {/* Short Answer */}
        {/* <Card className="bg-gray-50 w-11/12 mx-auto my-2">
          <div className="flex gap-8 items-center justify-between mx-4 border-b pb-2">
            <h3 className="text-blue-900 font-semibold text-lg">Question 2</h3>
            <p className="font-semibold text-blue-900">Points 1</p>
          </div>

          <div className="mt-4 mx-4 flex items-start ">
            <h3 className="font-semibold text-[1rem]">Some Question</h3>
          </div>

          <div className="mt-4 flex items-start mx-4 mb-4">
            <TextArea rows={4} placeholder="Enter your question here" />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-col gap-2 w-full">
              <div className="flex gap-2 items-center justify-between w-full">
                <Tag className="flex items-center w-fit gap-2" color="blue">
                  <Icon icon="mdi:checkbox-marked-outline" />
                  Manually Marked Question
                </Tag>

                <InputNumber
                  className="w-[10%]"
                  min={1}
                  max={10}
                  defaultValue={3}
                />
              </div>
            </div>
          </div>
        </Card> */}
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

export default ResultsTab;
