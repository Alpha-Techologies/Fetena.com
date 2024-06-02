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
    setActiveTabKey
  }) => {  return (
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
  {!uploading && <Button onClick={handleUpload}>Upload</Button>}
</div>
)}

    </div>
    <div className="flex justify-end">
<Button className="px-16" type="primary" onClick={() => setActiveTabKey("Exam Questions")}>Next</Button>

</div>

  </div>
  )
}

export default ExamToolsForm