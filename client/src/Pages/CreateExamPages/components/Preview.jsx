import { Card, Form, Input, Button, Select, InputNumber, DatePicker, Radio, Tag } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
const { TextArea } = Input;
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";




const Preview = ({setActiveTabKey,basicInfoValues, setBasicInfoValues, questionsCollection, setQuestionsCollection, choiceCount,  chooseOnChange, setExamKey}) => {

  const totalPoints = questionsCollection.reduce((total, question) => total + (question.points || 0), 0);
  const { workspace } = useSelector((state) => state.data);
  console.log(workspace._id,"points")





const [questionCount,setQuestionCount] = useState(0);


const updateQuestionCount = () => { setQuestionCount(questionCount + 1) }

const {user} = useSelector((state) => state.auth);




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
    basicInfoValues.examStartDate = new Date(basicInfoValues.examDate + " " + basicInfoValues.examTime);
  }
  
  console.log(basicInfoValues.examStartDate)

  // if (!basicInfoValues.material || !basicInfoValues.material.name) {
  //   toast.error("Please upload the material");
  //   return;
  // }

  // Check if questions are available
  if (questionsCollection.length === 0) {
    toast.error("Please add questions to submit the exam.");
    return;
  }

  try {
    // Make the Axios POST request to save questions
    const response = await axios.post('/api/questions', questionsCollection);

    // Handle success
    console.log('Questions submitted successfully:', response.data.data.data);

    // setExamKey(response.data.data.exam.examKey);

    const updatedBasicInfoValues = { ...basicInfoValues, questions: response.data.data.data };
    setBasicInfoValues(updatedBasicInfoValues);


    const examDataToSend = new FormData();

    examDataToSend.append(
      "data",
      JSON.stringify(
        {
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
            updatedBasicInfoValues.uploadMaterials && "uploadMaterials"
          ].filter(Boolean), // Filters out any falsy values
  
          questions: response.data.data.data // Ensure the questions are from the response
        }
      )
    )


    if (updatedBasicInfoValues.material) {
      examDataToSend.append("material", updatedBasicInfoValues.material);
    }


   console.log(examDataToSend)
   
    // Send examData to the /api/exams endpoint with authentication header
    const examResponse = await axios.post('/api/exams', examDataToSend);

    console.log('Exam data submitted successfully:', examResponse);
    toast.success("Exam submitted successfully.");

    // Clear questionsCollection and remove from local storage
    setExamKey(examResponse.data.data.exam.examKey)
   
    setActiveTabKey('Success');
  

  } catch (error) {
    // Handle error
    console.error('Error submitting exam:', error);
    toast.error("Error submitting exam. Please try again later.");
  }


  setQuestionsCollection([]);
    setBasicInfoValues(
      {
        examName: "",
        duration: 1 ,
        examStartDate: Date.now(),
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
      }
    );
    localStorage.removeItem('basicInfoValues');
    localStorage.removeItem('questionsCollection');


}



  return (
    <div>
    <p className="mb-4  font-semibold text-blue-900 text-xl">Exam Preview</p>
    <div>
        <Card
          style={{ width: "100%" }}
          tabProps={{ size: "middle" }}
        >
          <div className="w-full  flex flex-wrap justify-between py-2 px-8 rounded-sm border ">
          <p className="font-semibold"><span className="font-bold text-blue-700">Exam Name : </span>{basicInfoValues.examName}</p>
          {/* <p className="font-semibold">
  <span className="font-bold text-blue-700">Starting date & time : </span>
  {basicInfoValues.examStartDate ? basicInfoValues.examStartDate.format("YYYY-MM-DD HH:mm:ss") : ""}
</p> */}
<p className="font-semibold"><span className="font-bold text-blue-700">Points : </span>{totalPoints}</p>

<p className="font-semibold"><span className="font-bold text-blue-700">Questions : </span>{questionsCollection.length}</p>
<p className="font-semibold"><span className="font-bold text-blue-700">Time limit : </span>{basicInfoValues.duration} Minutes</p>

{/* <p className="font-semibold"><span className="font-bold text-blue-700">Allowed Attempts : </span>Unlimited</p> */}

          </div>

          <div className="w-full  flex flex-wrap gap-16 py-2 px-8 my-4">
          <p className="font-semibold flex gap-2 items-center justify-center"><span className="font-bold text-blue-700">Organization : </span>AASTU <span><Icon icon="gravity-ui:seal-check" className="text-lg text-blue-800" /></span></p>
          <div className='flex gap-1'>
          <span className="font-bold text-blue-700">Tags : </span>
                <Tag color={"yellow"}>English</Tag>
                <Tag color={"red"}>Maths</Tag>
                <Tag color={"blue"}>Physics</Tag>
              </div>
          <p className="font-semibold flex gap-2 items-center justify-center"><span className="font-bold text-blue-700">Created by : </span>{user.firstName} {user.lastName} </p>
        

</div>

<div className="w-full  flex flex-col gap-2 py-4 px-8 my-4 items-start">
<h3 className='text-xl font-bold text-blue-900'>Instructions</h3>
<div className="text-left w-4/6" dangerouslySetInnerHTML={{ __html: basicInfoValues.instruction }} />


<p className="font-bold mt-4">Good Luck!</p>

          </div>
        

         
        </Card>
       
      </div>



      <div className="w-full  flex flex-wrap justify-between py-2 px-8 rounded-sm border mt-4">
<p className="font-semibold"><span className="font-bold text-blue-700">Private Answer : </span>{basicInfoValues.privateAnswer}</p>
<p className="font-semibold"><span className="font-bold text-blue-700">Private Score : </span>{basicInfoValues.privateScore}</p>

<p className="font-semibold"><span className="font-bold text-blue-700">Security level : </span>{basicInfoValues.securityLevel}</p>
<p className="font-semibold"><span className="font-bold text-blue-700">Exam type : </span>{basicInfoValues.examType}</p>

{/* <p className="font-semibold"><span className="font-bold text-blue-700">Allowed Attempts : </span>Unlimited</p> */}

          </div>


          <div className="w-full flex flex-wrap justify-between py-2 px-8 rounded-sm border mt-4">
  <p className="font-semibold">
    <span className="font-bold text-blue-700">Calculator : </span>
    {basicInfoValues.calculator ? "Yes" : "No"}
  </p>

  <p className="font-semibold">
    <span className="font-bold text-blue-700">Formulas Collection : </span>
    {basicInfoValues.formulasCollection ? "Yes" : "No"}
  </p>

  <p className="font-semibold">
    <span className="font-bold text-blue-700">Upload Materials : </span>
    {basicInfoValues.uploadMaterials ? "Yes" : "No"}
  </p>
</div>




          <div className="flex flex-col gap-4 my-4 mt-8 ">
  {questionsCollection.map((question, index) => (
    <div key={index} className="mb-4">
  
      {question.questionType === "True/False" ? (






<Card className=" w-11/12 mx-auto bg-gray-50 rounded-none">
<div className="flex gap-8 items-center justify-between mx-4 border-b pb-2">
  <h3 className="text-blue-900 font-semibold text-lg">Question {index + 1}</h3>
    <p className="font-semibold text-blue-900">Points {question.points}</p>
  </div>
  <div className="mt-4 mx-4 flex items-start">
   <h3 className="font-semibold text-[1rem]">{question.questionText}</h3>
  </div>
  <div className="mt-8 flex items-start mx-4 ">
    <Form.Item label="Your Answer" className="w-48">
      <Select >
        <Select.Option value="true">True</Select.Option>
        <Select.Option value="false">False</Select.Option>
      </Select>
    </Form.Item>
  </div>
 
</Card>









      ) : question.questionType === "choose" ? (
        





<Card className="bg-gray-50 w-11/12 mx-auto">
  <div className="flex gap-8 items-center justify-between mx-4 border-b pb-2">
    <h3 className="text-blue-900 font-semibold text-lg">Question {index + 1}</h3>
    <p className="font-semibold text-blue-900">Points {question.points}</p>

  </div>
  <div className="mt-4 mx-4 flex items-start border-b pb-4">
  <h3 className="font-semibold text-[1rem]">{question.questionText}</h3>
  </div>
  <div className="mt-4 w-full flex items-start mx-4 gap-4">
    {/* <Form.Item label="Choice Number" rules={[{ required: true, message: "Please select the choice number" }]} className="w-48">
      <Select onChange={(value) => setChoiceCount(value)} defaultValue={2}>
        {[2, 3, 4, 5].map((count) => (
          <Select.Option key={count} value={count}>{count}</Select.Option>
        ))}
      </Select>
    </Form.Item> */}
    <div className="flex flex-col">
    <Radio.Group value={question.correctAnswer} onChange={(e) => chooseOnChange('correctAnswer', e.target.value)}>
  {Array.from({ length: choiceCount }).map((_, index) => (
    <Form.Item key={index} label={`${String.fromCharCode(65 + index)}`} rules={[{ required: true, message: `Please enter choice ${String.fromCharCode(65 + index)}` }]}>
      <div className="flex gap-4 justify-center">
        <p className="font-semibold">{question.questionChoice[index]}</p>
        {/* <Input onChange={(e) => chooseOnChange('questionChoice', { [index]: e.target.value })} value={question.questionChoice[index]} /> */}
       <div className="flex gap-2 items-center"> <Radio></Radio><span className="text-blue-700"></span></div>
      </div>
    </Form.Item>
  ))}
</Radio.Group>

    </div>
  </div>
 
</Card>









      ) : question.questionType === "shortAnswer" ? (
        



<Card className="bg-gray-50 w-11/12 mx-auto my-2">
<div className="flex gap-8 items-center justify-between mx-4 border-b pb-2">
    <h3 className="text-blue-900 font-semibold text-lg">Question {index + 1}</h3>
    <p className="font-semibold text-blue-900">Points {question.points}</p>

  </div>
 
     
     <div className="mt-4 mx-4 flex items-start ">
     <h3 className="font-semibold text-[1rem]">{question.questionText}</h3>
  </div>

     <div className="mt-4 flex items-start mx-4 mb-4">
       <TextArea
         rows={4}
         placeholder="Enter your question here"
       
         
       />
     </div>
 
    
   </Card>







      ) : question.questionType === "essay" ? (
        
        


        <Card className="bg-gray-50 w-11/12 mx-auto my-8">
         <div className="flex gap-8 items-center justify-between mx-4 border-b pb-2">
    <h3 className="text-blue-900 font-semibold text-lg">Question {index + 1}</h3>
    <p className="font-semibold text-blue-900">Points {question.points}</p>

  </div>
    
        
        <div className="mt-4 mx-4 flex items-start">
        <h3 className="font-semibold text-[1rem]">{question.questionText}</h3>
  </div>

     <div className="mt-4 flex items-start mx-4 mb-4">
       <TextArea
         rows={4}
         placeholder="Enter your question here"
       
         
       />
     </div>
    
       
      </Card>

      ) : null}
    </div>
  ))}
</div>


<Card className=" mx-auto mt-8 mb-2 shadow-sm ">
             <div className="flex gap-8 items-center justify-center">
             <h3 className=" font-semibold text-[1rem]">Total Questions <span className="text-blue-900"> {questionsCollection.length} </span> </h3>
             <h3 className=" font-semibold text-[1rem]">Total Points <span className="text-blue-900"> {totalPoints} </span> </h3>
             <Button type="primary" className="px-16" onClick={submitExam}>Save & Submit</Button>
 
       </div>
 </Card>







    </div>
  )
}

export default Preview;