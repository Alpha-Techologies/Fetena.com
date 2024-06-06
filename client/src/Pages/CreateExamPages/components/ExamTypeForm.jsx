import { Card, Form, Input, Button, Select, InputNumber, DatePicker, Radio, Switch } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { TextArea } = Input;


const ExamTypeForm = ({setActiveTabKey,setExamType, basicInfoValues,examType,
  setBasicInfoValues,}) => {


    const [uploading, setUploading] = useState(false); 
  const [uploadProgress, setUploadProgress] = useState(0); 


  // const handleChange = (changedValues) => {
  //   setBasicInfoValues({ ...basicInfoValues, ...changedValues });
  //   console.log(basicInfoValues)
  // };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setBasicInfoValues({ ...basicInfoValues, examFile: file });
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





  return (
    <div>

    <div className="flex justify-center items-center gap-2 mb-8 mt-4">

    <Icon icon="ph:exam" className="text-2xl font-bold text-blue-800" />
<p className="font-semibold  text-blue-900 text-lg">Enter the Exam type you want to create here</p>
</div>

<Form.Item name="examType" rules={[{ required: true, message: "Please input the exam type!" }]}>
<Radio.Group
    className="flex justify-center items-center gap-8"
    value={examType}
    onChange={(e) => {
      const selectedExamType = e.target.value;
      setExamType(selectedExamType);
      setBasicInfoValues({
        ...basicInfoValues,
        examType: selectedExamType,
        questions: selectedExamType === 'online' ? basicInfoValues.questions : [],
        examFile: selectedExamType !== 'online' ? basicInfoValues.examFile : null,
      });
    }}
  >
    <div className="p-8 border border-gray-200 rounded-lg flex flex-col gap-4 justify-center items-center group hover:bg-blue-600 transition ease-in-out duration-300">
      <Icon icon="teenyicons:pdf-outline" className="text-3xl font-bold text-blue-800 group-hover:text-white" />
      <Radio value="pdfUpload" className="group-hover:text-white">
        Upload the question in pdf
      </Radio>
    </div>
    <div className="p-8 border border-gray-200 rounded-lg flex flex-col gap-4 justify-center items-center group hover:bg-blue-600 transition ease-in-out duration-300">
      <Icon icon="oui:online" className="text-3xl font-bold text-blue-800 group-hover:text-white" />
      <Radio value="online" className="group-hover:text-white">
        Create the exam online
      </Radio>
    </div>
    <div className="p-8 border border-gray-200 rounded-lg flex flex-col gap-4 justify-center items-center group hover:bg-blue-600 transition ease-in-out duration-300">
      <Icon icon="solar:document-linear" className="text-3xl font-bold text-blue-800 group-hover:text-white" />
      <Radio value="worksheet" className="group-hover:text-white">
        Create worksheet
      </Radio>
    </div>
  </Radio.Group>

<div className="flex flex-col justify-center items-center gap-8 mt-8">


  {(examType === "pdfUpload" || examType === "worksheet") &&  (
<div className="mx-4 mt-4 p-4 border border-gray-300 rounded-lg"> 
  <input type="file" accept="application/pdf" onChange={handleFileChange} />
  {uploading && <p className="text-blue-600 mt-2">Uploading... {uploadProgress}%</p>}
</div>
)}

{(examType === "pdfUpload" || examType === "worksheet") && basicInfoValues.examFile && (
<div className="flex flex-col gap-4 items-center">
  <p className="font-semibold"><span className="text-blue-800">File selected: </span> {basicInfoValues.examFile.name}</p>
  {!uploading && <Button onClick={handleUpload}>Upload</Button>}
</div>
)}
</div>

</Form.Item>
<div className="flex justify-end">
<Button className="px-16" type="primary" onClick={() => setActiveTabKey("Exam Tools")}>Next</Button>

</div>
</div>
  )
}

export default ExamTypeForm