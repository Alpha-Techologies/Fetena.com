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
} from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
const { TextArea } = Input;
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

const Preview = () => {
  const { workspace } = useSelector((state) => state.data);

  const [questionCount, setQuestionCount] = useState(0);

  const [questionType, setQuestionType] = useState("");
  const [choiceCount, setChoiceCount] = useState(2);

  const updateQuestionCount = () => {
    setQuestionCount(questionCount + 1);
  };

  const { user } = useSelector((state) => state.auth);

  const { id } = useParams(); // Get the exam ID from the URL
  console.log(id);
  const [exam, setExam] = useState(null);

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

if (!exam) {
  return <p>Loading...</p>; // Show a loading indicator while fetching data
}

console.log(exam.examFile, "exam file")
console.log(exam.examFile instanceof File, "let me see")

  const handlePrint = () => {
    const printableContent =
      document.getElementById("printable-content").innerHTML;
    const originalContent = document.body.innerHTML;
    document.body.innerHTML = printableContent;
    window.print(); // Trigger printing
    document.body.innerHTML = originalContent; // Restore original content
  };

  return (
    <>
      <div className='flex gap-4 justify-between items-center mb-2 mx-auto'>
        <div className='flex gap-4 items-center '>
          <Link to='/dashboard/exams'>
            <Icon
              icon='fluent-emoji-high-contrast:left-arrow'
              className='text-2xl text-primary-500'
            />
          </Link>
          <h1 className='text-2xl font-bold text-primary-600'>Preview Exam</h1>
        </div>
        <button
          onClick={handlePrint}
          className='px-16 py-[0.35rem] text-blue-800 border border-primary-600 rounded-md hover:bg-primary-700 hover:text-white font-bold'>
          Print
        </button>
      </div>

      <Card
        style={{ width: "100%" }}
        tabProps={{ size: "middle" }}
        id='printable-content'>
        <div>
          <Card
            style={{ width: "100%" }}
            tabProps={{ size: "middle" }}>
            <div className='w-full  flex flex-wrap justify-between py-2 px-8 rounded-sm border '>
              <p className='font-semibold'>
                <span className='font-bold text-blue-700'>Exam Name : </span>
                {exam.examName}
              </p>
              <p className='font-semibold'>
                <span className='font-bold text-blue-700'>Starts at : </span>
                {new Date(exam.startDate).toLocaleString()}
              </p>
              {/* <p className="font-semibold"><span className="font-bold text-blue-700">Points : </span>{totalPoints}</p> */}

              <p className='font-semibold'>
                <span className='font-bold text-blue-700'>Points : </span>
                {exam.points}
              </p>
              {/* <p className="font-semibold"><span className="font-bold text-blue-700">Questions : </span>{questionsCollection.length}</p> */}
              <p className='font-semibold'>
                <span className='font-bold text-blue-700'>Time limit : </span>
                {exam.duration} Minutes
              </p>

              {/* <p className="font-semibold"><span className="font-bold text-blue-700">Allowed Attempts : </span>Unlimited</p> */}
            </div>

          <div className="w-full  flex flex-wrap gap-16 py-2 px-8 my-4">
          <p className="font-semibold flex gap-2 items-center justify-center"><span className="font-bold text-blue-700">Organization : </span>AASTU <span><Icon icon="gravity-ui:seal-check" className="text-lg text-blue-800" /></span></p>

          <p className="font-semibold flex gap-2 items-center justify-center"><span className="font-bold text-blue-700">Created by : </span>{user.firstName} {user.lastName} </p>
        

</div>

            <div className='w-full  flex flex-col gap-2 py-4 px-8 my-4 items-start'>
              <h3 className='text-xl font-bold text-blue-900'>Instructions</h3>
              <div
                className='text-left w-4/6'
                dangerouslySetInnerHTML={{ __html: exam.instruction }}
              />

              <p className='font-bold mt-4'>Good Luck!</p>
            </div>
          </Card>
        </div>

        <div className='w-full flex flex-wrap justify-between py-2 px-8 rounded-sm border mt-4'>
          <p className='font-semibold'>
            <span className='font-bold text-blue-700'>Private Answer : </span>
            {exam.privateAnswer ? "Yes" : "No"}
          </p>
          <p className='font-semibold'>
            <span className='font-bold text-blue-700'>Private Score : </span>
            {exam.privateScore ? "Yes" : "No"}
          </p>
          <p className='font-semibold'>
            <span className='font-bold text-blue-700'>Security level : </span>
            {exam.securityLevel}
          </p>
          <p className='font-semibold'>
            <span className='font-bold text-blue-700'>Exam type : </span>
            {exam.examType}
          </p>
        </div>

        <div className='w-full flex flex-wrap justify-between py-2 px-8 rounded-sm border mt-4'>
          <p className='font-semibold'>
            <span className='font-bold text-blue-700'>Calculator : </span>
            {exam.toolsPermitted.includes("calculator") ? "Yes" : "No"}
          </p>
          <p className='font-semibold'>
            <span className='font-bold text-blue-700'>
              Formulas Collection :{" "}
            </span>
            {exam.formulasCollection ? "Yes" : "No"}
          </p>
          <p className='font-semibold'>
            <span className='font-bold text-blue-700'>Upload Materials : </span>
            {exam.uploadMaterials ? "Yes" : "No"}
          </p>
        </div>





{ exam.examType === 'online' &&

          (<div className="flex flex-col gap-4 my-4 mt-8 ">
  {exam.questions.map((question, index) => (
    <div key={index} className="mb-4">
  
      {question.questionType === "True/False" ? (






<Card className="mx-auto bg-gray-50 rounded-none">
<div className="flex gap-8 items-center justify-between  border-b pb-2">
  <h3 className="text-blue-900 font-semibold text-lg">Question {index + 1}</h3>
    <p className="font-semibold text-blue-900">Points {question.points}</p>
  </div>
  <div className="mt-4  flex items-start">
   <h3 className="font-semibold text-[1rem]">{question.questionText}</h3>
  </div>
  <div className="mt-8 flex items-start ">
    <Form.Item label="Your Answer" className="w-48">
      <Select >
        <Select.Option value="true">True</Select.Option>
        <Select.Option value="false">False</Select.Option>
      </Select>
    </Form.Item>
  </div>
 
</Card>









      ) : question.questionType === "choose" ? (
        





<Card className="bg-gray-50 mx-auto">
  <div className="flex gap-8 items-center justify-between border-b pb-2">
    <h3 className="text-blue-900 font-semibold text-lg">Question {index + 1}</h3>
    <p className="font-semibold text-blue-900">Points {question.points}</p>

  </div>
  <div className="mt-4 flex items-start border-b pb-4">
  <h3 className="font-semibold text-[1rem]">{question.questionText}</h3>
  </div>
  <div className="mt-4 w-full flex items-start  gap-4">

                    <div className='flex flex-col'>
                      <Radio.Group value={question.correctAnswer}>
                        {question.questionChoice.map((choice, choiceIndex) => (
                          <Form.Item
                            key={choiceIndex}
                            label={`${String.fromCharCode(65 + choiceIndex)}`}>
                            <div className='flex gap-4 justify-center'>
                              <p className='font-semibold'>{choice}</p>
                              <div className='flex gap-2 items-center'>
                                <Radio value={choice}></Radio>
                                <span className='text-blue-700'></span>
                              </div>
                            </div>
                          </Form.Item>
                        ))}
                      </Radio.Group>
                    </div>
                  </div>
                </Card>
              ) : question.questionType === "shortAnswer" ? (
                <Card className='bg-gray-50  mx-auto'>
                  <div className='flex gap-8 items-center justify-between  border-b pb-2'>
                    <h3 className='text-blue-900 font-semibold text-lg'>
                      Question {index + 1}
                    </h3>
                    <p className='font-semibold text-blue-900'>
                      Points {question.points}
                    </p>
                  </div>

                  <div className='mt-4 flex items-start '>
                    <h3 className='font-semibold text-[1rem]'>
                      {question.questionText}
                    </h3>
                  </div>

                  <div className='mt-4 flex items-start mb-4'>
                    <TextArea
                      rows={4}
                      placeholder='Enter your question here'
                    />
                  </div>
                </Card>
              ) : question.questionType === "essay" ? (
                <Card className='bg-gray-50  mx-auto '>
                  <div className='flex gap-8 items-center justify-between border-b pb-2'>
                    <h3 className='text-blue-900 font-semibold text-lg'>
                      Question {index + 1}
                    </h3>
                    <p className='font-semibold text-blue-900'>
                      Points {question.points}
                    </p>
                  </div>

                  <div className='mt-4  flex items-start'>
                    <h3 className='font-semibold text-[1rem]'>
                      {question.questionText}
                    </h3>
                  </div>

     <div className="mt-4 flex items-start mb-4">
       <TextArea
         rows={4}
         placeholder="Enter your question here"
       
         
       />
     </div>
    
       
      </Card>

      ) : null}
    </div>
  ))}
</div>)

}



{exam.examType !== 'online' && exam.examFile && (
  <Card
    className='hover:shadow-md transition-all ease-in-out duration-300 border border-gray-200 mx-auto mt-8 mb-2'
  >
    <div className='flex flex-col gap-4 justify-center items-center'>
      <div className='flex gap-4 justify-center items-center'>
       


      </div>
      {exam.examFile && (
        <iframe
        src={`http://localhost:8080${exam.examFile}`}
        title={exam.examFile}
        className="w-[1000px] h-[600px]"
      />
      )}
    </div>
  </Card>
)}

<Card className=" mx-auto mt-8 mb-2 shadow-sm ">
             <div className="flex gap-8 items-center justify-center">
             <h3 className=" font-semibold text-[1rem]">Total Questions : <span className="text-blue-900"> {exam.questions.length} </span> </h3>
       <h3 className=" font-semibold text-[1rem]">Total Points <span className="text-blue-900"> {exam.points} </span> </h3> 
         
 
       </div>
 </Card>









    </Card>
    </>
  );
};

export default Preview;
