import { Card, Form, Input, Button, Select, InputNumber, Radio, Checkbox } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";

const { TextArea } = Input;



const EditExamm = () => {
    const { workspace } = useSelector((state) => state.data);
    const { user } = useSelector((state) => state.auth);
    const { id } = useParams(); // Get the exam ID from the URL
    const navigate = useNavigate();
    const [instruction, setInstruction] = useState(""); // State to store ReactQuill content
    const [exam, setExam] = useState(null);
    const [form] = Form.useForm();
  
    useEffect(() => {
      const fetchExamDetails = async () => {
        try {
          const response = await axios.get(`/api/exams/${id}`);
          const examData = response.data.data.data[0];
          setExam(examData);
          form.setFieldsValue(examData);
          setInstruction(examData.instruction); // Initialize ReactQuill content
        } catch (error) {
          console.error("Error fetching exam details:", error);
          toast.error("Failed to fetch exam details");
        }
      };
  
      fetchExamDetails();
    }, [id, form]);
  
    const handleFinish = async (values) => {
      try {
        await axios.patch(`/api/exams/${id}`, { ...values, instruction }); // Include ReactQuill content
        toast.success("Exam updated successfully");
        navigate('/dashboard/exams');
      } catch (error) {
        console.error("Error updating exam:", error);
        toast.error("Failed to update exam");
      }
    };
    
    if (!exam) {
      return <p>Loading...</p>; // Show a loading indicator while fetching data
    }
  
    return (
      <>
        <div className='flex gap-4 items-center mb-2'>
          <Link to='/dashboard/exams'>
            <Icon
              icon='fluent-emoji-high-contrast:left-arrow'
              className='text-2xl text-primary-500'
            />
          </Link>
           <h1 className='text-2xl font-bold text-blue-900 text-left'>Edit Exam</h1>
        </div>
  
        <Card style={{ width: "100%" }} tabProps={{ size: "middle" }}>
          <Form form={form} onFinish={handleFinish} layout="vertical">
            <div className="flex gap-4">
              <Form.Item label="Exam Name" name="examName">
                <Input />
              </Form.Item>
              <Form.Item name="duration" label="Time Limit (Minutes)">
                <InputNumber />
              </Form.Item>
              <Form.Item name="points" label="Points">
                <InputNumber />
              </Form.Item>
              <Form.Item name='examDate' label='Exam Start Date'>
                <Input name='examDate' type='date' placeholder='Exam Start Date' className='w-48' />
              </Form.Item>
              <Form.Item name='examTime' label='Exam Time'>
                <Input name='examTime' type='time' placeholder='Exam Time' className='w-48' />
              </Form.Item>
              <Form.Item label="Private Answer" name="privateAnswer">
                <Select>
                  <Select.Option value={true}>Yes</Select.Option>
                  <Select.Option value={false}>No</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Private Score" name="privateScore">
                <Select>
                  <Select.Option value={true}>Yes</Select.Option>
                  <Select.Option value={false}>No</Select.Option>
                </Select>
              </Form.Item>
            </div>
  
            <Form.Item name="instruction" label="Instructions">
              <ReactQuill value={instruction} onChange={setInstruction} />
            </Form.Item>
  
            <div>
              <div className="flex justify-center items-center gap-2 mb-8 mt-4">
                <Icon icon="material-symbols:security" className="text-2xl font-bold text-blue-800" />
                <p className="font-semibold text-blue-900 text-lg">Enter the Security level for the exam here</p>
              </div>
              <Form.Item name="examType" rules={[{ required: true, message: "Please input the exam security type!" }]}>
                <Radio.Group className="flex justify-center items-center gap-8">
                  <div className="p-8 border border-gray-200 rounded-lg flex flex-col gap-4 justify-center items-center group hover:bg-blue-600 transition ease-in-out duration-300">
                    <Icon icon="ph:security-camera-fill" className="text-3xl font-bold text-blue-800 group-hover:text-white" />
                    <Radio value="high" className="group-hover:text-white"> High security </Radio>
                  </div>
                  <div className="p-8 border border-gray-200 rounded-lg flex flex-col gap-4 justify-center items-center group hover:bg-blue-600 transition ease-in-out duration-300">
                    <Icon icon="mdi:security-off" className="text-3xl font-bold text-blue-800 group-hover:text-white" />
                    <Radio value="low" className="group-hover:text-white"> Low Security </Radio>
                  </div>
                </Radio.Group>
              </Form.Item>
            </div>
  
         
  
          
  
            <Form.List name="questions">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <Card key={key} className="mb-4">
                      <Form.Item
                        {...restField}
                        name={[name, 'questionText']}
                        fieldKey={[fieldKey, 'questionText']}
                        label={`Question ${name + 1}`}
                        rules={[{ required: true, message: 'Please enter the question text' }]}
                      >
                        <Input />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'points']}
                        fieldKey={[fieldKey, 'points']}
                        label="Points"
                        rules={[{ required: true, message: 'Please enter the points for this question' }]}
                      >
                        <InputNumber />
                      </Form.Item>
                      {/* <Form.Item
                        {...restField}
                        name={[name, 'questionType']}
                        fieldKey={[fieldKey, 'questionType']}
                        label="Question Type"
                        rules={[{ required: true, message: 'Please select the question type' }]}
                      >
                        <Select>
                          <Select.Option value="True/False">True/False</Select.Option>
                          <Select.Option value="choose">Multiple Choice</Select.Option>
                          <Select.Option value="shortAnswer">Short Answer</Select.Option>
                          <Select.Option value="essay">Essay</Select.Option>
                        </Select>
                      </Form.Item> */}
                      {form.getFieldValue(['questions', name, 'questionType']) === 'choose' && (
                        <Form.List name={[name, 'questionChoice']}>
                          {(choiceFields, { add: addChoice, remove: removeChoice }) => (
                            <>
                              {choiceFields.map(({ key: choiceKey, name: choiceName, fieldKey: choiceFieldKey, ...restChoiceField }) => (
                                <Form.Item
                                  key={choiceKey}
                                  {...restChoiceField}
                                  name={[choiceName]}
                                  fieldKey={[choiceFieldKey]}
                                  label={`Choice ${String.fromCharCode(65 + choiceName)}`}
                                  rules={[{ required: true, message: 'Please enter the choice text' }]}
                                >
                                  <Input />
                                </Form.Item>
                              ))}
                              <Button type="dashed" onClick={() => addChoice()} block>
                                Add Choice
                              </Button>
                            </>
                          )}
                        </Form.List>
                      )}
                      <Button type="dashed" onClick={() => remove(name)} block>
                        Remove Question
                      </Button>
                    </Card>
                  ))}
                  {/* <Button type="dashed" onClick={() => add()} block>
                    Add Question
                  </Button> */}
                </>
              )}
            </Form.List>
  
            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </>
    );
  };
  
  export default EditExamm;
  