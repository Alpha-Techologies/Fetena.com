import {
  Card,
  Form,
  Input,
  Button,
  Select,
  InputNumber,

} from "antd";

import "react-quill/dist/quill.snow.css";
import React, { useEffect, useRef, useState } from "react";
import { theme } from "antd";

const { TextArea } = Input;

const BasicInfoForm = ({
  basicInfoValues,
  setBasicInfoValues,
  setActiveTabKey,
}) => {
  const { token } = theme.useToken();
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);


  const showInput = () => {
    setInputVisible(true);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };



  return (
    <div className="w-full flex flex-col gap-4 mt-4">



 
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8">

     

      <Form.Item
        label="Exam Name"
        name="examName"
        rules={[{ required: true, message: "Please input the exam name!" }]}
      >
        <Input />
      </Form.Item>

      
        <Form.Item
          label="Duration (minutes)"
          name="duration"
          rules={[
            {
              required: true,
              type: "number",
              message: "Please input the duration in minutes!",
            },
          ]}
        >
          <InputNumber min={1} className="w-full" />
        </Form.Item>

     
          <Form.Item
            name="examDate"
            label="Exam Start Date"
            rules={[
              {
                required: true,
                message: "Please input the exam start date!",
              },
            ]}
          >
            <Input
              name="examDate"
              type="date"
              placeholder="Exam Start Date"
            />
          </Form.Item>
  

          <Form.Item
            name="examTime"
            label="Exam Time"
            rules={[
              {
                required: true,
                message: "Please input the exam start time!",
              },
            ]}
          >
            <Input
              name="examTime"
              type="time"
              placeholder="Exam Time"
            />
          </Form.Item>

        <Form.Item
          label="Private Answer"
          name="privateAnswer"
          rules={[
            {
              required: true,
              message: "Please select whether private answer is allowed!",
            },
          ]}
        >
          <Select>
            <Select.Option value={true}>Yes</Select.Option>
            <Select.Option value={false}>No</Select.Option>
          </Select>
        </Form.Item>



        <Form.Item
          label="Private Score"
          name="privateScore"
          rules={[
            {
              required: true,
              message: "Please select whether private score is allowed!",
            },
          ]}
        >
          <Select>
            <Select.Option value={true}>Yes</Select.Option>
            <Select.Option value={false}>No</Select.Option>
          </Select>
        </Form.Item>


        <Form.Item
          label="Add Certification?"
          name="hasCertificate"
          
        >
          <Select>
            <Select.Option value={true}>Yes</Select.Option>
            <Select.Option value={false}>No</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Visiblity?"
          name="visibility"
          
        >
          <Select>
            <Select.Option value={"public"}>Public</Select.Option>
            <Select.Option value={"private"}>Private</Select.Option>
          </Select>
        </Form.Item>
        </div>
     
<div className="flex justify-end">


        <Button
          className="px-16 bg-primary-500"
          type="primary"
          onClick={() => setActiveTabKey("Instruction")}
        >
          Next
        </Button>
        </div>
      </div>
  );
};

export default BasicInfoForm;
