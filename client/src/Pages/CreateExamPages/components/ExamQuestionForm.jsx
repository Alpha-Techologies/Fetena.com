import { Card, Form, Input, Button, Select, InputNumber, DatePicker, Radio, Switch } from "antd";
import 'react-quill/dist/quill.snow.css';
import Edit from "./Edit";

const { TextArea } = Input;

const ExamQuestionForm = ({
  questionType,
  questionsCollection,
  handleQuestionsSave,
  trueFalse,
  trueFalseOnChange,
  choose,
  choiceCount,
  setChoiceCount,
  chooseOnChange,
  shortAnswerOnChange,
  essayOnChange,
  setQuestionType,
  setActiveTabKey,
  setTrueFalse 
}) => {

  const totalPoints = questionsCollection.reduce((total, question) => total + (question.points || 0), 0);



  return (
    <div>
    <p className="mb-8 mt-4  font-semibold text-blue-900 text-xl">Enter the exam questions and create the Exam!</p>
    <Edit 
        trueFalse={trueFalse} 
        setTrueFalse={setTrueFalse} 
        choose={choose} 
        setChoose={setChoose} 
        shortAnswer={shortAnswer} 
        setShortAnswer={setShortAnswer} 
        essay={essay} 
        setEssay={setEssay} 
        questionsCollection={questionsCollection} 
        setQuestionsCollection={setQuestionsCollection} 
        questionType={questionType} 
        setQuestionType={setQuestionType} 
        choiceCount={choiceCount} 
        setChoiceCount={setChoiceCount} 
        trueFalseOnChange={trueFalseOnChange} 
        chooseOnChange={chooseOnChange} 
        essayOnChange={essayOnChange} 
        shortAnswerOnChange={shortAnswerOnChange} 
        handleQuestionsSave={handleQuestionsSave} 
      />
    <div>
           {/* Render the question forms */}
 
 
 
 
           {questionType === "trueFalse" && (
   <Card className="bg-gray-50 w-5/6 mx-auto my-8">
     <div className="flex gap-8 items-center justify-between mx-4 border-b">
       <h3 className="text-blue-900 font-semibold text-lg">Question {questionsCollection.length + 1}</h3>
       <Form.Item label="points" rules={[{ required: true, type: "number", message: "Please input the points!" }]}>
         <InputNumber min={1} value={trueFalse.points} onChange={(value) => trueFalseOnChange('points', value)} />
       </Form.Item>
     </div>
     <div className="mt-4 mx-4">
       <Form.Item label="Question"  rules={[{ required: true, message: "Please enter the exam question!" }]}>
         <Input value={trueFalse.questionText} onChange={(e) => trueFalseOnChange('questionText', e.target.value)} />
       </Form.Item>
     </div>
     <div className="mt-4 flex items-start mx-4">
       <Form.Item label="Correct Answer"  rules={[{ required: true, message: "Please select the correct answer" }]}>
         <Select value={trueFalse.correctAnswer} onChange={(value) => trueFalseOnChange('correctAnswer', value)}>
           <Select.Option value="true">True</Select.Option>
           <Select.Option value="false">False</Select.Option>
         </Select>
       </Form.Item>
     </div>
     <div className="flex justify-end">
       <Button className="px-16" onClick={() => handleQuestionsSave("trueFalse")}>Save</Button>
     </div>
   </Card>
 )}
 
 {questionType === "choose" && (
   <Card className="bg-gray-50 w-5/6 mx-auto my-8">
     <div className="flex gap-8 items-center justify-between mx-4 border-b">
     <h3 className="text-blue-900 font-semibold text-lg">Question {questionsCollection.length + 1}</h3>
     <Form.Item label="points" rules={[{ required: true, type: "number", message: "Please input the points!" }]}>
         <InputNumber min={1} value={choose.points} onChange={(value) => chooseOnChange('points', value)} />
       </Form.Item>
     </div>
     <div className="mt-4 mx-4">
       <Form.Item label="Question" rules={[{ required: true, message: "Please enter the exam question!" }]}>
         <Input value={choose.questionText} onChange={(e) => chooseOnChange('questionText', e.target.value)} />
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
 
       <Radio.Group value={choose.correctAnswer} onChange={(e) => chooseOnChange('correctAnswer', e.target.value)}>
   {Array.from({ length: choiceCount }).map((_, index) => (
     <Form.Item key={index} label={`Choice ${String.fromCharCode(65 + index)}`} rules={[{ required: true, message: `Please enter choice ${String.fromCharCode(65 + index)}` }]}>
       <div className="flex gap-4">
         <Input onChange={(e) => chooseOnChange('questionChoice', { [index]: e.target.value })} />
         <Radio value={index}></Radio>
       </div>
     </Form.Item>
   ))}
 </Radio.Group>
 
 
 
 
 </div>
 
 
       
     </div>
     <div className="flex justify-end">
       <Button className="px-16" onClick={() => handleQuestionsSave("choose")}>Save</Button>
     </div>
   </Card>
 )}
 
 
 
 
 {questionType === "shortAnswer" && (
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
         <InputNumber min={1} defaultValue={1} />
       </Form.Item>
     </div>
 
     
 
     <div className="mt-4 flex items-start mx-4 mb-4">
       <TextArea
         rows={4}
         placeholder="Enter your question here"
         onChange={(e) => shortAnswerOnChange('questionText', e.target.value)}
         // Assuming you want to update the 'answer' field in shortAnswer state
       />
     </div>
 
     <div className="flex justify-end">
       <Button className="px-16 mx-4" onClick={() => handleQuestionsSave("shortAnswer")}>Save</Button>
     </div>
   </Card>
 )}
 
 { questionType === "essay" && (
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
                <InputNumber min={1} defaultValue={1} />
              </Form.Item>
            </div>
        
            
        
            <div className="mt-4 flex items-start mx-4 mb-4">
              <TextArea
                rows={4}
                placeholder="Enter your question here"
             
                onChange={(e) => essayOnChange('questionText', e.target.value)}
                // Assuming you want to update the 'answer' field in shortAnswer state
              />
            </div>
        
            <div className="flex justify-end">
              <Button className="px-16 mx-4" onClick={() => handleQuestionsSave("essay")}>Save</Button>
            </div>
          </Card>
           ) }
 
 
           {/* Render the question choices section */}
           <Card className="bg-gray-50 w-5/6 mx-auto my-8">
             <div className="flex gap-8 items-center justify-center">
             <h3 className="text-blue-900 font-semibold text-lg">Question type</h3>
  {/* <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}> */}
  <Radio.Group onChange={(e) => setQuestionType(e.target.value)}>
         <Radio.Button value="trueFalse">True / False</Radio.Button>
         <Radio.Button value="choose">Multiple Choose</Radio.Button>
         <Radio.Button value="shortAnswer">Short Answer</Radio.Button>
         <Radio.Button value="essay">Essay</Radio.Button>
       </Radio.Group>
       </div>
 </Card>
 
 
 <Card className=" mx-auto mt-8 mb-2 shadow-sm ">
             <div className="flex gap-8 items-center justify-center">
             <h3 className=" font-semibold text-lg">Total Questions <span className="text-blue-900"> {questionsCollection.length} </span> </h3>
             <h3 className=" font-semibold text-lg">Total Points <span className="text-blue-900"> {totalPoints}</span> </h3>
             <Button type="primary" className="px-16" onClick={() => setActiveTabKey("Edit")}>Edit</Button>
 
       </div>
 </Card>
 
 
         </div>
  
 </div>
  )
}

export default ExamQuestionForm