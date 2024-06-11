import { Card, Form, Input, Button, Select, InputNumber, DatePicker, Radio, Switch } from "antd";
import { TimePicker } from 'antd';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import 'react-quill/dist/quill.snow.css';
import React, { useEffect, useRef, useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import {  Tag, theme } from 'antd';
import { TweenOneGroup } from 'rc-tween-one';



const { TextArea } = Input;

const BasicInfoForm = ({basicInfoValues, setBasicInfoValues, setActiveTabKey}) => {



  const { token } = theme.useToken();
  const [tags, setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const inputRef = useRef(null);



  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);

  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };
  const showInput = () => {
    setInputVisible(true);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      const newTags = [...tags, inputValue];
      setTags(newTags);
      setBasicInfoValues({...basicInfoValues, tags: newTags});
      console.log({...basicInfoValues, tags: newTags});
    } else {
      setBasicInfoValues({...basicInfoValues, tags});
      console.log(basicInfoValues);
    }
    setInputVisible(false);
    setInputValue('');
  };
  

  const forMap = (tag) => (
    <span
      key={tag}
      style={{
        display: 'inline-block',
      }}
    >
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    </span>
  );
  const tagChild = tags.map(forMap);
  const tagPlusStyle = {
    background: token.colorBgContainer,
    borderStyle: 'dashed',
  };





  return (
    <div className="w-3/4 flex flex-col gap-4 mt-4">





    <Form.Item label="Exam Name" name="examName" rules={[{ required: true, message: "Please input the exam name!" }]}>
      <Input />
    </Form.Item>





    <div className="grid grid-cols-3 gap-2">


    <Form.Item label="Duration (minutes)" name="duration" rules={[{ required: true, type: "number", message: "Please input the duration in minutes!" }]}>
      <InputNumber min={1} className="w-full" />
    </Form.Item>

   <div>
     

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
                    </div>

                    <div className="ml-4">
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



                        </div>



                        <div className="grid grid-cols-3 gap-2">
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


    <div>


                        <Form.Item label="Tags" >
    <>
      <div
      
        style={{
          marginBottom: 16,
        }}
      >
        <TweenOneGroup
          appear={false}
          enter={{
            scale: 0.8,
            opacity: 0,
            type: 'from',
            duration: 100,
          }}
          leave={{
            opacity: 0,
            width: 0,
            scale: 0,
            duration: 200,
          }}
          onEnd={(e) => {
            if (e.type === 'appear' || e.type === 'enter') {
              e.target.style = 'display: inline-block';
            }
          }}
        >
          {tagChild}
        </TweenOneGroup>
      </div>
      {inputVisible ? (
        <Input
          ref={inputRef}
          type="text"
          size="small"
          style={{
            width: 78,
          }}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputConfirm}
          onPressEnter={handleInputConfirm}
        />
      ) : (
        <Button onClick={showInput} style={tagPlusStyle}>
          <div className="flex justify-center gap-2"> 

          <PlusOutlined /> New Tag
          </div>
        </Button>
      )}
    </>

    </Form.Item>
    </div>



    <div className="flex justify-end">
    <Button className="px-16" type="primary" onClick={() => setActiveTabKey("Instruction")}>Next</Button>



</div>
  </div>
  )
}

export default BasicInfoForm;






