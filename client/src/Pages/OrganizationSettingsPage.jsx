import { Button, Form, Input, Radio, Tag, Card } from "antd";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateOrganization,
  updateOrganizationLogo,
  switchWorkspace,
} from "../Redux/features/dataActions";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";

const OrganizationSettingsPage = () => {
  const { workspace } = useSelector((state) => state.data);
  const url = false ? "http://localhost:8080" : "http://13.49.21.227:8080";
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fileInputRef = useRef();
  let initialValues = {
    name: workspace.name,
    address: workspace.address,
    description: workspace.description,
    website: workspace.website,
    phone: workspace.phone,
    email: workspace.email,
  };

  const [pictureData, setPictureData] = useState({
    logo: null,
  });

  useEffect(() => {
    if (workspace === null) {
      navigate("dashboard");
      return;
    }
    dispatch(switchWorkspace({ id: workspace._id, field: "" }));
  }, []);

  const handleFileChange = (e) => {
    console.log(e);
    const file = e.target.files[0];
    const maxSizeInBytes = 1024 * 1024;
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

  const handleSubmit = async (values) => {
    console.log(values, workspace);
    const formDataToSend = new FormData();

    // Append form fields to formDataToSend
    formDataToSend.append("data", JSON.stringify({}));

    if (pictureData.logo) {
      formDataToSend.append("logo", pictureData.logo);
      console.log("is it going here");
      dispatch(
        updateOrganizationLogo({
          organizationLogo: formDataToSend,
          id: workspace._id,
        })
      )
        .then((res) => {
          if (res.meta.requestStatus === "fulfilled") {
            setPictureData({ logo: null });
            fileInputRef.current.value = null;
            console.log(pictureData);
            toast.success("Logo uploaded successfully");
          } else {
            toast.error(res.payload.message);
          }
        })
        .catch((error) => {
          console.log(error);
          toast.error(
            "There is some error in the server when uploading picture!"
          );
        });
    }

    dispatch(updateOrganization({ organization: values, id: workspace._id }))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
          initialValues = {
            name: workspace.name,
            address: workspace.address,
            description: workspace.description,
            website: workspace.website,
            phone: workspace.phone,
            email: workspace.email,
          };
          toast.success("Organization updated successfully");
          // navigate("/dashboard/organizations"); // Redirect here
        } else {
          toast.error(res.payload.message);
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("Something is wrong");
      });

    dispatch(switchWorkspace({ id: workspace._id, field: "" }))
      .then((res) => {
        if (res.meta.requestStatus === "fulfilled") {
        } else {
          toast.error("There is an error while switching workspace!", {
            position: "bottom-right",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        toast.error("There is some error in the server! " + error);
      });
  };

  const onFinish = (values) => {
    handleSubmit(values);
  };

  return (
    <div className="flex flex-col gap-4 items-start">
      <h1 className="text-2xl font-bold text-blue-900 text-left">
        Organizations Settings
      </h1>

      <Card style={{ width: "100%" }} className="px-4">
        <Form
          className="w-full"
          form={form}
          onFinish={onFinish}
          initialValues={initialValues}
          layout="vertical"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 ">
            <div>
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
              <div>
                <Form.Item label="Organization Photo" required>
                  <input
                    type="file"
                    accept="image/*"
                    ref={fileInputRef}
                    onChange={handleFileChange} // Update this line
                  />
                </Form.Item>
                <div className="flex items-center gap-2 my-4">
                  <img
                    src={
                      pictureData.logo
                        ? URL.createObjectURL(pictureData.logo)
                        : url + workspace.logo
                    }
                    alt="Uploaded Photo"
                    className="uploaded-photo w-48 h-56"
                  />
                </div>
              </div>
            </div>
            <div>
              <Form.Item label="Email" name={"email"}>
                <Input placeholder="Enter your organziation email" />
              </Form.Item>

              <Form.Item label="Phone Number" name={"phone"}>
                <Input placeholder="Enter your orgnaization phone number" />
              </Form.Item>

              <Form.Item label="Website" name={"website"}>
                <Input placeholder="Enter your organization website" />
              </Form.Item>
            </div>
          </div>

          {/* <Button type="primary" className="px-8 flex gap-2 items-center font-semibold bg-primary-500" onClick={submitExam}><Icon  icon="lucide:save"  className="text-xl text-white" />{" "} Save & Submit</Button> */}
          <div className="w-full flex gap-2 items-center justify-center">
            <Form.Item>
              <Button
                className="px-8 flex gap-2 items-center font-semibold bg-primary-500 w-full"
                type="primary"
                htmlType="submit"
              >
                <Icon icon="lucide:save" className="text-xl text-white" />{" "}
                Update Organization
              </Button>
            </Form.Item>
          </div>
        </Form>
      </Card>
    </div>
  );
};
export default OrganizationSettingsPage;
