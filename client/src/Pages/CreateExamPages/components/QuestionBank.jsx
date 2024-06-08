import React, { useState, useEffect } from "react";
import { Button,Input, Modal, Collapse,Card,Form ,Select,Radio   } from "antd";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
const { TextArea } = Input;

const { Panel } = Collapse;

const QuestionBank = ({ handleCancel, handleOk, isModalOpen,setImportedExams,importedExams,setActiveTabKey }) => {
  const { workspace } = useSelector((state) => state.data);
  const { userOrganizationsIdAndRole } = useSelector((state) => state.data);
  const [exams, setExams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [addedQuestions, setAddedQuestions] = useState(new Set());

  const handleAddQuestion = (question) => {
    delete question._id;
    setImportedExams([...importedExams, question]);
    setAddedQuestions(prevState => new Set([...prevState, question._id]));
    setActiveTabKey("Preview")
  };

  console.log(importedExams);

  const fetchData = async () => {
    setIsLoading(true);
    const id = workspace?._id;
    if (
      userOrganizationsIdAndRole[id] &&
      (userOrganizationsIdAndRole[id] === "examiner" ||
        userOrganizationsIdAndRole[id] === "admin")
    ) {
      try {
        const response = await axios.get(
          `/api/exams/my-exam/${id}?fields=examName,description,_id,questions&examType=online`
        );
        setExams(response.data.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!workspace) {
      navigate("/userexams");
    } else {
      fetchData();
    }
  }, [workspace, navigate]);




  const transformedItems = exams.map((exam) => {
    const questionTransformed = exam.questions.map((question, index) => {
      return {
        key: `${exam._id}-${question._id}`,
        label: (
          <div className="flex gap-8 items-center justify-between mx-4 ">
            <h3 className="text-blue-900 font-semibold">Question {index + 1}</h3>
            <p className="font-semibold text-blue-900">Points {question.points}</p>
          </div>
        ),
        children: (
          <div>
            {question.questionType === 'True/False' && (
              <Card className="w-full mx-auto bg-gray-50 rounded-none">
                <div className="flex items-start">
                  <div className="w-48">
                    <p className="text-[0.8rem]">Question Type: <span className="font-medium text-[0.9rem]">{question.questionType}</span></p>
                  </div>
                </div>
                <div className="mt-2 flex items-start">
                  <p>Question Text: <span className="font-semibold text-[1rem]">{question.questionText}</span></p>
                </div>
                <div className="mt-2 flex items-start">
                  <div className="w-48">
                    <p className="text-[0.8rem]">Correct Answer: <span className="font-semibold text-[0.9rem]">{question.correctAnswer}</span></p>
                  </div>
                </div>
                <div className="mt-2 text-end">
                <Button
  className="mt-2 text-[0.8rem] w-auto text-right px-8 py-0"
  type="primary"
  disabled={addedQuestions.has(question._id)}
  onClick={() => handleAddQuestion(question)}
>
  {addedQuestions.has(question._id) ? 'Added' : 'Add'}
</Button>                </div>
              </Card>
            )}

            {question.questionType === 'choose' && (
              <Card className="bg-gray-50 w-full mx-auto">
                <div className="flex items-start">
                  <div className="w-48">
                    <p className="text-[0.8rem]">Question Type: <span className="font-medium text-[0.9rem]">{question.questionType}</span></p>
                  </div>
                </div>
                <div className="mt-2 flex items-start">
                  <p>Question Text: <span className="font-semibold text-[1rem]">{question.questionText}</span></p>
                </div>
                <div className="mt-2 flex items-start">
                  <div className="w-48">
                    <p className="text-[0.8rem]">Correct Answer: <span className="font-semibold text-[0.9rem]">{question.correctAnswer}</span></p>
                  </div>
                </div>
                <div className="mt-4 w-full flex items-start mx-4 gap-4">
                  <Radio.Group value={question.correctAnswer}>
                    {question.questionChoice && question.questionChoice.map((choice, choiceIndex) => (
                      <Form.Item key={choiceIndex} label={`${String.fromCharCode(65 + choiceIndex)}`}>
                        <div className="flex gap-4 justify-center">
                          <p className="font-semibold">{choice}</p>
                          <div className="flex gap-2 items-center">
                            <Radio value={choice}></Radio>
                            <span className="text-blue-700"></span>
                          </div>
                        </div>
                      </Form.Item>
                    ))}
                  </Radio.Group>
                </div>
                <div className=" text-end">
                <Button
  className="mt-2 text-[0.8rem] w-auto text-right px-8 py-0"
  type="primary"
  disabled={addedQuestions.has(question._id)}
  onClick={() => handleAddQuestion(question)}
>
  {addedQuestions.has(question._id) ? 'Added' : 'Add'}
</Button>                </div>
              </Card>
            )}

{question.questionType === 'shortAnswer' && (
              <Card className="bg-gray-50 w-full mx-auto">
         
   
       
         <div className="flex items-start">
                  <div className="w-48">
                    <p className="text-[0.8rem]">Question Type: <span className="font-medium text-[0.9rem]">{question.questionType}</span></p>
                  </div>
                </div>
                <div className="mt-2 flex items-start">
                  <p>Question Text: <span className="font-semibold text-[1rem]">{question.questionText}</span></p>
                </div>
  
                <div className=" text-end mt-4">
                <Button
  className="mt-2 text-[0.8rem] w-auto text-right px-8 py-0"
  type="primary"
  disabled={addedQuestions.has(question._id)}
  onClick={() => handleAddQuestion(question)}
>
  {addedQuestions.has(question._id) ? 'Added' : 'Add'}
</Button>                </div>
   
      
     </Card>
  
)}



{question.questionType === 'essay' && (
    <Card className="bg-gray-50 w-11/12 mx-auto my-8">
  <div className="flex items-start">
                  <div className="w-48">
                    <p className="text-[0.8rem]">Question Type: <span className="font-medium text-[0.9rem]">{question.questionType}</span></p>
                  </div>
                </div>
                <div className="mt-2 flex items-start">
                  <p>Question Text: <span className="font-semibold text-[1rem]">{question.questionText}</span></p>
                </div>

   
   <div className="mt-4 mx-4 flex items-start">
   <h3 className="font-semibold text-[1rem]">{question.questionText}</h3>
</div>

<div className=" text-end mt-4">
<Button
  className="mt-2 text-[0.8rem] w-auto text-right px-8 py-0"
  type="primary"
  disabled={addedQuestions.has(question._id)}
  onClick={() => handleAddQuestion(question)}
>
  {addedQuestions.has(question._id) ? 'Added' : 'Add'}
</Button>                </div>

  
 </Card>
)}

          </div>
        )
      };
    });

    const component = <Collapse>{questionTransformed.map(q => <Panel key={q.key} header={q.label}>{q.children}</Panel>)}</Collapse>;

    return {
      key: exam._id,
      label: exam.examName,
      children: component,
    };
  });

  const onChange = (key) => {
    console.log(key);
  };

  return (
    <Modal
      title="Import existing questions"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <Collapse onChange={onChange}>
          {transformedItems.map(item => (
            <Panel key={item.key} header={item.label}>
              {item.children}
            </Panel>
          ))}
        </Collapse>
      )}
    </Modal>
  );
};

export default QuestionBank;
