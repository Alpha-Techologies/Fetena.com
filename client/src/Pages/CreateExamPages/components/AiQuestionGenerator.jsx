import React, { useState } from "react";
import { Button, Input, Modal, Collapse, Form, Select,InputNumber } from "antd";
import { Card, Radio } from "antd";

import { Icon } from "@iconify/react";

const { TextArea } = Input;
const { Panel } = Collapse;

const questions = [
  {
    _id: "question1",
    questionType: "True/False",
    questionText: "The capital of France is Paris.",
    correctAnswer: "True",
    points: 5,
  },
  {
    _id: "question2",
    questionType: "choose",
    questionText: "What is the largest planet in our solar system?",
    correctAnswer: "Jupiter",
    questionChoice: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    points: 10,
  },
  {
    _id: "question3",
    questionType: "shortAnswer",
    questionText: "Explain the concept of photosynthesis.",
    correctAnswer: "",
    points: 15,
  },
  {
    _id: "question4",
    questionType: "essay",
    questionText: "Discuss the impact of climate change on the environment.",
    correctAnswer: "",
    points: 20,
  },
  {
    _id: "question5",
    questionType: "True/False",
    questionText: "The Earth revolves around the Sun.",
    correctAnswer: "True",
    points: 5,
  },
  {
    _id: "question6",
    questionType: "choose",
    questionText: "What is the capital of Canada?",
    correctAnswer: "Ottawa",
    questionChoice: ["Toronto", "Montreal", "Ottawa", "Vancouver"],
    points: 10,
  },
  {
    _id: "question7",
    questionType: "shortAnswer",
    questionText: "Explain the concept of supply and demand.",
    correctAnswer: "",
    points: 15,
  },
  {
    _id: "question8",
    questionType: "essay",
    questionText: "Discuss the importance of renewable energy sources.",
    correctAnswer: "",
    points: 20,
  },
];

