import {
  Card,
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  DatePicker,
  Radio,
  Switch,
} from "antd";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "react-quill/dist/quill.snow.css";
import React, { useEffect, useRef, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Tag, theme } from "antd";
import { TweenOneGroup } from "rc-tween-one";

const { TextArea } = Input;

const BasicInfoForm = ({
  basicInfoValues,
  setBasicInfoValues,
  setActiveTabKey,
}) => {
  if (!basicInfoValues) {
    // If basicInfoValues is not defined yet, render a loading state or return null
    return <div>Loading...</div>;
  }

  const { token } = theme.useToken();
  const [tags, setTags] = useState([]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
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
      setBasicInfoValues({ ...basicInfoValues, tags: newTags });
      console.log({ ...basicInfoValues, tags: newTags });
    } else {
      setBasicInfoValues({ ...basicInfoValues, tags });
      console.log(basicInfoValues);
    }
    setInputVisible(false);
    setInputValue("");
  };

  const forMap = (tag) => (
    <span
      key={tag}
      style={{
        display: "inline-block",
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
    borderStyle: "dashed",
  };

  return (
    <div className="w-full flex flex-col gap-4 mt-4">
            <div className="grid grid-cols-2 gap-x-8">

      <Form.Item label="Exam Name">
        <Input
          value={basicInfoValues.examName}
          onChange={(e) =>
            setBasicInfoValues({ ...basicInfoValues, examName: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item label="Duration (minutes)">
        <InputNumber
          min={1}
          className="w-full"
          value={basicInfoValues.duration}
          onChange={(e) =>
            setBasicInfoValues({ ...basicInfoValues, duration: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item label="Exam Start Date">
        <Input
          value={basicInfoValues.examDate}
          type="date"
          placeholder="Exam Start Date"
        
          onChange={(e) =>
            setBasicInfoValues({ ...basicInfoValues, examDate: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item label="Exam Time">
        <Input
          value={basicInfoValues.examTime}
          type="time"
          placeholder="Exam Time"
          onChange={(e) =>
            setBasicInfoValues({ ...basicInfoValues, examTime: e.target.value })
          }
        />
      </Form.Item>

      <Form.Item
        label="Private Answer"
        initialValue={basicInfoValues.privateAnswer}
        name="privateAnswer"
      >
        <Select
          value={basicInfoValues.privateAnswer}
          onChange={(e) =>
            setBasicInfoValues({
              ...basicInfoValues,
              privateAnswer: e.target.value,
            })
          }
        >
          <Select.Option value={true}>Yes</Select.Option>
          <Select.Option value={false}>No</Select.Option>
        </Select>
      </Form.Item>

      <Form.Item
        label="Private Score"
        name="privateScore"
        initialValue={basicInfoValues.privateScore}
      >
        <Select
          value={basicInfoValues.privateScore}
          onChange={(e) =>
            setBasicInfoValues({
              ...basicInfoValues,
              privateScore: e.target.value,
            })
          }
        >
          <Select.Option value={true} default>
            Yes
          </Select.Option>
          <Select.Option value={false}>No</Select.Option>
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
