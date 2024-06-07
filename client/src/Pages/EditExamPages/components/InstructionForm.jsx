import { Card, Form, Input, Button, Select, InputNumber, DatePicker, Radio, Switch } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
const { TextArea } = Input;



const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
};

const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
];


const InstructionForm = ({basicInfoValues, setBasicInfoValues,setActiveTabKey}) => {
  return (
    <>
    <Form.Item name="instruction">
    <div className="flex justify-center items-center gap-2">

      
    <Icon icon="icon-park-outline:instruction" className="text-2xl font-bold text-blue-800 lg:flex hidden" />
      <p className="font-semibold  text-blue-900 text-lg">Enter the Instructions for the exam here</p>
      </div>
      <ReactQuill 
      className="mx-auto my-4 h-96"
      value={basicInfoValues.instruction} 
      onChange={(value) => setBasicInfoValues({...basicInfoValues, instruction: value})} 
     
       
        modules={modules}
        formats={formats}
      />
      
    </Form.Item>
    <div className="flex justify-end mt-12">
<Button          className="px-16 bg-primary-500 mt-4"
 type="primary" onClick={() => setActiveTabKey("Security")}>Next</Button>

</div>
      </>
  )
}

export default InstructionForm