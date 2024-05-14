    import { Card, Form, Input, Button, Select, InputNumber, DatePicker,Radio,Switch   } from "antd";
    import { useState } from "react";
    import { Link } from "react-router-dom";
    import { Icon } from "@iconify/react";
    import ReactQuill from 'react-quill';
    import 'react-quill/dist/quill.snow.css';

    const tabListNoTitle = [
      { key: "Basic Info", label: "Basic Info >" },
      { key: "Instruction", label: "Instruction >" },
      { key: "Security", label: "Security >" },
      { key: "Exam Type", label: "Exam Type >" },
      { key: "Exam Tools", label: "Exam Tools >" },
      { key: "Exam Questions", label: "Exam Questions >" },
      { key: "Preview", label: "Preview" },
    ];

    const CreateExam = () => {
      const [activeTabKey, setActiveTabKey] = useState("Basic Info");
      const [basicInfoValues, setBasicInfoValues] = useState({
        examName: "",
        duration: "",
        examStartDate: null,
        organization: "org",
        privateAnswer: "",
        privateScore: "",
        instruction: "",
        securityLevel: "low",
        examType: "",
        calculator: false,
        formulasCollection: false,
        uploadMaterials: false,
        material: null

      });

      const [uploading, setUploading] = useState(false); // State to track upload status
      const [uploadProgress, setUploadProgress] = useState(0); // State to track upload progress

      const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
          setBasicInfoValues({ ...basicInfoValues, material: file });
        } else {
          alert("Please select a PDF file.");
        }
      };
      
      const handleUpload = () => {
        setUploading(true);
        let progress = 0;
        const interval = setInterval(() => {
          progress += 10;
          setUploadProgress(progress);
          if (progress >= 100) {
            clearInterval(interval);
            setUploading(false);
            setUploadProgress(0);
          }
        }, 500);
      };


      const handleSave = () => {
        if (activeTabKey === "Basic Info") {
          // Perform validation
          setActiveTabKey("Exam Questions");
        }
        // Add handling for other tabs
      };

      const handleChange = (changedValues) => {
        setBasicInfoValues({ ...basicInfoValues, ...changedValues });
        console.log(basicInfoValues)
      };

      return (
        <div className="flex flex-col gap-4 my-4 ">
          <div className="flex gap-4 items-center ">
            <Link to='/dashboard/exams'>
              <Icon icon="fluent-emoji-high-contrast:left-arrow" className="text-2xl text-primary-500" />
            </Link>
            <h1 className="text-3xl font-bold">Create Exam</h1>
          </div>
          <div>
            <Card
              style={{ width: "100%" }}
              tabList={tabListNoTitle}
              activeTabKey={activeTabKey}
              tabBarExtraContent={
                (activeTabKey === "Exam Questions" &&  <Button onClick={handleSave}>Ai question generator</Button>
                )
              }
              onTabChange={setActiveTabKey}
              tabProps={{ size: "middle" }}
            >
              <Form
                initialValues={basicInfoValues}
                onValuesChange={handleChange}
              >
                {activeTabKey === "Basic Info" && (
                  <>
                    <Form.Item label="Exam Name" name="examName" rules={[{ required: true, message: "Please input the exam name!" }]}>
                      <Input />
                    </Form.Item>
                    <Form.Item label="Duration (minutes)" name="duration" rules={[{ required: true, type: "number", message: "Please input the duration in minutes!" }]}>
                      <InputNumber min={1} />
                    </Form.Item>
                    <Form.Item label="Exam starting date and time" name="examStartDate" rules={[{ required: true, message: "Please enter the Starting date and time for the exam" }]} >
                      <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
                    </Form.Item>
                    <Form.Item label="Private Answer" name="privateAnswer" rules={[{ required: true, message: "Please select whether private answer is allowed!" }]}>
                      <Select>
                        <Select.Option value="yes">Yes</Select.Option>
                        <Select.Option value="no">No</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item label="Private Score" name="privateScore" rules={[{ required: true, message: "Please select whether private score is allowed!" }]}>
                      <Select>
                        <Select.Option value="yes">Yes</Select.Option>
                        <Select.Option value="no">No</Select.Option>
                      </Select>
                    </Form.Item>
                  </>
                )}

                {activeTabKey === "Instruction" && (
                  <Form.Item name="instruction">
                    <p className="mb-4 font-semibold text-left text-blue-900 text-lg">Enter the Instructions for the exam here</p>
                    <ReactQuill 
                    className="mx-32 my-8 h-96"
                      value={basicInfoValues.Instruction} 
                      onChange={(value) => setBasicInfoValues({...basicInfoValues, Instruction: value})} 
                    />
                  </Form.Item>
                )}



    {activeTabKey === "Security" && (
      <div>
                    <p className="mb-4  font-semibold text-blue-900 text-xl">Enter the Security level for the exam here</p>

                  <Form.Item  name="securityLevel" rules={[{ required: true, message: "Please input the exam security type!" }]}>
                  <Radio.Group>
                    <Radio value="high"> High security </Radio>
                    <Radio value="low"> Low Security </Radio>
                  </Radio.Group>
                </Form.Item>
      </div>
                )}


    {activeTabKey === "Exam Type" && (
      <div>
                    <p className="mb-4  font-semibold text-blue-900 text-xl">Enter the Exam type you want to create here</p>

                  <Form.Item  name="examType" rules={[{ required: true, message: "Please input the exam type!" }]}>
                  <Radio.Group>
                    <Radio value="pdfUpload"> Upload the question in pdf </Radio>
                    <Radio value="createOnline"> Create the exam online </Radio>
                    <Radio value="worksheet"> Create worksheet </Radio>
                  </Radio.Group>
                </Form.Item>
      </div>
                )}



  {activeTabKey === "Exam Tools" && (
    <div>
      <p className="mb-4 font-semibold text-blue-900 text-xl">Select the tools that are allowed on the exam here</p>
      <div className="mx-8 my-16 w-full gap-4 flex flex-col justify-center items-center">
  <div className="flex flex-col gap-4">

      <div className="flex gap-4">

        <Switch checked={basicInfoValues.calculator} onClick={() => setBasicInfoValues({ ...basicInfoValues, calculator: !basicInfoValues.calculator })} />
        <span className=" font-semibold ">Calculator</span>
    
      </div>
      <div className="flex gap-4">
        <Switch checked={basicInfoValues.formulasCollection} onClick={() => setBasicInfoValues({ ...basicInfoValues, formulasCollection: !basicInfoValues.formulasCollection })} />
        <span  className=" font-semibold ">Formulas Collection</span>
    </div>
    <div className="flex gap-4">      <Switch checked={basicInfoValues.uploadMaterials} onClick={() => setBasicInfoValues({ ...basicInfoValues, uploadMaterials: !basicInfoValues.uploadMaterials })} />
        <span  className=" font-semibold ">Upload Materials</span>
      </div>
      </div>

      {basicInfoValues.uploadMaterials && (
  <div className="mx-4 mt-4 p-4 border border-gray-300 rounded-lg"> 
    <input type="file" accept="application/pdf" onChange={handleFileChange} />
    {uploading && <p className="text-blue-600 mt-2">Uploading... {uploadProgress}%</p>}
  </div>
)}

{basicInfoValues.uploadMaterials && basicInfoValues.material && (
  <div className="flex flex-col gap-4 items-center">
    <p className="font-semibold"><span className="text-blue-800">File selected: </span> {basicInfoValues.material.name}</p>
    {!uploading && <Button onClick={handleUpload} className="w-5/12">Upload</Button>}
  </div>
)}

      </div>

    </div>
  )}


              </Form>
            </Card>
          </div>
        </div>
      );
    };

    export default CreateExam;
