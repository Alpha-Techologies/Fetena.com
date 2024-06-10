import { Card, Form, Button, Input, Avatar, Pagination, Image } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import axios from "axios";

const { Search } = Input;
const { Meta } = Card;

const tabListNoTitle = [
  {
    key: "All",
    label: "All",
  },
  {
    key: "Featured",
    label: "Featured",
  },
  {
    key: "Your Certifications",
    label: "Your Certifications",
  },
];

const CertificationsPage = () => {
  const [activeTabKey, setActiveTabKey] = useState("All");
  const [basicInfoForm] = Form.useForm(); // Define basicInfoForm here
  const [examDetail, setExamDetail] = useState([]);
  // get the workspace
  const { workspace } = useSelector((state) => state.data);

  console.log(workspace, "the workspace");

  useEffect(() => {
    // Fetch data here
    const fetchCertificationsExam = async () => {
      try {
        // Fetch certifications from the server
        const response = await axios.get(
          `/api/exams/my-exam/${workspace?._id}`,
          {
            hasCertificate: true,
          }
        );

        const examData = response.data.data.data.map((exam) => {
          return {
            id: exam._id,
            name: exam.examName,
            organization: exam.organization.name,
          };
        });

        setExamDetail(examData);
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Error fetching data");
      }
    };
    fetchCertificationsExam();
  }, []);

  const onTabChange = (key) => {
    if (activeTabKey === "All" && key !== "All") {
      basicInfoForm
        .validateFields()
        .then(() => {
          setActiveTabKey(key);
        })
        .catch(() => {
          toast.error("Please complete all required fields in Basic Info");
        });
    } else if (activeTabKey === "Featured" && key !== "Featured") {
      setActiveTabKey(key);
    } else {
      setActiveTabKey(key);
    }
  };

  const ExamCard = ({ id, name, organization }) => {
    return (
      // <Link to={`/dashboard/certifications/${id}`}>
        <Card
          style={{
            width: 300,
          }}
          className="hover:shadow-md transition-all ease-in-out duration-300 border border-gray-200"
        >
          <div className="flex-col flex items-start gap-2">
            <h3 className="font-bold text-md">{name}</h3>

            <p className="font-semibold flex gap-2 items-center justify-center">
              {organization}{" "}
              <span>
                <Icon
                  icon="gravity-ui:seal-check"
                  className="text-lg text-blue-800"
                />
              </span>
            </p>
          </div>
        </Card>
      // </Link>
    );
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-4 items-center">
        <h1 className="text-2xl font-bold text-blue-900 text-left">
          Certifications
        </h1>
      </div>
      <div>
        <Card
          style={{ width: "100%" }}
          // tabList={tabListNoTitle}
          // activeTabKey={activeTabKey}
          onTabChange={onTabChange}
          tabProps={{ size: "middle" }}
        >
          {activeTabKey === "All" && (
            <>
              <div className="flex flex-wrap gap-4">
                {
                  // Display ExamCard for each exam
                  examDetail.map((exam) => (
                    <ExamCard key={exam.id} {...exam} />
                  ))
                }
              </div>
              <Pagination current="1" total="5" className="mt-8" />
            </>
          )}
          {activeTabKey === "Featured" && <p>Featured</p>}
          {activeTabKey === "Your Certifications" && <p>Your Certifications</p>}
        </Card>
      </div>
    </div>
  );
};

export default CertificationsPage;
