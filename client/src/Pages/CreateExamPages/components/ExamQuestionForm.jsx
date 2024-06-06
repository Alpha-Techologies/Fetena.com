import { Card, Form, Input, Button, Select, InputNumber, DatePicker, Radio, Switch,theme,Tag } from "antd";
import 'react-quill/dist/quill.snow.css';
import React, { useState, useRef, useEffect } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { TweenOneGroup } from 'rc-tween-one';
import { Icon } from "@iconify/react";



const { TextArea } = Input;

const ExamQuestionForm = ({
  questionType,
  questionsCollection,
  handleQuestionsSave,
  trueFalse,
  trueFalseOnChange,
  setTrueFalse,
  choose,
  setChoose,
  choiceCount,
  setChoiceCount,
  chooseOnChange,
  shortAnswerOnChange,
  essayOnChange,
  setQuestionType,
  shortAnswer,
  essay,
  setActiveTabKey,
  tags,
  setTags,
  setShortAnswer,
  setBasicInfoValues

  





}) => {


  const totalPoints = questionsCollection.reduce((total, question) => total + (question.points || 0), 0);




  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };

  const showInput = () => {
    setInputVisible(true);
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleTrueFalseInputConfirm = () => {
    // Use the callback form of setTags to ensure we get the latest state
    setTags((prevTags) => {
      const newTags = [...prevTags, inputValue];
      setTrueFalse({ ...trueFalse, tags: newTags });
      return newTags;
    });

     
    setInputVisible(false);
    setInputValue('');
  };


  const handleChooseInputConfirm = () => {
    // Use the callback form of setTags to ensure we get the latest state
    setTags((prevTags) => {
      const newTags = [...prevTags, inputValue];
      setChoose({ ...choose, tags: newTags });
      return newTags;
    });

     
    setInputVisible(false);
    setInputValue('');
  };


  const handleShortAnswerInputConfirm = () => {
    // Use the callback form of setTags to ensure we get the latest state
    setTags((prevTags) => {
      const newTags = [...prevTags, inputValue];
      setShortAnswer({ ...shortAnswer, tags: newTags });
      return newTags;
    });

     
    setInputVisible(false);
    setInputValue('');
  };



  const handleEssayInputConfirm = () => {
    // Use the callback form of setTags to ensure we get the latest state
    setTags((prevTags) => {
      const newTags = [...prevTags, inputValue];
      setEssay({ ...essay, tags: newTags });
      return newTags;
    });

     
    setInputVisible(false);
    setInputValue('');
  };
  
  
  const forMap = (tag) => (
    <span key={tag} style={{ display: 'inline-block' }}>
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    </span>
  );

  const tagChild = tags.map(forMap);
  const tagPlusStyle = {
    background: '#f0f0f0',
    borderStyle: 'dashed',
  };







  



  return (
    <div>
      <div className="flex justify-center items-center gap-2 mb-8 mt-4">

<Icon icon="ph:question-bold"  className="text-2xl font-bold text-blue-900" />
<p className="font-semibold  text-blue-900 text-[1.4rem]">Enter exam questions</p>
</div>
    
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

     <div className="mt-4 flex items-start mx-4">



   
        <>
          <div style={{ marginBottom: 16 }}>
            <TweenOneGroup
              appear={false}
              enter={{ scale: 0.8, opacity: 0, type: 'from', duration: 100 }}
              leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
              onEnd={(e) => {
                if (e.type === 'appear' || e.type === 'enter') {
                  e.target.style = 'display: inline-block';
                }
              }}
            >
              {tagChild}
            </TweenOneGroup>
          </div>
          {inputVisible ? (
            <Input
              ref={inputRef}
              type="text"
              size="small"
              style={{ width: 78 }}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleTrueFalseInputConfirm}
              onPressEnter={handleTrueFalseInputConfirm}
            />
          ) : (
            <Button onClick={showInput} style={tagPlusStyle}>
              <div className="flex justify-center gap-2">
                <PlusOutlined /> New Tag
              </div>
            </Button>
          )}
        </>
     


      
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
     <>
          <div style={{ marginBottom: 16 }}>
            <TweenOneGroup
              appear={false}
              enter={{ scale: 0.8, opacity: 0, type: 'from', duration: 100 }}
              leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
              onEnd={(e) => {
                if (e.type === 'appear' || e.type === 'enter') {
                  e.target.style = 'display: inline-block';
                }
              }}
            >
              {tagChild}
            </TweenOneGroup>
          </div>
          {inputVisible ? (
            <Input
              ref={inputRef}
              type="text"
              size="small"
              style={{ width: 78 }}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleChooseInputConfirm}
              onPressEnter={handleChooseInputConfirm}
            />
          ) : (
            <Button onClick={showInput} style={tagPlusStyle}>
              <div className="flex justify-center gap-2">
                <PlusOutlined /> New Tag
              </div>
            </Button>
          )}
        </>
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
       <Form.Item label="points" rules={[{ required: true, type: "number", message: "Please input the points!" }]}>
         <InputNumber min={1} value={shortAnswer.points} onChange={(value) => shortAnswerOnChange('points', value)} />
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

     
 <>
          <div style={{ marginBottom: 16 }}>
            <TweenOneGroup
              appear={false}
              enter={{ scale: 0.8, opacity: 0, type: 'from', duration: 100 }}
              leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
              onEnd={(e) => {
                if (e.type === 'appear' || e.type === 'enter') {
                  e.target.style = 'display: inline-block';
                }
              }}
            >
              {tagChild}
            </TweenOneGroup>
          </div>
          {inputVisible ? (
            <Input
              ref={inputRef}
              type="text"
              size="small"
              style={{ width: 78 }}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleShortAnswerInputConfirm}
              onPressEnter={handleShortAnswerInputConfirm}
            />
          ) : (
            <Button onClick={showInput} style={tagPlusStyle}>
              <div className="flex justify-center gap-2">
                <PlusOutlined /> New Tag
              </div>
            </Button>
          )}
        </>
 
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
              <Form.Item label="points" rules={[{ required: true, type: "number", message: "Please input the points!" }]}>
         <InputNumber min={1} value={essay.points} onChange={(value) => essayOnChange('points', value)} />
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

            <>
          <div style={{ marginBottom: 16 }}>
            <TweenOneGroup
              appear={false}
              enter={{ scale: 0.8, opacity: 0, type: 'from', duration: 100 }}
              leave={{ opacity: 0, width: 0, scale: 0, duration: 200 }}
              onEnd={(e) => {
                if (e.type === 'appear' || e.type === 'enter') {
                  e.target.style = 'display: inline-block';
                }
              }}
            >
              {tagChild}
            </TweenOneGroup>
          </div>
          {inputVisible ? (
            <Input
              ref={inputRef}
              type="text"
              size="small"
              style={{ width: 78 }}
              value={inputValue}
              onChange={handleInputChange}
              onBlur={handleEssayInputConfirm}
              onPressEnter={handleEssayInputConfirm}
            />
          ) : (
            <Button onClick={showInput} style={tagPlusStyle}>
              <div className="flex justify-center gap-2">
                <PlusOutlined /> New Tag
              </div>
            </Button>
          )}
        </>
        
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
             <h3 className=" font-semibold text-[1.1rem] flex gap-1 justify-center items-center"><Icon icon="pepicons-pop:question" />Total Questions : <span className="text-blue-900 font-bold"> {questionsCollection.length} </span> </h3>
             <h3 className=" font-semibold text-[1.1rem] flex gap-1 justify-center items-center"><Icon icon="material-symbols:credit-score-outline" />Total Points : <span className="text-blue-900 font-bold"> {totalPoints} </span> </h3>
             <Button type="primary" className="px-16" onClick={() => setActiveTabKey("Preview")}>Preview</Button>
 
       </div>
 </Card>
 
 
         </div>
  
 </div>
  )
}

export default ExamQuestionForm