const AiQuestionGenerator = ({
  handleCancell,
  handleOkk,
  isModalOpenn,
  setActiveTabKey,
}) => {
  const [generateRequest, setGenerateRequest] = useState({
    ExamType: "",
    Subject: "",
    Prompt: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const onChange = (key) => {
    console.log(key);
  };

  const handleSelectChange = (value, field) => {
    setGenerateRequest((prev) => ({
      ...prev,
      [field]: value,
    }));
    console.log(generateRequest);
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setGenerateRequest((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(generateRequest);
  };

  const transformedItems = questions.map((question, index) => {
    return {
      key: `${question._id}`,
      label: (
        <div className="flex gap-8 items-center justify-between mx-4 ">
          <h3 className="text-blue-900 font-semibold">Question {index + 1}</h3>
          <p className="font-semibold text-blue-900">
            Points {question.points}
          </p>
        </div>
      ),
      children: (
        <div>
          {question.questionType === "True/False" && (
            <Card className="w-full mx-auto bg-gray-50 rounded-none">
              <div className="flex items-start">
                <div className="w-48">
                  <p className="text-[0.8rem]">
                    Question Type:{" "}
                    <span className="font-medium text-[0.9rem]">
                      {question.questionType}
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-2 flex items-start">
                <p>
                  Question Text:{" "}
                  <span className="font-semibold text-[1rem]">
                    {question.questionText}
                  </span>
                </p>
              </div>
              <div className="mt-2 flex items-start">
                <div className="w-48">
                  <p className="text-[0.8rem]">
                    Correct Answer:{" "}
                    <span className="font-semibold text-[0.9rem]">
                      {question.correctAnswer}
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-2 text-end"></div>
            </Card>
          )}

          {question.questionType === "choose" && (
            <Card className="bg-gray-50 w-full mx-auto">
              <div className="flex items-start">
                <div className="w-48">
                  <p className="text-[0.8rem]">
                    Question Type:{" "}
                    <span className="font-medium text-[0.9rem]">
                      {question.questionType}
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-2 flex items-start">
                <p>
                  Question Text:{" "}
                  <span className="font-semibold text-[1rem]">
                    {question.questionText}
                  </span>
                </p>
              </div>
              <div className="mt-2 flex items-start">
                <div className="w-48">
                  <p className="text-[0.8rem]">
                    Correct Answer:{" "}
                    <span className="font-semibold text-[0.9rem]">
                      {question.correctAnswer}
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-4 w-full flex items-start mx-4 gap-4">
                <Radio.Group value={question.correctAnswer}>
                  {question.questionChoice &&
                    question.questionChoice.map((choice, choiceIndex) => (
                      <Form.Item
                        key={choiceIndex}
                        label={`${String.fromCharCode(65 + choiceIndex)}`}
                      >
                        <div className="flex gap-4 justify-center">
                          <p className="font-semibold">{choice}</p>
                          <div className="flex gap-2 items-center">
                            <Radio value={choice}></Radio>
                            <span className="text-blue-700"></span>
                          </div>
                        </div>
                      </Form.Item>
                    ))}
                </Radio.Group>
              </div>
            </Card>
          )}

          {question.questionType === "shortAnswer" && (
            <Card className="bg-gray-50 w-full mx-auto">
              <div className="flex items-start">
                <div className="w-48">
                  <p className="text-[0.8rem]">
                    Question Type:{" "}
                    <span className="font-medium text-[0.9rem]">
                      {question.questionType}
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-2 flex items-start">
                <p>
                  Question Text:{" "}
                  <span className="font-semibold text-[1rem]">
                    {question.questionText}
                  </span>
                </p>
              </div>
            </Card>
          )}

          {question.questionType === "essay" && (
            <Card className="bg-gray-50 w-11/12 mx-auto my-8">
              <div className="flex items-start">
                <div className="w-48">
                  <p className="text-[0.8rem]">
                    Question Type:{" "}
                    <span className="font-medium text-[0.9rem]">
                      {question.questionType}
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-2 flex items-start">
                <p>
                  Question Text:{" "}
                  <span className="font-semibold text-[1rem]">
                    {question.questionText}
                  </span>
                </p>
              </div>

              <div className="mt-4 mx-4 flex items-start">
                <h3 className="font-semibold text-[1rem]">
                  {question.questionText}
                </h3>
              </div>
            </Card>
          )}
        </div>
      ),
    };
  });


  return (
    <Modal
      title="Ai Question Generator"
      open={isModalOpenn}
      onOk={handleOkk}
      onCancel={handleCancell}
    >
      <div className="flex flex-col py-4">
        <Form.Item
          label={
            <div className="flex gap-2 items-center my-1 font-semibold">
              <Icon icon="ph:exam" className="text-xl text-primary-500" /> Exam
              Type
            </div>
          }
          name="examtype"
        >
          <Select onChange={(value) => handleSelectChange(value, "ExamType")}>
            <Select.Option value="True / False">
              <div className="flex gap-2 items-center my-1">
                <Icon
                  icon="material-symbols:fact-check-outline"
                  className="text-xl text-primary-500"
                />{" "}
                True / False
              </div>
            </Select.Option>
            <Select.Option value="Multiple Choice">
              <div className="flex gap-2 items-center my-1">
                <Icon
                  icon="mingcute:choice-line"
                  className="text-xl text-primary-500"
                />{" "}
                Multiple Choice
              </div>
            </Select.Option>
            <Select.Option value="Short Answer">
              <div className="flex gap-2 items-center my-1">
                <Icon
                  icon="ic:outline-question-answer"
                  className="text-xl text-primary-500"
                />{" "}
                Short Answer
              </div>
            </Select.Option>
            <Select.Option value="Essay">
              <div className="flex gap-2 items-center my-1">
                <Icon
                  icon="uis:paragraph"
                  className="text-xl text-primary-500"
                />{" "}
                Essay
              </div>
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={
            <div className="flex gap-2 items-center my-1 font-semibold">
              <Icon
                icon="carbon:document-subject"
                className="text-xl text-primary-500"
              />{" "}
              Subject
            </div>
          }
          name="subject"
        >
          <Select onChange={(value) => handleSelectChange(value, "Subject")}>
            <Select.Option value="Mathematics">
              <div className="flex gap-2 items-center my-1">
                <Icon icon="mdi:pi" className="text-xl text-primary-500" />{" "}
                Mathematics
              </div>
            </Select.Option>
            <Select.Option value="Natural Sciences">
              <div className="flex gap-2 items-center my-1">
                <Icon icon="mdi:flask" className="text-xl text-primary-500" />{" "}
                Natural Sciences
              </div>
            </Select.Option>
            <Select.Option value="Social Sciences">
              <div className="flex gap-2 items-center my-1">
                <Icon
                  icon="material-symbols:globe"
                  className="text-xl text-primary-500"
                />{" "}
                Social Sciences
              </div>
            </Select.Option>
            <Select.Option value="Language">
              <div className="flex gap-2 items-center my-1">
                <Icon
                  icon="ion:language"
                  className="text-xl text-primary-500"
                />{" "}
                Language
              </div>
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label={
            <div className="flex gap-2 items-center my-1 font-semibold">
              <Icon
                 icon="gg:check-o"
                className="text-xl text-primary-500"
              />{" "}
              Points
            </div>
          }
          name="points"
        >         <InputNumber min={1} className="w-full" />
       </Form.Item>
        <Form.Item
          label={
            <div className="flex gap-2 items-center my-1 font-semibold">
              <Icon
                icon="streamline:ai-prompt-spark"
                className="text-xl text-primary-500"
              />{" "}
              Prompt
            </div>
          }
          name="prompt"
        >
          <TextArea
            rows={4}
            placeholder="Enter your prompt"
            name="Prompt"
            value={generateRequest.Prompt}
            onChange={handleTextChange}
          />
        </Form.Item>
        <div className="flex items-center justify-center gap-2 mb-8">
          <Button
            type="primary"
            className="px-8 font-semibold bg-white hover:bg-blue-700 text-blue-500 shadow-none border border-blue-500 hover:border-blue-700 font-boldpx-8 group"
          >
            <div className="flex gap-2 items-center">
              <Icon
                icon="streamline:ai-generate-variation-spark"
                className="text-xl text-blue-500 group-hover:text-white"
              />{" "}
              Generate
            </div>
          </Button>
        </div>
        {/* <Collapse items={items} defaultActiveKey={["1"]} onChange={onChange} /> */}
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <Collapse onChange={onChange}>
            {transformedItems.map((item) => (
              <Panel key={item.key} header={item.label}>
                {item.children}
              </Panel>
            ))}
          </Collapse>
        )}
      </div>
    </Modal>
  );
};

export default AiQuestionGenerator;
