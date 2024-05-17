import { Card, Form, Input, Button, Select, InputNumber, DatePicker, Radio, Switch } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const { TextArea } = Input;

const SecurityLevelForm = ({setActiveTabKey}) => {
  return (
    <div>
    <p className="mb-4  font-semibold text-blue-900 text-xl">Enter the Security level for the exam here</p>

  <Form.Item  name="securityLevel" rules={[{ required: true, message: "Please input the exam security type!" }]}>
  <Radio.Group>
    <Radio value="high"> High security </Radio>
    <Radio value="low"> Low Security </Radio>
  </Radio.Group>
</Form.Item>
<div className="flex justify-end">
<Button className="px-16" type="primary" onClick={() => setActiveTabKey("Exam Type")}>Next</Button>

</div>
</div>
  )
}

export default SecurityLevelForm