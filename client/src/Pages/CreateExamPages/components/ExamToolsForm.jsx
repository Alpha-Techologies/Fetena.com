import { Card, Form, Input, Button, Select, InputNumber, DatePicker, Radio, Switch } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { TextArea } = Input;

const ExamToolsForm = ({
    basicInfoValues,
    setBasicInfoValues,
    handleFileChange,
    uploading,
    uploadProgress,
    handleUpload,
    setActiveTabKey,
    examType,
    setExamType
  }) => {  return (
    <div>

<div className="flex justify-center items-center gap-2 mb-8 mt-4">

<Icon icon="nimbus:tools" className="text-2xl font-bold text-blue-800" />
<p className="font-semibold  text-blue-900 text-lg">Select the tools that are allowed on the exam here</p>
</div>


    <div className="mx-8 my-8 w-full gap-4 flex flex-col justify-center items-center">
<div className="flex justify-center items-center gap-8">
  

<div className="p-8 border border-gray-200 rounded-lg flex flex-col gap-4 justify-center items-center group hover:bg-blue-600 transition ease-in-out duration-300">
<Icon  icon="mdi:calculator"  className="text-3xl font-bold text-blue-800 group-hover:text-white"/>
<div className="flex gap-4 my-4">


      <Switch checked={basicInfoValues.calculator} onClick={() => setBasicInfoValues({ ...basicInfoValues, calculator: !basicInfoValues.calculator })} />
      <span className="group-hover:text-white font-semibold">Calculator</span>
      </div>
    </div>

    <div className="p-8 border border-gray-200 rounded-lg flex flex-col gap-4 justify-center items-center group hover:bg-blue-600 transition ease-in-out duration-300">
    <Icon  icon="fluent:clipboard-math-formula-16-filled"  className="text-3xl font-bold text-blue-800 group-hover:text-white"/>

<div className="flex gap-4 my-4">
      <Switch checked={basicInfoValues.formulasCollection} onClick={() => setBasicInfoValues({ ...basicInfoValues, formulasCollection: !basicInfoValues.formulasCollection })} />
      <span  className="group-hover:text-white font-semibold">Formulas Collection</span>
      </div>
  </div>
  <div className="p-8 border border-gray-200 rounded-lg flex flex-col gap-4 justify-center items-center group hover:bg-blue-600 transition ease-in-out duration-300">
  <Icon  icon="lets-icons:materials"   className="text-3xl font-bold text-blue-800 group-hover:text-white"/>
<div className="flex gap-4 my-4">
  <Switch checked={basicInfoValues.uploadMaterials} onClick={() => setBasicInfoValues({ ...basicInfoValues, uploadMaterials: !basicInfoValues.uploadMaterials })} />
      <span  className="group-hover:text-white font-semibold">Upload Materials</span>
      </div>
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
  {!uploading && <Button onClick={handleUpload}>Upload</Button>}
</div>
)}

    </div>
    <div className="flex justify-end">
<Button className="px-16 bg-primary-500" type="primary" onClick={() => examType !== "online" ? setActiveTabKey("Preview") : setActiveTabKey("Exam Questions")}>Next</Button>

</div>

  </div>
  )
}

export default ExamToolsForm