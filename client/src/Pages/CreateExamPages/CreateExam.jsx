import { Card, Form, Input, Button, Select, InputNumber, DatePicker, Radio, Switch } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const { TextArea } = Input;

const tabListNoTitle = [
  { key: "Basic Info", label: "Basic Info >" },
  { key: "Instruction", label: "Instruction >" },
  { key: "Security", label: "Security >" },
  { key: "Exam Type", label: "Exam Type >" },
  { key: "Exam Tools", label: "Exam Tools >" },
  { key: "Exam Questions", label: "Exam Questions >" },
  { key: "Preview", label: "Preview" },
];

const CreateExam = () => {
  const [activeTabKey, setActiveTabKey] = useState("Basic Info");
  const [basicInfoValues, setBasicInfoValues] = useState({
    examName: "",
    duration: "",
    examStartDate: null,
    organization: "org",
    privateAnswer: "",
    privateScore: "",
    instruction: "",
    securityLevel: "low",
    examType: "",
    calculator: false,
    formulasCollection: false,
    uploadMaterials: false,
    material: null
  });
  const [questionType, setQuestionType] = useState("");
  const [choiceCount, setChoiceCount] = useState(2);
  const [uploading, setUploading] = useState(false); 
  const [uploadProgress, setUploadProgress] = useState(0); 

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

  const handleChange = (changedValues) => {
    setBasicInfoValues({ ...basicInfoValues, ...changedValues });
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
                  <>
                    <Form.Item label="Exam Name" name="examName" rules={[{ required: true, message: "Please input the exam name!" }]}>
                      <Input />
                    </Form.Item>
                    <Form.Item label="Duration (minutes)" name="duration" rules={[{ required: true, type: "number", message: "Please input the duration in minutes!" }]}>
                      <InputNumber min={1} />
                    </Form.Item>
                    <Form.Item label="Exam starting date and time" name="examStartDate" rules={[{ required: true, message: "Please enter the Starting date and time for the exam" }]} >
                      <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                    </Form.Item>
                    <Form.Item label="Private Answer" name="privateAnswer" rules={[{ required: true, message: "Please select whether private answer is allowed!" }]}>
                      <Select>
                        <Select.Option value="yes">Yes</Select.Option>
                        <Select.Option value="no">No</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="Private Score" name="privateScore" rules={[{ required: true, message: "Please select whether private score is allowed!" }]}>
                      <Select>
                        <Select.Option value="yes">Yes</Select.Option>
                        <Select.Option value="no">No</Select.Option>
                      </Select>
                    </Form.Item>
                    <div className="flex justify-end">
<Button className="px-16" type="primary">{"Next >"}</Button>

</div>
                  </>
                )}

                {activeTabKey === "Instruction" && (
                  <>
                  <Form.Item name="instruction">
                    <p className="mb-4 font-semibold text-left text-blue-900 text-lg">Enter the Instructions for the exam here</p>
                    <ReactQuill 
                    className="mx-32 my-8 h-96"
                    value={basicInfoValues.Instruction} 
                    onChange={(value) => setBasicInfoValues({...basicInfoValues, Instruction: value})} 
                    />
                    
                  </Form.Item>
                  <div className="flex justify-end mt-8">
<Button className="px-16" type="primary">{"Next >"}</Button>

</div>
                    </>
                )}



    {activeTabKey === "Security" && (
      <div>
                    <p className="mb-4  font-semibold text-blue-900 text-xl">Enter the Security level for the exam here</p>

                  <Form.Item  name="securityLevel" rules={[{ required: true, message: "Please input the exam security type!" }]}>
                  <Radio.Group>
                    <Radio value="high"> High security </Radio>
                    <Radio value="low"> Low Security </Radio>
                  </Radio.Group>
                </Form.Item>
                <div className="flex justify-end">
<Button className="px-16" type="primary">{"Next >"}</Button>

</div>
      </div>
                )}


    {activeTabKey === "Exam Type" && (
      <div>
                    <p className="mb-4  font-semibold text-blue-900 text-xl">Enter the Exam type you want to create here</p>

                  <Form.Item  name="examType" rules={[{ required: true, message: "Please input the exam type!" }]}>
                  <Radio.Group>
                    <Radio value="pdfUpload"> Upload the question in pdf </Radio>
                    <Radio value="createOnline"> Create the exam online </Radio>
                    <Radio value="worksheet"> Create worksheet </Radio>
                  </Radio.Group>
                </Form.Item>
                <div className="flex justify-end">
<Button className="px-16" type="primary">{"Next >"}</Button>

</div>
      </div>
                )}



  {activeTabKey === "Exam Tools" && (
    <div>
      <p className="mb-4 font-semibold text-blue-900 text-xl">Select the tools that are allowed on the exam here</p>
      <div className="mx-8 my-16 w-full gap-4 flex flex-col justify-center items-center">
  <div className="flex flex-col gap-4">

      <div className="flex gap-4">

        <Switch checked={basicInfoValues.calculator} onClick={() => setBasicInfoValues({ ...basicInfoValues, calculator: !basicInfoValues.calculator })} />
        <span className=" font-semibold ">Calculator</span>
    
      </div>
      <div className="flex gap-4">
        <Switch checked={basicInfoValues.formulasCollection} onClick={() => setBasicInfoValues({ ...basicInfoValues, formulasCollection: !basicInfoValues.formulasCollection })} />
        <span  className=" font-semibold ">Formulas Collection</span>
    </div>
    <div className="flex gap-4">      <Switch checked={basicInfoValues.uploadMaterials} onClick={() => setBasicInfoValues({ ...basicInfoValues, uploadMaterials: !basicInfoValues.uploadMaterials })} />
        <span  className=" font-semibold ">Upload Materials</span>
      </div>
      </div>

      {basicInfoValues.uploadMaterials && (
  <div className="mx-4 mt-4 p-4 border border-gray-300 rounded-lg"> 
    <input type="file" accept="application/pdf" onChange={handleFileChange} />
    {uploading && <p className="text-blue-600 mt-2">Uploading... {uploadProgress}%</p>}
  </div>
)}

{basicInfoValues.uploadMaterials && basicInfoValues.material && (
  <div className="flex flex-col gap-4 items-center">
    <p className="font-semibold"><span className="text-blue-800">File selected: </span> {basicInfoValues.material.name}</p>
    {!uploading && <Button onClick={handleUpload} className="w-5/12">Upload</Button>}
  </div>
)}

      </div>
      <div className="flex justify-end">
<Button className="px-16" type="primary">{"Next >"}</Button>

</div>

    </div>
  )}





