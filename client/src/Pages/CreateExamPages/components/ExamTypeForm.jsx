import { Card, Form, Input, Button, Select, InputNumber, DatePicker, Radio, Switch } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const { TextArea } = Input;


const ExamTypeForm = ({setActiveTabKey}) => {
  return (
    <div>

    <div className="flex justify-center items-center gap-2 mb-8 mt-4">

    <Icon icon="ph:exam" className="text-2xl font-bold text-blue-800" />
<p className="font-semibold  text-blue-900 text-lg">Enter the Exam type you want to create here</p>
</div>

  <Form.Item  name="examType" rules={[{ required: true, message: "Please input the exam type!" }]}>
  <Radio.Group className="flex justify-center items-center gap-8">
  <div className="p-8 border border-gray-200 rounded-lg flex flex-col gap-4 justify-center items-center group hover:bg-blue-600 transition ease-in-out duration-300">
  <Icon  icon="teenyicons:pdf-outline"   className="text-3xl font-bold text-blue-800 group-hover:text-white"/>
    <Radio value="pdfUpload" className="group-hover:text-white"> Upload the question in pdf </Radio>
    </div>
    <div className="p-8 border border-gray-200 rounded-lg flex flex-col gap-4 justify-center items-center group hover:bg-blue-600 transition ease-in-out duration-300">
    <Icon icon="oui:online"   className="text-3xl font-bold text-blue-800 group-hover:text-white"/>

    <Radio value="online" className="group-hover:text-white"> Create the exam online </Radio>
    </div>
    <div className="p-8 border border-gray-200 rounded-lg flex flex-col gap-4 justify-center items-center group hover:bg-blue-600 transition ease-in-out duration-300">
    <Icon icon="solar:document-linear" className="text-3xl font-bold text-blue-800 group-hover:text-white"/>
    <Radio value="worksheet" className="group-hover:text-white"> Create worksheet </Radio>
    </div>
  </Radio.Group>
</Form.Item>
<div className="flex justify-end">
<Button className="px-16" type="primary" onClick={() => setActiveTabKey("Exam Tools")}>Next</Button>

</div>
</div>
  )
}

export default ExamTypeForm