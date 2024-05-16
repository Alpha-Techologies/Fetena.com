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
    <p className="mb-4  font-semibold text-blue-900 text-xl">Enter the Exam type you want to create here</p>

  <Form.Item  name="examType" rules={[{ required: true, message: "Please input the exam type!" }]}>
  <Radio.Group>
    <Radio value="Pdf Upload"> Upload the question in pdf </Radio>
    <Radio value="Create Online"> Create the exam online </Radio>
    <Radio value="worksheet"> Create worksheet </Radio>
  </Radio.Group>
</Form.Item>
<div className="flex justify-end">
<Button className="px-16" type="primary" onClick={() => setActiveTabKey("Exam Tools")}>Next</Button>

</div>
</div>
  )
}

export default ExamTypeForm