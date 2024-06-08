import { Card, Form, Button, Input, Avatar, Pagination, Image } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

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

  const ExamCard = () => {
    return (
      <Link to="/dashboard/certifications/hjh">
        <Card
          style={{
            width: 300,
          }}
          className="hover:shadow-md transition-all ease-in-out duration-300 border border-gray-200"
        >
          <div className="flex-col flex items-start gap-2">
            <h3 className="font-bold text-md">English exam certificate</h3>

            <p className="font-semibold flex gap-2 items-center justify-center">
              AASTU{" "}
              <span>
                <Icon
                  icon="gravity-ui:seal-check"
                  className="text-lg text-blue-800"
                />
              </span>
            </p>
          </div>
        </Card>
      </Link>
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
                <ExamCard />
                <ExamCard />
                <ExamCard />
                <ExamCard />
                <ExamCard />
                <ExamCard />
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
