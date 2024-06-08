import { Button, Form, Input, Radio, Tag, Card } from "antd";
import { createOrganization } from "../Redux/features/dataActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getMe } from "../Redux/features/authActions";

const CreateOrganization = () => {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const initialValues = {
    name: "",
    address: "",
    description: "",
    website: "",
    phone: "",
    email: "",
  };

  const [pictureData, setPictureData] = useState({});

  const handleFileChange = (e) => {
    console.log(e);
    const file = e.target.files[0];
    const maxSizeInBytes = 2 * 1024 * 1024; // 10MB
    if (file && file.size > maxSizeInBytes) {
      // File size exceeds the limit
      toast.error("File size is too large. Please select a smaller file.");
      e.target.value = null; // Reset the file input
      return;
    }
    console.log(file, "file");
    setPictureData({ logo: e.target.files[0] });
    // setFileList(e.fileList);
    // console.log(pictureData.logo);
  };

  useEffect(() => {
    console.log(pictureData.logo);
  }, [pictureData.logo]);

  const handleSubmit = async (values) => {
    console.log(values);
    const formDataToSend = new FormData();

    // Append form fields to formDataToSend
    formDataToSend.append(
      "data",
      JSON.stringify({
        name: values.name,
        address: values.address,
        description: values.description,
        website: values.website,
        phone: values.phone,
        email: values.email,
      })
    );

    if (pictureData.logo) {
      formDataToSend.append("logo", pictureData.logo);
    }

    dispatch(createOrganization(formDataToSend))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          form.resetFields();
          toast.success("Organization created successfully");
          navigate("/dashboard/organizations");
          dispatch(getMe());
        } else {
          toast.error(res.payload.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something is wrong");
      });
  };

  const onFinish = (values) => {
    handleSubmit(values);
  };

  return (
    <div className="flex flex-col gap-4 items-start my-4">
      <h1 className="text-2xl font-bold text-blue-900 text-left">
        Create Organization
      </h1>
      <Card style={{ width: "60%" }} className="px-4">
        <Form
          className="w-full"
          form={form}
          onFinish={onFinish}
          initialValues={initialValues}
          layout="vertical"
        >
          <Form.Item
            label="Organization Name"
            required
            name={"name"}
            tooltip="This is a required field"
          >
            <Input placeholder="Enter your organization name" />
          </Form.Item>
          <Form.Item
            label="Description"
            required
            name={"description"}
            tooltip={{
              title: "Write a description about your organization",
            }}
          >
            <Input placeholder="Enter Descirption" />
          </Form.Item>
          <Form.Item label="Address" name={"address"} required>
            <Input placeholder="Enter your address" />
          </Form.Item>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange} // Update this line
            required
          />
          {pictureData.logo && (
            <div className="flex items-center gap-2 mt-2">
              <img
                src={URL.createObjectURL(pictureData.logo)}
                alt="Uploaded Photo"
                className="uploaded-photo w-48 h-56"
              />
            </div>
          )}
          <Form.Item label="Email" name={"email"}>
            <Input placeholder="Enter your organziation email" />
          </Form.Item>
          <Form.Item label="Phone Number" name={"phone"}>
            <Input placeholder="Enter your orgnaization phone number" />
          </Form.Item>
          <Form.Item label="Website" name={"website"}>
            <Input placeholder="Enter your organization website" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create Organization
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};
export default CreateOrganization;
