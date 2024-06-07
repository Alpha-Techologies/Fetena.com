import {
  Card,
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  DatePicker,
  Radio,
  Tag,
  Modal,
} from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
const { TextArea } = Input;
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

const Preview = ({
  setActiveTabKey,
  basicInfoValues,
  setBasicInfoValues,
  questionsCollection,
  setQuestionsCollection,
  choiceCount,
  chooseOnChange,
  setExamKey,
  examType,
}) => {
  // const arrQuestion = [];
  // for (const key in questionsCollection) {
  //   arrQuestion.push(questionsCollection[key]);
  // }
  // setQuestionsCollection(arrQuestion);

  
  console.log(questionsCollection);
  const totalPoints = questionsCollection.reduce(
    (total, question) => total + (question.points || 0),
    0
  );
  const { workspace } = useSelector((state) => state.data);
  console.log(workspace._id, "points");

  const [questionCount, setQuestionCount] = useState(0);

  const updateQuestionCount = () => {
    setQuestionCount(questionCount + 1);
  };

  const { user } = useSelector((state) => state.auth);
  console.log(basicInfoValues.examFile);

  const submitExam = async () => {
    if (!basicInfoValues.examName) {
      toast.error("Please enter the exam name");
      return;
    }
    if (!basicInfoValues.duration) {
      toast.error("Please enter the duration");
      return;
    }
    // if (!basicInfoValues.examStartDate) {
    //   toast.error("Please enter the exam start date");
    //   return;
    // }
    // if (!basicInfoValues.organization) {
    //   toast.error("Please enter the organization");
    //   return;
    // }

    if (!basicInfoValues.instruction) {
      toast.error("Please enter the instruction");
      return;
    }
    if (!basicInfoValues.examType) {
      toast.error("Please enter the exam type");
      return;
    }
    if (!basicInfoValues.material) {
      basicInfoValues.uploadMaterials = false;
    }
    if (basicInfoValues.examTime && basicInfoValues.examDate) {
      basicInfoValues.examStartDate = new Date(
        basicInfoValues.examDate + " " + basicInfoValues.examTime
      );
      console.log(basicInfoValues.examStartDate,"aheeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
    }

    console.log(basicInfoValues.examStartDate,"aheeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");

    // if (!basicInfoValues.material || !basicInfoValues.material.name) {
    //   toast.error("Please upload the material");
    //   return;
    // }

    // Check if questions are available
    if (
      basicInfoValues.examType === "online" &&
      questionsCollection.length === 0
    ) {
      toast.error("Please add questions to submit the exam.");
      return;
    }
console.log("one add questions start-------------------------------------------------------------------------------------------")
    try {
      // Make the Axios POST request to save questions
      const response = await axios.post("/api/questions", questionsCollection);

      // Handle success
      console.log("Questions submitted successfully:", response.data.data.data);
      setQuestionsCollection([]);
      localStorage.removeItem("questionsCollection");

      // setExamKey(response.data.data.exam.examKey);

      const updatedBasicInfoValues = {
        ...basicInfoValues,
        questions: response.data.data.data,
        points: totalPoints,
      };
      setBasicInfoValues(updatedBasicInfoValues);

      const examDataToSend = new FormData();

      examDataToSend.append(
        "data",
        JSON.stringify({
          examName: updatedBasicInfoValues.examName,
          duration: updatedBasicInfoValues.duration,
          startDate: updatedBasicInfoValues.examStartDate,
          organization: workspace._id,
          privateAnswer: updatedBasicInfoValues.privateAnswer,
          privateScore: updatedBasicInfoValues.privateScore,
          instruction: updatedBasicInfoValues.instruction,
          securityLevel: updatedBasicInfoValues.securityLevel,
          examType: updatedBasicInfoValues.examType,
          access: updatedBasicInfoValues.access,
          toolsPermitted: [
            updatedBasicInfoValues.calculator && "calculator",
            updatedBasicInfoValues.formulasCollection && "formulasCollection",
            updatedBasicInfoValues.uploadMaterials && "uploadMaterials",
          ].filter(Boolean), // Filters out any falsy values
          points: updatedBasicInfoValues.points,
          examFile: updatedBasicInfoValues.examFile,
          questions: response.data.data.data, // Ensure the questions are from the response
        })
      );

      if (updatedBasicInfoValues.material) {
        examDataToSend.append("material", updatedBasicInfoValues.material);
      }

      console.log(examDataToSend);

      // Send examData to the /api/exams endpoint with authentication header
      const examResponse = await axios.post("/api/exams", examDataToSend);

      console.log("Exam data submitted successfully:", examResponse);
      toast.success("Exam submitted successfully.");

      // Clear questionsCollection and remove from local storage
      setExamKey(examResponse.data.data.exam.examKey);

      setActiveTabKey("Success");
    } catch (error) {
      // Handle error
      console.error("Error submitting exam:", error);
      toast.error("Error submitting exam. Please try again later.");
    }
    console.log("one add questions end-------------------------------------------------------------------------------------------")

    setBasicInfoValues({
      examName: "",
      duration: 1,
      examStartDate: null,
      organization: "663e889c6470d66fcf38a4d4",
      privateAnswer: false,
      privateScore: false,
      instruction: "",
      securityLevel: "low",
      examType: "",
      calculator: false,
      formulasCollection: false,
      uploadMaterials: false,
      material: null,
      questions: [],
      access: "closed",
      points: 0,
      examFile: null,
    });
    localStorage.removeItem("basicInfoValues");
  };

  const [editingQuestion, setEditingQuestion] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleEditQuestion = (index) => {
    const question = questionsCollection[index];
    setEditingQuestion({ ...question, index });
    setIsModalVisible(true);
  };

  // const handleChoiceEditQuestion = (question, index) => {
  //   console.log(question)
  //   const questionCopy = { ...question };
  //   setEditingQuestion({ ...questionCopy, index });
  //   setIsModalVisible(true);
  // };

  // // Add a function to handle deleting a question

  const handleOk = () => {
    const updatedQuestions = [...questionsCollection];
    updatedQuestions[editingQuestion.index] = editingQuestion;
    setQuestionsCollection(updatedQuestions);
    setIsModalVisible(false);
    setEditingQuestion(null);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    setEditingQuestion(null);
  };

  // Define state variables for modal visibility and the index of the question to delete
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const deleteQuestion = (index) => {
    const updatedQuestions = [...questionsCollection];
    updatedQuestions.splice(index, 1); // Remove the question at the specified index
    setQuestionsCollection(updatedQuestions);
  };

  // Function to handle opening the delete confirmation modal
  const showDeleteModal = (index) => {
    setDeleteIndex(index);
    setDeleteModalVisible(true);
  };

  // Function to handle closing the delete confirmation modal
  const handleDeleteCancel = () => {
    setDeleteIndex(null);
    setDeleteModalVisible(false);
  };

  // Function to delete the question and close the modal
  const confirmDeleteQuestion = () => {
    deleteQuestion(deleteIndex);
    setDeleteModalVisible(false);
    toast.success("Question deleted successfully.");
  };

  return (
    <div>
      <div className="flex justify-center items-center gap-2 mb-4 mt-2">
        <Icon
          icon="material-symbols:preview"
          className="text-2xl font-bold text-blue-800"
        />
        <p className="font-semibold  text-blue-900 text-lg">Exam Edit & Preview</p>
      </div>

      <div>
        <Card style={{ width: "100%" }} tabProps={{ size: "middle" }}>
          <div className="w-full  flex flex-wrap justify-between py-2 px-8 rounded-sm border ">
            <p className="font-semibold">
              <span className="font-bold text-blue-700">Exam Name : </span>
              {basicInfoValues.examName}
            </p>
            <p className="font-semibold">
              <span className="font-bold text-blue-700">
                Starting date & time :{" "}
              </span>
              {basicInfoValues.examStartDate
                ? new Date(basicInfoValues.examStartDate).toLocaleString()
                : ""}
                {
                  new Date(
                    basicInfoValues.examDate + " " + basicInfoValues.examTime
                  ).toLocaleString()
                }
            </p>
            <p className="font-semibold">
              <span className="font-bold text-blue-700">Points : </span>
              {totalPoints}
            </p>

            <p className="font-semibold">
              <span className="font-bold text-blue-700">Questions : </span>
              {questionsCollection.length}
            </p>
            <p className="font-semibold">
              <span className="font-bold text-blue-700">Time limit : </span>
              {basicInfoValues.duration} Minutes
            </p>

            {/* <p className="font-semibold"><span className="font-bold text-blue-700">Allowed Attempts : </span>Unlimited</p> */}
          </div>

          <div className="w-full  flex flex-wrap gap-16 py-2 px-8 my-4">
            <p className="font-semibold flex gap-2 items-center justify-center">
              <span className="font-bold text-blue-700">Organization : </span>
              AASTU{" "}
              <span>
                <Icon
                  icon="gravity-ui:seal-check"
                  className="text-lg text-blue-800"
                />
              </span>
            </p>
           
            <p className="font-semibold flex gap-2 items-center justify-center">
              <span className="font-bold text-blue-700">Created by : </span>
              {user.firstName} {user.lastName}{" "}
            </p>
          </div>

          <div className="w-full  flex flex-col gap-2 py-4 px-8 my-4 items-start">
            <h3 className="text-xl font-bold text-blue-900">Instructions</h3>
            <div
              className="text-left w-4/6"
              dangerouslySetInnerHTML={{ __html: basicInfoValues.instruction }}
            />

            <p className="font-bold mt-4">Good Luck!</p>
          </div>
        </Card>
      </div>

      <div className="w-full  flex flex-wrap justify-between py-2 px-8 rounded-sm border mt-4">
        <p className="font-semibold">
          <span className="font-bold text-blue-700">Private Answer : </span>
          {basicInfoValues.privateAnswer ? "Yes" : "No"}
        </p>
        <p className="font-semibold">
          <span className="font-bold text-blue-700">Private Score : </span>
          {basicInfoValues.privateScore ? "Yes" : "No"}
        </p>

        <p className="font-semibold">
          <span className="font-bold text-blue-700">Security level : </span>
          {basicInfoValues.securityLevel}
        </p>
        <p className="font-semibold">
          <span className="font-bold text-blue-700">Exam type : </span>
          {basicInfoValues.examType}
        </p>

        {/* <p className="font-semibold"><span className="font-bold text-blue-700">Allowed Attempts : </span>Unlimited</p> */}
      </div>

      <div className="w-full flex flex-wrap justify-between py-2 px-8 rounded-sm border mt-4">
        <p className="font-semibold">
          <span className="font-bold text-blue-700">Calculator : </span>
          {basicInfoValues.calculator ? "Yes" : "No"}
        </p>

        <p className="font-semibold">
          <span className="font-bold text-blue-700">
            Formulas Collection :{" "}
          </span>
          {basicInfoValues.formulasCollection ? "Yes" : "No"}
        </p>

        <p className="font-semibold">
          <span className="font-bold text-blue-700">Upload Materials : </span>
          {basicInfoValues.uploadMaterials ? "Yes" : "No"}
        </p>
      </div>

      <Modal
        title="Confirm Delete"
        visible={deleteModalVisible}
        onOk={confirmDeleteQuestion}
        onCancel={handleDeleteCancel}
      >
        <p>Are you sure you want to delete this question?</p>
      </Modal>

      <Modal
        title="Edit Question"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        {editingQuestion && (
          <div>
            {/* Render the appropriate form based on the question type */}
            {editingQuestion.questionType === "True/False" && (
              <div className="flex flex-col gap-2 mt-6">
                {/* Form fields for True/False question */}
                <Input
                  placeholder="Question text"
                  value={editingQuestion.questionText}
                  onChange={(e) =>
                    setEditingQuestion({
                      ...editingQuestion,
                      questionText: e.target.value,
                    })
                  }
                />
                <InputNumber
                  placeholder="Points"
                  value={editingQuestion.points}
                  onChange={(value) =>
                    setEditingQuestion({
                      ...editingQuestion,
                      points: value,
                    })
                  }
                />

                <div className="mt-4 flex items-start mx-4">
                  <Form.Item
                    label="Correct Answer"
                    rules={[
                      {
                        required: true,
                        message: "Please select the correct answer",
                      },
                    ]}
                  >
                    <Select
                      value={editingQuestion.correctAnswer}
                      //  onChange={(value) => trueFalseOnChange('correctAnswer', value)}
                      onChange={(value) =>
                        setEditingQuestion({
                          ...editingQuestion,
                          correctAnswer: value,
                        })
                      }
                    >
                      <Select.Option value="true">True</Select.Option>
                      <Select.Option value="false">False</Select.Option>
                    </Select>
                  </Form.Item>
                </div>

                {/* Other fields as needed */}
              </div>
            )}

            {/* Add similar logic for other question types */}

            {editingQuestion.questionType === "choose" && (
              <div className="flex flex-col gap-2 mt-6">
                <Input
                  placeholder="Question text"
                  value={editingQuestion.questionText}
                  onChange={(e) =>
                    setEditingQuestion({
                      ...editingQuestion,
                      questionText: e.target.value,
                    })
                  }
                />
                <InputNumber
                  placeholder="Points"
                  value={editingQuestion.points}
                  onChange={(value) =>
                    setEditingQuestion({
                      ...editingQuestion,
                      points: value,
                    })
                  }
                />
                {editingQuestion.questionChoice.map((choice, choiceIndex) => (
                  <div key={choiceIndex} className="flex items-center gap-2">
                    <Input
                      placeholder="Choice"
                      value={choice}
                      onChange={(e) =>
                        setEditingQuestion({
                          ...editingQuestion,
                          questionChoice: editingQuestion.questionChoice.map(
                            (c, i) => (i === choiceIndex ? e.target.value : c)
                          ),
                        })
                      }
                    />
                    <Radio
                      checked={editingQuestion.correctAnswer === choiceIndex}
                      onChange={() =>
                        setEditingQuestion({
                          ...editingQuestion,
                          correctAnswer: choiceIndex,
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            )}

            {editingQuestion.questionType === "shortAnswer" && (
              <div className="flex flex-col gap-2 mt-6">
                {/* Form fields for True/False question */}
                <Input
                  placeholder="Question text"
                  value={editingQuestion.questionText}
                  onChange={(e) =>
                    setEditingQuestion({
                      ...editingQuestion,
                      questionText: e.target.value,
                    })
                  }
                />
                <InputNumber
                  placeholder="Points"
                  value={editingQuestion.points}
                  onChange={(value) =>
                    setEditingQuestion({
                      ...editingQuestion,
                      points: value,
                    })
                  }
                />

                {/* Other fields as needed */}
              </div>
            )}
            {editingQuestion.questionType === "essay" && (
              <div className="flex flex-col gap-2 mt-6">
                {/* Form fields for True/False question */}
                <Input
                  placeholder="Question text"
                  value={editingQuestion.questionText}
                  onChange={(e) =>
                    setEditingQuestion({
                      ...editingQuestion,
                      questionText: e.target.value,
                    })
                  }
                />
                <InputNumber
                  placeholder="Points"
                  value={editingQuestion.points}
                  onChange={(value) =>
                    setEditingQuestion({
                      ...editingQuestion,
                    })
                  }
                />

                {/* Other fields as needed */}
              </div>
            )}
          </div>
        )}
      </Modal>

      {examType === "online" && (
        <div className="flex flex-col gap-4 my-4 mt-8 ">
          {questionsCollection.map((question, index) => (
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
                  <div className="mt-4 mx-4 flex items-start border-b pb-4">
                    <h3 className="font-semibold text-[1rem]">
                      {question.questionText}
                    </h3>
                  </div>
                  <div className="mt-8 flex items-start mx-4 ">
                    <Form.Item label="Your Answer" className="w-48">
                      <Select>
                        <Select.Option value="true">True</Select.Option>
                        <Select.Option value="false">False</Select.Option>
                      </Select>
                    </Form.Item>
                  </div>
                  {/* Example for the 'True/False' question type */}

                  <div className="flex justify-end items-center mx-4">
                    <Button
                      type="link"
                      onClick={() => handleEditQuestion(index)}
                    >
                      <Icon
                        icon="mage:edit"
                        className="text-blue-800 text-2xl hover:text-gray-900"
                      />
                    </Button>

                    <Button type="link" onClick={() => showDeleteModal(index)}>
                      <Icon
                        icon="material-symbols:delete-outline"
                        className="text-blue-800 text-2xl hover:text-gray-900"
                      />
                    </Button>
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
                    <Radio.Group value={question.correctAnswer}>
                      {question.questionChoice.map((choice, choiceIndex) => (
                        <Form.Item
                          key={choiceIndex}
                          label={`${String.fromCharCode(65 + choiceIndex)}`}
                        >
                          <div className="flex gap-4 justify-center">
                            <p className="font-semibold">{choice}</p>
                            <div className="flex gap-2 items-center">
                              <Radio value={choiceIndex}></Radio>
                              <span className="text-blue-700"></span>
                            </div>
                          </div>
                        </Form.Item>
                      ))}
                    </Radio.Group>
                  </div>
                  <div className="flex justify-end items-center mx-4">
                    <Button
                      type="link"
                      onClick={() => handleEditQuestion(index)}
                    >
                      <Icon
                        icon="mage:edit"
                        className="text-blue-800 text-2xl hover:text-gray-900"
                      />
                    </Button>
                    <Button type="link" onClick={() => showDeleteModal(index)}>
                      <Icon
                        icon="material-symbols:delete-outline"
                        className="text-blue-800 text-2xl hover:text-gray-900"
                      />
                    </Button>
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

                  <div className="mt-4 mx-4 flex items-start border-b pb-4">
                    <h3 className="font-semibold text-[1rem]">
                      {question.questionText}
                    </h3>
                  </div>

                  <div className="mt-4 flex items-start mx-4 mb-4">
                    <TextArea rows={4} placeholder="Enter your question here" />
                  </div>
                  <div className="flex justify-end items-center mx-4">
                    <Button
                      type="link"
                      onClick={() => handleEditQuestion(index)}
                    >
                      <Icon
                        icon="mage:edit"
                        className="text-blue-800 text-2xl hover:text-gray-900"
                      />
                    </Button>

                    <Button type="link" onClick={() => showDeleteModal(index)}>
                      <Icon
                        icon="material-symbols:delete-outline"
                        className="text-blue-800 text-2xl hover:text-gray-900"
                      />
                    </Button>
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

                  <div className="mt-4 mx-4 flex items-start border-b pb-4">
                    <h3 className="font-semibold text-[1rem]">
                      {question.questionText}
                    </h3>
                  </div>

                  <div className="mt-4 flex items-start mx-4 mb-4">
                    <TextArea rows={4} placeholder="Enter your question here" />
                  </div>
                  <div className="flex justify-end items-center mx-4">
                    <Button
                      type="link"
                      onClick={() => handleEditQuestion(index)}
                    >
                      <Icon
                        icon="mage:edit"
                        className="text-blue-800 text-2xl hover:text-gray-900"
                      />
                    </Button>

                    <Button type="link" onClick={() => showDeleteModal(index)}>
                      <Icon
                        icon="material-symbols:delete-outline"
                        className="text-blue-800 text-2xl hover:text-gray-900"
                      />
                    </Button>
                  </div>
                </Card>
              ) : null}
            </div>
          ))}
        </div>
      )}

      {examType !== "online" && basicInfoValues.examFile && (
        <Card className="hover:shadow-md transition-all ease-in-out duration-300 border border-gray-200 mx-auto mt-8 mb-2">
          <div className="flex flex-col gap-4 justify-center items-center">
            <div className="flex gap-4 justify-center items-center">
              <Icon
                icon="healthicons:i-exam-multiple-choice-outline"
                className="text-4xl text-blue-700"
              />
              <h3 className="font-bold text-md">
                {basicInfoValues.examFile.name}
              </h3>
            </div>
            {basicInfoValues.examFile instanceof File && (
              <iframe
                src={URL.createObjectURL(basicInfoValues.examFile)}
                title={basicInfoValues.examFile.name}
                className="w-[1000px] h-[600px]"
              />
            )}


          </div>
        </Card>
      )}

<Button type="primary"
  onClick={() => setActiveTabKey("Exam Questions")}
 className="px-8 font-semibold bg-white hover:bg-blue-700 text-blue-500 shadow-none border border-blue-500 hover:border-blue-700 font-boldpx-8   group">
          <div className="flex gap-2 items-center"> <Icon  icon="tabler:edit" className="text-xl text-blue-500 group-hover:text-white" />{" "}Add More Questions</div>
          </Button>
          
      <Card className=" mx-auto mt-8 mb-2 shadow-sm ">
        <div className="flex gap-8 items-center justify-center">
          <h3 className=" font-semibold text-[1rem] flex gap-1 justify-center items-center">
          <Icon icon="pepicons-pop:question" className="text-blue-900" />
            Total Questions :{" "}
            <span className="text-blue-900">
              {" "}
              {questionsCollection.length}{" "}
            </span>{" "}
          </h3>
          <h3 className=" font-semibold text-[1rem] flex gap-1 justify-center items-center">
          <Icon icon="material-symbols:credit-score-outline"  className="text-blue-900" />
            Total Points :<span className="text-blue-900"> {totalPoints} </span>{" "}
          </h3>
        
   
          <Button type="primary" className="px-8 flex gap-2 items-center font-semibold bg-primary-500" onClick={submitExam}><Icon  icon="lucide:save"  className="text-xl text-white" />{" "} Save & Submit</Button>
        </div>
      </Card>
    </div>
  );
};

export default Preview;
