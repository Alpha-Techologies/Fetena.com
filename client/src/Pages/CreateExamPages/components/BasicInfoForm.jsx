import { Card, Form, Input, Button, Select, InputNumber, DatePicker, Radio, Switch } from "antd";
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'react-quill/dist/quill.snow.css';

const { TextArea } = Input;

const BasicInfoForm = ({basicInfoValues, setBasicInfoValues, setActiveTabKey}) => {
  return (
    <div className="w-3/4">
    <Form.Item label="Exam Name" name="examName" rules={[{ required: true, message: "Please input the exam name!" }]}>
      <Input />
    </Form.Item>
    <Form.Item label="Duration (minutes)" name="duration" rules={[{ required: true, type: "number", message: "Please input the duration in minutes!" }]}>
      <InputNumber min={1} className="w-full" />
    </Form.Item>

    <div className="flex gap-2 w-full justify-between">

   
    <Form.Item

                      name='examDate'
                      label='Exam Start Date'
                      rules={[
                        {
                          required: true,
                          message: "Please input the exam start date!",
                        },
                      ]}>
                      <Input
                        name='examDate'
                        type='date'
                        placeholder='Exam Start Date'
                        className='w-48'
                      />
                    </Form.Item>

                 
                         <Form.Item
                      name='examTime'
                      label='Exam Time'
                      rules={[
                        {
                          required: true,
                          message: "Please input the exam start time!",
                        },
                      ]}>
                       <Input
                        name='examTime'
                        type='time'
                        placeholder='Exam Time'
                        className='w-48'
                      />
                        </Form.Item>
                        </div>


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
    <div className="flex justify-end">
    <Button className="px-16" type="primary" onClick={() => setActiveTabKey("Instruction")}>Next</Button>



</div>
  </div>
  )
}

export default BasicInfoForm;






