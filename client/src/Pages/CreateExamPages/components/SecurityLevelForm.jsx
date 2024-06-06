import { Card, Form, Input, Button, Select, InputNumber, DatePicker, Radio, Switch } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const { TextArea } = Input;

const SecurityLevelForm = ({ setActiveTabKey }) => {

  // Set default value for security level
  const defaultSecurityLevel = "low";

  // Initialize form with default values
  const onFinish = (values) => {
    console.log('Form Values:', values);
    setActiveTabKey("Exam Type");
  };

  return (
    
    <div>
      <div className="flex justify-center items-center gap-2 mb-8 mt-4">

      <Icon icon="material-symbols:security"  className="text-2xl font-bold text-blue-800" />
<p className="font-semibold  text-blue-900 text-lg">Enter the Security level for the exam here</p>
  </div>


  <Form.Item
  name="securityLevel"
  rules={[{ required: true, message: "Please input the exam security type!" }]}
  initialValues={{ securityLevel: defaultSecurityLevel }}

>
  <Radio.Group className="flex justify-center items-center gap-8">
    <div className="p-8 border border-gray-200 rounded-lg flex flex-col gap-4 justify-center items-center group hover:bg-blue-600 transition ease-in-out duration-300">
      <Icon icon="ph:security-camera-fill" className="text-3xl font-bold text-blue-800 group-hover:text-white" />
      <Radio value="high" className="group-hover:text-white"> High Security </Radio>
    </div>
    <div className="p-8 border border-gray-200 rounded-lg flex flex-col gap-4 justify-center items-center group hover:bg-blue-600 transition ease-in-out duration-300">
      <Icon icon="mdi:security-off" className="text-3xl font-bold text-blue-800 group-hover:text-white" />
      <Radio value="low" className="group-hover:text-white"> Low Security </Radio>
    </div>
  </Radio.Group>
</Form.Item>

<div className="flex justify-end">
<Button className="px-16 bg-primary-500" type="primary" onClick={() => setActiveTabKey("Exam Type")}>Next</Button>

</div>
</div>
  );
}

export default SecurityLevelForm;






