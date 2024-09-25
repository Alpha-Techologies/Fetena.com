import React, { useEffect, useState } from "react";
import { Button, Input, Modal, Collapse, Form, Select, InputNumber, Card, Radio } from 'antd';
import { Icon } from "@iconify/react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import TogetherManager from "../../../AI";
import questionGenerationTemplate from "../../../Prompts/questionGenerationTemplate";
import { toast } from "react-toastify";

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
      className="-mt-16"
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
            <div className="flex gap-2 items-center px-8">
              <Icon
                icon="streamline:ai-generate-variation-spark"
                className="text-lg text-white "
              />{" "}
              Generate
            </div>
          </Button>
        </div>

        {isLoading ? (
  <div className="text-center font-semibold text-gray-500">Loading...</div>
) : (
  <div className="flex flex-col gap-2">
    <pre className="h-80 overflow-auto font-semibold text-blue-900 text-md -mt-4 border border-gray-300 rounded-lg p-2">
      {promptResponse}
    </pre>
    <CopyToClipboard text={promptResponse} onCopy={() => toast.success("Results copied successfully!")}>
  <Button className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded">
    Copy Results
  </Button>
</CopyToClipboard>
  </div>
)}      </div>
    </Modal>
  );
};

export default AiQuestionGenerator;