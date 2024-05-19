import { Card, Form, Input, Button, Select, InputNumber, DatePicker, Radio, Switch } from "antd";

import 'react-quill/dist/quill.snow.css';

const { TextArea } = Input;

const BasicInfoForm = ({basicInfoValues, setBasicInfoValues, setActiveTabKey}) => {
  return (
    <>
    <div className="flex items-center justify-center ">
      <div className="w-3/5">
            <p className="mb-8 font-semibold text-center text-blue-900 text-lg">Enter Information about the exam here</p>

    <Form.Item label="Exam Name" name="examName" rules={[{ required: true, message: "Please input the exam name!" }]}>
      <Input />
    </Form.Item>
    <Form.Item label="Duration (minutes)" name="duration" rules={[{ required: true, type: "number", message: "Please input the duration in minutes!" }]}>
      <InputNumber min={1} className="w-full" />
    </Form.Item>
    {/* <Form.Item label="Exam starting date and time" name="examStartDate" rules={[{ required: true, message: "Please enter the Starting date and time for the exam" }]} >
      <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
    </Form.Item> */}
    <div className="grid grid-cols-2 gap-4">

   
    <Form.Item label="Private Answer" name="privateAnswer" rules={[{ required: true, message: "Please select whether private answer is allowed!" }]}>
      <Select>
        <Select.Option value={true}>Yes</Select.Option>
        <Select.Option value={false}>No</Select.Option>
      </Select>
    </Form.Item>
    <Form.Item label="Private Score" name="privateScore" rules={[{ required: true, message: "Please select whether private score is allowed!" }]}>
      <Select>
        <Select.Option value={true}>Yes</Select.Option>
        <Select.Option value={false}>No</Select.Option>
      
      </Select>
    </Form.Item>
    </div>
   
</div>
  </div>
  
<div className="flex justify-end">
    <Button className="px-16" type="primary" onClick={() => setActiveTabKey("Instruction")}>Next</Button>



</div>
</>

  )
}

export default BasicInfoForm;