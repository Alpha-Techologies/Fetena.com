import { Card, Form, Input, Button, Select, InputNumber, Radio } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";


const tabListNoTitle = [
  {
    key: "Basic Info",
    label: "Basic Info",
  },
  {
    key: "Exam Questions",
    label: "Exam Questions",
  },
];

const CreateExam = () => {
  const [activeTabKey, setActiveTabKey] = useState("Basic Info");
  const [basicInfoForm] = Form.useForm();
  const [examQuestions, setExamQuestions] = useState([]);
  const [Question, setQuestion] = useState({
    questionNo: "",
    question: "",
    type: "",
    options: null,
    correctAnswer: false


  }); 

  const handleChange = (key, changedValues) => {
    if (key === "Basic Info") {
      basicInfoForm.setFieldsValue(changedValues);
    }
  };


  const onTabChange = (key) => {
    if (activeTabKey === "Basic Info") {
      basicInfoForm
        .validateFields()
        .then(() => {
          // Basic Info form is valid, allow switching to Exam Questions tab
          setActiveTabKey(key);
        })
        .catch((errorInfo) => {
          // Basic Info form has errors, prevent tab switch and display toast notification
          toast.error("Please complete all required fields in Basic Info");
        });
    } else if (activeTabKey === "Exam Questions") {
      // Save the current question to the examQuestions state
      setExamQuestions([...examQuestions, Question]);
      // Reset the Question state for the next question
      setQuestion({
        questionNo: "",
        question: "",
        type: "",
        options: null,
        correctAnswer: false,
      });
      setActiveTabKey(key);
    }
  };
  
  const handleSave = () => {
    if (activeTabKey === "Basic Info") {
      basicInfoForm
        .validateFields()
        .then(() => {
          // Basic Info form is valid, allow switching to Exam Questions tab
          setActiveTabKey("Exam Questions");
        })
        .catch((errorInfo) => {
          // Basic Info form has errors, prevent tab switch and display toast notification
          toast.error("Please complete all required fields in Basic Info");
        });
    } else if (activeTabKey === "Exam Questions") {
      // Save the current question to the examQuestions state
      setExamQuestions([...examQuestions, Question]);
      // Reset the Question state for the next question
      setQuestion({
        questionNo: "",
        question: "",
        type: "",
        options: null,
        correctAnswer: false,
      });
    }
  };
  



  
// Define a function to render the form based on the selected exam question type
const renderQuestionForm = (type, index) => {
  switch (type) {
    case "trueFalse":
      return (
        <Card key={index} title="True/False Question">
          {/* Add form fields for true/false question */}
        </Card>
      );
    case "choose":
      return (
        <Card key={index} title="Choose Question">
          {/* Add form fields for choose question */}
        </Card>
      );
    case "fillBlank":
      return (
        <Card key={index} title="Fill the Blank Question">
          {/* Add form fields for fill the blank question */}
        </Card>
      );
    default:
      return null;
  }
};

  return (
    <div className="flex flex-col gap-4 my-4">
      <div className="flex justify-between">
        <h1 className="text-3xl font-bold">Create Exam</h1>
      </div>
      <div>
        <Card
          style={{
            width: "100%",
          }}
          tabList={tabListNoTitle}
          activeTabKey={activeTabKey}
          tabBarExtraContent={<Button 
            onClick={handleSave}>{activeTabKey === "Basic Info"? "next" : "save"}</Button>
          }
          onTabChange={onTabChange}
          tabProps={{
            size: "middle",
          }}
        >
          {activeTabKey === "Basic Info" && (
            <Form
              form={basicInfoForm}
              initialValues={{
                examName: "",
                duration: "",
                examKey: "",
                description: "",
                privateAnswer: "",
                privateScore: "",
              }}
              onValuesChange={(changedValues) =>
                handleChange("Basic Info", changedValues)
              }
            >
              {/* Add Basic Info form fields */}
              <Form.Item
                label="Exam Name"
                name="examName"
                rules={[
                  {
                    required: true,
                    message: "Please input the exam name!",
                  },
                ]}
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
  <InputNumber min={1} />
</Form.Item>

              <Form.Item
                label="Exam Key"
                name="examKey"
                rules={[
                  {
                    required: true,
                    message: "Please input the exam key!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Description"
                name="description"
                rules={[
                  {
                    required: true,
                    message: "Please input the description!",
                  },
                ]}
              >
                <Input.TextArea />
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
                  <Select.Option value="yes">Yes</Select.Option>
                  <Select.Option value="no">No</Select.Option>
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
                  <Select.Option value="yes">Yes</Select.Option>
                  <Select.Option value="no">No</Select.Option>
                </Select>
              </Form.Item>
            </Form>
          )}
 <div>
      {activeTabKey === "Exam Questions" && (
        <div>
          {/* Render the question forms */}
          {examQuestions.map((type, index) => renderQuestionForm(type, index))}

          {/* Render the question choices section */}
          <Card title="Question Choices">
            <Radio.Group onChange={(e) => handleQuestionTypeChange(e.target.value)}>
              <Radio value="trueFalse">True/False Question</Radio>
              <Radio value="choose">Choose Question</Radio>
              <Radio value="fillBlank">Fill the Blank Question</Radio>
            </Radio.Group>
          </Card>
        </div>
      )}
    </div>
        </Card>
      </div>
    </div>
  );
};

export default CreateExam;