{activeTabKey === "Exam Questions" && (
   <div>
   <p className="mb-8 mt-4  font-semibold text-blue-900 text-xl">Enter the exam questions and create the Exam!</p>
   <div>
          {/* Render the question forms */}
          {/* {examQuestions.map((type, index) => renderQuestionForm(type, index))} */}

          { questionType === "trueFalse" && (
                      <Card  className="bg-gray-50 w-5/6 mx-auto my-8">
                         <div className="flex gap-8 items-center justify-between mx-4 border-b">
            <h3 className="text-blue-900 font-semibold text-lg">Question 1</h3>
 {/* <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}> */}
 <Form.Item label="points" name="n" rules={[{ required: true, type: "number", message: "Please input the points!" }]}>
                      <InputNumber min={1} defaultValue={1}/>
                    </Form.Item>
      </div>

      <div className="mt-4 mx-4">


      <Form.Item label="Question" name="Questionn" rules={[{ required: true, message: "Please enter the exam question!" }]}>
                      <Input />
                    </Form.Item>
      </div>
      <div className="mt-4 flex items-start mx-4">
      <Form.Item label="Correct Answer" name="privateScore" rules={[{ required: true, message: "Please select the correct answer" }]}>
                      <Select>
                        <Select.Option value="yes">True</Select.Option>
                        <Select.Option value="no">False</Select.Option>
                      </Select>
                    </Form.Item>
                    </div>
                    <div className="flex justify-end">
<Button className="px-16">Save</Button>

</div>
                    
                        </Card>

          ) }
{questionType === "choose" && (
  <Card className="bg-gray-50 w-5/6 mx-auto my-8">
    <div className="flex gap-8 items-center justify-between mx-4 border-b">
      <h3 className="text-blue-900 font-semibold text-lg">Question 2</h3>
      <Form.Item label="Points" name="n" rules={[{ required: true, type: "number", message: "Please input the points!" }]}>
        <InputNumber min={1} defaultValue={1} />
      </Form.Item>
    </div>
    <div className="mt-4 mx-4">
      <Form.Item label="Question" name="Questionn" rules={[{ required: true, message: "Please enter the exam question!" }]}>
        <Input />
      </Form.Item>
    </div>
    <div className="mt-4 w-full flex items-start mx-4 gap-4">
      <Form.Item label="Choice Number" name="Choice Number" rules={[{ required: true, message: "Please select the choice number" }]}>
        <Select onChange={(value) => setChoiceCount(value)} defaultValue={2}>
          {[2, 3, 4, 5].map((count) => (
            <Select.Option key={count} value={count}>{count}</Select.Option>
          ))}
        </Select>
      </Form.Item>
      <div className="flex flex-col ">

      {Array.from({ length: choiceCount }).map((_, index) => (
       
  <Form.Item key={index} label={`Choice ${String.fromCharCode(65 + index)}`} name={`choice${index}`} rules={[{ required: true, message: `Please enter choice ${String.fromCharCode(65 + index)}` }]}>
    <Input />
  </Form.Item>
))}


      </div>
      <Form.Item label="Right Answer" name="Right Answer" rules={[{ required: true, message: "Please enter the right answer" }]}>
                      <Input />
                    </Form.Item>
    
    </div>
<div className="flex justify-end">
<Button className="px-16">Save</Button>

</div>

  </Card>
)}


{ questionType === "shortAnswer" && (
            <Card  className="bg-gray-50 w-5/6 mx-auto my-8">
            <div className="flex gap-8 items-center justify-between mx-4 border-b">
<h3 className="text-blue-900 font-semibold text-lg">Question 1</h3>
{/* <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}> */}
<Form.Item label="points" name="n" rules={[{ required: true, type: "number", message: "Please input the points!" }]}>
         <InputNumber min={1} defaultValue={1} />
       </Form.Item>
</div>

<div className="mt-4 mx-4">


<Form.Item label="Question" name="Questionn" rules={[{ required: true, message: "Please enter the exam question!" }]}>
         <Input />
       </Form.Item>
</div>
<div className="mt-4 flex items-start mx-4 mb-4">
<TextArea rows={4} placeholder="Enter your answer here" maxLength={6} />
       </div>
       <div className="flex justify-end">
<Button className="px-16 mx-4">Save</Button>

</div>
       
           </Card>
          ) }

{ questionType === "essay" && (
            <Card  className="bg-gray-50 w-5/6 mx-auto my-8">
            <div className="flex gap-8 items-center justify-between mx-4 border-b">
<h3 className="text-blue-900 font-semibold text-lg">Question 1</h3>
{/* <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}> */}
<Form.Item label="points" name="n" rules={[{ required: true, type: "number", message: "Please input the points!" }]}>
         <InputNumber min={1} defaultValue={1} />
       </Form.Item>
</div>

<div className="mt-4 mx-4">


<Form.Item label="Question" name="Questionn" rules={[{ required: true, message: "Please enter the exam question!" }]}>
         <Input />
       </Form.Item>
</div>
<div className="mt-4 flex items-start mx-4 mb-4">
<TextArea rows={4} placeholder="Enter your answer here" maxLength={24} />
       </div>
       <div className="flex justify-end">
<Button className="px-16 mx-4">Save</Button>

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
            <h3 className=" font-semibold text-lg">Total Questions <span className="text-blue-900"> 21</span> </h3>
            <h3 className=" font-semibold text-lg">Total Points <span className="text-blue-900"> 45</span> </h3>
            <Button type="primary" className="px-16">Preview</Button>

      </div>
</Card>


        </div>
 
</div>
  )}
              </Form>
            </Card>
          </div>
        </div>
      );
    };

    export default CreateExam;
