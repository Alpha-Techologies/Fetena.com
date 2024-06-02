import { Card, Form, Input, Button, Select, InputNumber, DatePicker, Radio, Switch } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
const { TextArea } = Input;
import { useSelector } from "react-redux";




const Preview = ({basicInfoValues, setBasicInfoValues, trueFalse, setTrueFalse, choose, setChoose, shortAnswer, setShortAnswer, essay, setEssay, questionsCollection, setQuestionsCollection, questionType, setQuestionType, choiceCount, setChoiceCount, trueFalseOnChange, chooseOnChange, essayOnChange, shortAnswerOnChange, handleQuestionsSave}) => {

  const totalPoints = questionsCollection.reduce((total, question) => total + (question.points || 0), 0);


const [questionCount,setQuestionCount] = useState(0);

const updateQuestionCount = () => { setQuestionCount(questionCount + 1) }

const {user} = useSelector((state) => state.auth);

const handleQuestionsEdit = (questionType, index) => {
  const updatedQuestionsCollection = [...questionsCollection];
  const updatedQuestion = updatedQuestionsCollection[index];

  // Update the question properties based on the question type
  if (questionType === "True/False") {
    updatedQuestion.points = trueFalse.points;
    updatedQuestion.questionText = trueFalse.questionText;
    updatedQuestion.correctAnswer = trueFalse.correctAnswer;
  } else if (questionType === "choose") {
    updatedQuestion.points = choose.points;
    updatedQuestion.questionText = choose.questionText;
    updatedQuestion.questionChoice = choose.questionChoice;
    updatedQuestion.correctAnswer = choose.correctAnswer;
  } else if (questionType === "shortAnswer") {
    // Update properties for short answer questions
  } else if (questionType === "essay") {
    // Update properties for essay questions
  }

  updatedQuestionsCollection[index] = updatedQuestion;
  setQuestionsCollection(updatedQuestionsCollection);
};



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
          <div className="flex gap-2"><span className="font-bold text-blue-700">Tags : </span>
          <p className="text-yellow-500">english</p>
               <p className="text-red-500">maths</p>
               <p className="text-blue-500">maths</p>
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




          <div className="flex flex-col gap-4 my-4 ">
  {questionsCollection.map((question, index) => (
    <div key={index} className="mb-4">
  
      {question.questionType === "True/False" ? (






<Card className="bg-gray-50 w-5/6 mx-auto my-2">
  <div className="flex gap-8 items-center justify-between mx-4 border-b">
  <h3 className="text-blue-900 font-semibold text-lg">Question {index + 1}</h3>
    <Form.Item label="points" rules={[{ required: true, type: "number", message: "Please input the points!" }]}>
      <InputNumber min={1} value={question.points} onChange={(value) => trueFalseOnChange('points', value)} />
    
    </Form.Item>
  </div>
  <div className="mt-4 mx-4">
    <Form.Item label="Question"  rules={[{ required: true, message: "Please enter the exam question!" }]}>
      <Input value={question.questionText} onChange={(e) => trueFalseOnChange('questionText', e.target.value)} />
    </Form.Item>
  </div>
  <div className="mt-4 flex items-start mx-4">
    <Form.Item label="Correct Answer"  rules={[{ required: true, message: "Please select the correct answer" }]}>
      <Select value={question.correctAnswer} onChange={(value) => trueFalseOnChange('correctAnswer', value)}>
        <Select.Option value="true">True</Select.Option>
        <Select.Option value="false">False</Select.Option>
      </Select>
    </Form.Item>
  </div>
  <div className="flex justify-end">
  <Button className="px-16 mx-4 border-blue-300" onClick={() => handleQuestionsSave("True/False", index)}>Edit</Button>
  </div>
</Card>









      ) : question.questionType === "choose" ? (
        





<Card className="bg-gray-50 w-5/6 mx-auto">
  <div className="flex gap-8 items-center justify-between mx-4 border-b">
    <h3 className="text-blue-900 font-semibold text-lg">Question {index + 1}</h3>
    <Form.Item label="points" rules={[{ required: true, type: "number", message: "Please input the points!" }]}>
      <InputNumber min={1} value={question.points} onChange={(value) => trueFalseOnChange('points', value)} />
    </Form.Item>
  </div>
  <div className="mt-4 mx-4">
    <Form.Item label="Question" rules={[{ required: true, message: "Please enter the exam question!" }]}>
      <Input value={question.questionText} onChange={(e) => chooseOnChange('questionText', e.target.value)} />
    </Form.Item>
  </div>
  <div className="mt-4 w-full flex items-start mx-4 gap-4">
    <Form.Item label="Choice Number" rules={[{ required: true, message: "Please select the choice number" }]} className="w-48">
      <Select onChange={(value) => setChoiceCount(value)} defaultValue={2}>
        {[2, 3, 4, 5].map((count) => (
          <Select.Option key={count} value={count}>{count}</Select.Option>
        ))}
      </Select>
    </Form.Item>
    <div className="flex flex-col">
    <Radio.Group value={question.correctAnswer} onChange={(e) => chooseOnChange('correctAnswer', e.target.value)}>
  {Array.from({ length: choiceCount }).map((_, index) => (
    <Form.Item key={index} label={`Choice ${String.fromCharCode(65 + index)}`} rules={[{ required: true, message: `Please enter choice ${String.fromCharCode(65 + index)}` }]}>
      <div className="flex gap-4">
        <Input onChange={(e) => chooseOnChange('questionChoice', { [index]: e.target.value })} value={question.questionChoice[index]} />
       <div className="flex gap-2 items-center"> <Radio value={question.questionChoice[index]} checked={question.questionChoice[index] === question.correctAnswer}></Radio><span className="text-blue-700">correct</span></div>
      </div>
    </Form.Item>
  ))}
</Radio.Group>

    </div>
  </div>
  <div className="flex justify-end">
  <Button className="px-16 mx-4 border-blue-300" onClick={() => handleQuestionsSave("True/False", index)}>Edit</Button>
  </div>
</Card>









      ) : question.questionType === "shortAnswer" ? (
        



<Card className="bg-gray-50 w-5/6 mx-auto my-8">
     <div className="flex gap-8 items-center justify-between mx-4 border-b">
     <h3 className="text-blue-900 font-semibold text-lg">Question {index + 1}</h3>
       {/* <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}> */}
       <Form.Item
         label="points"
         rules={[
           { required: true, type: "number", message: "Please input the points!" },
         ]}
       >
      <InputNumber min={1} value={question.points} onChange={(value) => trueFalseOnChange('points', value)} />
       </Form.Item>
     </div>
 
     
 
     <div className="mt-4 flex items-start mx-4 mb-4">
       <TextArea
         rows={4}
         placeholder="Enter your question here"
         onChange={(e) => shortAnswerOnChange('questionText', e.target.value)}
         value={question.questionText}
       />
     </div>
 
     <div className="flex justify-end">
     <Button className="px-16 mx-4 border-blue-300" onClick={() => handleQuestionsSave("True/False", index)}>Edit</Button>
     </div>
   </Card>







      ) : question.questionType === "essay" ? (
        
        


        <Card className="bg-gray-50 w-5/6 mx-auto my-8">
        <div className="flex gap-8 items-center justify-between mx-4 border-b">
        <h3 className="text-blue-900 font-semibold text-lg">Question {questionsCollection.length + 1}</h3>
          {/* <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}> */}
          <Form.Item
            label="points"
            rules={[
              { required: true, type: "number", message: "Please input the points!" },
            ]}
          >
      <InputNumber min={1} value={question.points} onChange={(value) => trueFalseOnChange('points', value)} />
          </Form.Item>
        </div>
    
        
    
        <div className="mt-4 flex items-start mx-4 mb-4">
          <TextArea
            rows={4}
            placeholder="Enter your question here"
         
            onChange={(e) => essayOnChange('questionText', e.target.value)}
            value={question.questionText}
            // Assuming you want to update the 'answer' field in shortAnswer state
          />
        </div>
    
        <div className="flex justify-end">
        <Button className="px-16 mx-4 border-blue-300" onClick={() => handleQuestionsSave("True/False", index)}>Edit</Button>
        </div>
      </Card>







      ) : null}
    </div>
  ))}
</div>








    </div>
  )
}

export default Preview;