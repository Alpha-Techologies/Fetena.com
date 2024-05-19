import { Card, Form, Input, Button, Select, InputNumber, DatePicker, Radio, Switch } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from "react-toastify";



import Preview from "./components/Preview";
import ExamQuestionForm from "./components/ExamQuestionForm";
import ExamToolsForm from "./components/ExamToolsForm";
import ExamTypeForm from "./components/ExamTypeForm";
import SecurityLevelForm from "./components/SecurityLevelForm";
import InstructionForm from "./components/InstructionForm";
import BasicInfoForm from "./components/BasicInfoForm";
const { TextArea } = Input;

const tabListNoTitle = [
  { key: "Basic Info", label: "Basic Info >" },
  { key: "Instruction", label: "Instruction >" },
  { key: "Security", label: "Security >" },
  { key: "Exam Type", label: "Exam Type >" },
  { key: "Exam Tools", label: "Exam Tools >" },
  { key: "Exam Questions", label: "Exam Questions >" },
  { key: "Preview", label: "Preview" },
  { key: "Success", label: "" },
];

const CreateExam = () => {
  const [activeTabKey, setActiveTabKey] = useState("Basic Info");
  const [examKey,setExamKey] = useState("");
  const [basicInfoValues, setBasicInfoValues] = useState(() => {
    const savedBasicInfo = localStorage.getItem("basicInfoValues");
    return savedBasicInfo ? JSON.parse(savedBasicInfo) : {
      examName: "",
      duration: 1 ,
      examStartDate: null,
      organization: "org",
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
    };
  });


  const [trueFalse,setTrueFalse] = useState({
    questionText: "",
    questionChoice: ["true", "false"],
    questionType: "True/False",
    correctAnswer: "",
    points: 1
  })

  const [choose,setChoose] = useState({
    questionText: "",
    questionChoice: [],
    questionType: "choose",
    correctAnswer: "",
    points: 1
  })
  
  const [shortAnswer,setShortAnswer] = useState({
    questionText: "",
    questionType: "shortAnswer",
    points: 1
  })

  const [essay,setEssay] = useState({
    questionText: "",
    questionType: "essay",
    points: 1
  })


  const [questionsCollection, setQuestionsCollection] = useState(() => {
    const savedQuestions = localStorage.getItem("questionsCollection");
    return savedQuestions ? JSON.parse(savedQuestions) : [];
  });


  const [questionType, setQuestionType] = useState("");
  const [choiceCount, setChoiceCount] = useState(2);
  const [uploading, setUploading] = useState(false); 
  const [uploadProgress, setUploadProgress] = useState(0); 


  // const handleChange = (changedValues) => {
  //   setBasicInfoValues({ ...basicInfoValues, ...changedValues });
  //   console.log(basicInfoValues)
  // };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setBasicInfoValues({ ...basicInfoValues, material: file });
    } else {
      alert("Please select a PDF file.");
    }
  };
  
  const handleUpload = () => {
    setUploading(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setUploading(false);
        setUploadProgress(0);
      }
    }, 500);
  };

  const handleSave = () => {
    if (activeTabKey === "Basic Info") {
      setActiveTabKey("Exam Questions");
    }
  };


  const trueFalseOnChange = (key, value) => {
    setTrueFalse({ ...trueFalse, [key]: value });
    console.log(trueFalse)
  };

  const chooseOnChange = (key, value) => {
    console.log(key,value)
    if (typeof value === 'object' && value !== null) {
      // If the value is an object (which is expected for updating questionChoice)
      // We need to merge it with the existing state instead of directly setting it
      setChoose(prevState => ({
        ...prevState,
        [key]: { ...prevState[key], ...value }
      }));
    } else {
      // For other keys in the state, simply update them as usual
      setChoose(prevState => ({ ...prevState, [key]: value }));
    }
    console.log(choose)
  };
  
  const shortAnswerOnChange = (key, value) => {
    setShortAnswer(prevState => ({ ...prevState, [key]: value }));
    console.log(shortAnswer)
  };

  const essayOnChange = (key, value) => {
    setEssay(prevState => ({ ...prevState, [key]: value }));
    console.log(essay)
  };

  const handleQuestionsSave = (type) => {

    if ( type === "trueFalse") {

      if ( !trueFalse.questionText || !trueFalse.questionChoice || !trueFalse.questionType || !trueFalse.correctAnswer || !trueFalse.points) {
        console.log(trueFalse)
        toast.error("Please enter all the fields")
        return;
      }
       
  // Append trueFalse to questionsCollection
  setQuestionsCollection(prevQuestions => [...prevQuestions, trueFalse]);
  toast.success("Question saved successfully")
  // Reset trueFalse state to its default values
  setTrueFalse({
    questionText: "",
    questionChoice: ["true", "false"],
    questionType: "True/False",
    correctAnswer: "",
    points: 1
  });
      console.log(questionsCollection)
    }
    else if (type === "choose") {
      let questionSize = Object.keys(choose.questionChoice).length;
      const structuredChoose = {
        ...choose,
        questionChoice: [],
        correctAnswer: choose.questionChoice[choose.correctAnswer]
      }
      for(let i = 0; i < questionSize; i++) {
        structuredChoose.questionChoice.push(choose.questionChoice[i]);
      }

      if (!choose.questionText || !choose.questionChoice || !choose.questionType || !choose.correctAnswer || !choose.points) {
        console.log(choose)
        toast.error("Please enter all the fields")
        return;
      }

      setQuestionsCollection([...questionsCollection, structuredChoose]);
      toast.success("Question saved successfully")

      setChoose({
        questionText: "",
        questionChoice: [],
        questionType: "choose",
        correctAnswer: "",
        points: 1
      });
    }
    else if (type === "shortAnswer") {

      if(!shortAnswer.questionText || !shortAnswer.questionType || !shortAnswer.points) {
        console.log(shortAnswer)
        toast.error("Please enter all the fields")
        return;
      }
      setQuestionsCollection([...questionsCollection, shortAnswer]);
      toast.success("Question saved successfully")
      setShortAnswer({
        questionText: "",
    questionType: "shortAnswer",
    points: 1
      });
    }
    else if (type === "essay") {
      if (!essay.questionText || !essay.questionType || !essay.points) {
        console.log(essay)
        toast.error("Please enter all the fields")
        return;
      }
      setQuestionsCollection([...questionsCollection, essay]);
      toast.success("Question saved successfully")
      setEssay({
        questionText: "",
        questionType: "essay",
        points: 1
      });
    }

    console.log(questionsCollection)
   
  };






  useEffect(() => {
    localStorage.setItem("basicInfoValues", JSON.stringify(basicInfoValues));
  }, [basicInfoValues]);

  useEffect(() => {
    localStorage.setItem("questionsCollection", JSON.stringify(questionsCollection));
  }, [questionsCollection]);

  const handleChange = (changedValues) => {
    setBasicInfoValues((prevBasicInfo) => ({ ...prevBasicInfo, ...changedValues }));
    console.log(basicInfoValues)
  };





      return (
        <div className="flex flex-col gap-4 my-4 ">
        <div className="flex gap-4 items-center ">
          <Link to='/dashboard/exams'>
            <Icon icon="fluent-emoji-high-contrast:left-arrow" className="text-2xl text-primary-500" />
          </Link>
          <h1 className="text-3xl font-bold">Create Exam</h1>
        </div>
        <div>
          <Card
            style={{ width: "100%" }}
            tabList={tabListNoTitle}
            activeTabKey={activeTabKey}
            tabBarExtraContent={
              (activeTabKey === "Exam Questions" && <Button onClick={handleSave}>Ai question generator</Button>)
            }
            onTabChange={setActiveTabKey}
            tabProps={{ size: "middle" }}
          >
            <Form
              initialValues={basicInfoValues}
              onValuesChange={handleChange}
            >
                {activeTabKey === "Basic Info" && (
                <BasicInfoForm basicInfoValues={basicInfoValues} setBasicInfoValues={setBasicInfoValues} setActiveTabKey={setActiveTabKey} />
                )}



                {activeTabKey === "Instruction" && (
                  
                <InstructionForm basicInfoValues={basicInfoValues} setBasicInfoValues={setBasicInfoValues}  setActiveTabKey={setActiveTabKey} />
                )}



    {activeTabKey === "Security" && (
      <SecurityLevelForm setActiveTabKey={setActiveTabKey} />
                )}


    {activeTabKey === "Exam Type" && (
    <ExamTypeForm setActiveTabKey={setActiveTabKey}/>
                )}



  {activeTabKey === "Exam Tools" && (
    <ExamToolsForm  
    basicInfoValues={basicInfoValues}
    setBasicInfoValues={setBasicInfoValues}
    handleFileChange={handleFileChange}
    uploading={uploading}
    uploadProgress={uploadProgress}
    handleUpload={handleUpload}
    setActiveTabKey={setActiveTabKey}
    />
  )}





{activeTabKey === "Exam Questions" && (
  <ExamQuestionForm
  activeTabKey={activeTabKey}
  setActiveTabKey={setActiveTabKey}
    questionType={questionType}
    questionsCollection ={questionsCollection }
    trueFalse={trueFalse}
    handleQuestionsSave={handleQuestionsSave}
    trueFalseOnChange={trueFalseOnChange}
    choose={choose}
    choiceCount={choiceCount}
    setChoiceCount={setChoiceCount}
    chooseOnChange={chooseOnChange}
    shortAnswerOnChange={shortAnswerOnChange}
    essayOnChange={essayOnChange}
    setQuestionType={setQuestionType}
    setEssay={setEssay}
    essay={essay}
    setShortAnswer={setShortAnswer}
    shortAnswer={shortAnswer}
    setChoose={setChoose}
  
    setTrueFalse={setTrueFalse}
  
  />
)}




{activeTabKey === "Preview" && (
            <Preview 
            basicInfoValues={basicInfoValues} 
            setBasicInfoValues={setBasicInfoValues} 
            trueFalse={trueFalse} setTrueFalse={setTrueFalse} 
            choose={choose} setChoose={setChoose} 
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
            setExamKey={setExamKey}
            setActiveTabKey={setActiveTabKey}
            />
            )}


{activeTabKey === "Success" && (
 <section className='flex flex-col justify-center items-center mt-8'>
 <img
   loading='lazy'
   src='https://cdn.builder.io/api/v1/image/assets/TEMP/f036dfadbcb5962fc51b133ce1f5e0f003ad5000218eb6b4df54e7ec1cff714a?apiKey=da0e5699a0964f23ab3a2091e7f935a3&'
   alt='Submit form icon'
   className='max-w-full aspect-[1.1] w-[157px]'
 />
 <h2 className='text-lg font-semibold text-left mt-4'>
  Your exam has been successfully submitted!
 </h2>

 <h3 className='text-lg font-semibold text-left mt-4'>
  Exam key : {examKey}
 </h3>
</section>
)}




              </Form>
            </Card>
          </div>
        </div>
      );
    };

    export default CreateExam;
