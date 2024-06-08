import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Collapse, Form, Select, InputNumber, Card, Radio } from 'antd';
import { Icon } from "@iconify/react";

import TogetherManager from "../../../AI";
import questionGenerationTemplate from "../../../Prompts/questionGenerationTemplate";

const { TextArea } = Input;
const { Panel } = Collapse;

const AiQuestionGenerator = ({
  handleCancell,
  handleOkk,
  isModalOpenn,
  setActiveTabKey,
}) => {
  const [generateRequest, setGenerateRequest] = useState({
    examtype: "",
    subject: "",
    prompt: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [promptResponse, setPromptResponse] = useState("");
  const togetherManager = new TogetherManager(
    "ec99b9a81c37972d744411fda1120c9cef2d32dab3cfdc057d8b24304ba2f969",
    setPromptResponse
  );

  const handleChange = (e) => {
    setGenerateRequest((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
    }));
    console.log(generateRequest); // This will log the old state, not the updated one
};

  const generate = async () => {
    setIsLoading(true); // Show loading indicator
    const prompt = questionGenerationTemplate({
      difficulty: "hard",
      subject: generateRequest.subject,
      questionType: generateRequest.examtype,
      customPrompt: generateRequest.prompt
  });
    try {
      // Assuming res.trim() returns a JSON string
      await togetherManager.performInference(prompt);

      console.log(promptResponse);
  
      // const regex = /\[\s*{[^{}]*}(?:\s*,\s*{[^{}]*})*\s*\]/;
      // const match = promptResponse.match(regex);
      // if (match) {
      //   const jsonArray = match[0];
      //   console.log("jsonArray");
      //   console.log(JSON.parse(jsonArray.replaceAll("\n", "")));
      // } else {
      //   console.log("No JSON array found.");
      // }
    } catch (error) {
      console.error("Error parsing JSON response:", error);
    } 
      setIsLoading(false); // Hide loading indicator
    
  }
  
  return (
    <Modal
      title="AI Question Generator"
      visible={isModalOpenn}
      onOk={handleOkk}
      onCancel={handleCancell}
    >
      <div className="flex flex-col py-4">
        <Form.Item label="Exam Type">
          <Select
            onChange={(value) => handleChange({ target: { name: "examtype", value } })}
            value={generateRequest.examtype}
          >
            <Select.Option value="True / False">True / False</Select.Option>
            <Select.Option value="Multiple Choice">Multiple Choice</Select.Option>
            <Select.Option value="Short Answer">Short Answer</Select.Option>
            <Select.Option value="Essay">Essay</Select.Option>
          </Select>
        </Form.Item>

        <Form.Item label="Subject">
          <Input
            name="subject"
            onChange={handleChange}
            value={generateRequest.subject}
          />
        </Form.Item>

        <Form.Item label="Prompt">
          <TextArea
            rows={4}
            placeholder="Enter your prompt"
            name="prompt"
            onChange={handleChange}
            value={generateRequest.prompt}
          />
        </Form.Item>

        <div className="flex items-center justify-center gap-2 mb-8">
          <Button
            type="primary"
            onClick={generate}
            disabled={
              !generateRequest.examtype ||
              !generateRequest.subject ||
              !generateRequest.prompt
            }
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

        {isLoading ? <div>Loading...</div> : <p>{promptResponse}</p>}
      </div>
    </Modal>
  );
};

export default AiQuestionGenerator;