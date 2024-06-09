import { Card, Form, Button, Input, Avatar, Pagination, Image } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import Certification from './Certification';
import { useEffect } from "react";
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

const UserCertificationsPage = () => {
  const [activeTabKey, setActiveTabKey] = useState("All");
  const [certification,setCertification] = useState([]);

  const fetchData = async () => {
    
      try {
        const response = await axios.get(
          `/api/users/me/cert/`
        );

        console.log(response,"*****************************************************************************************")

        setCertification(response.data.data.data);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      
    }
  };

  useEffect(() => {

      fetchData();
  }, []);


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

  if (!certification) {
    return <p>Loading...</p>; // Show a loading indicator while fetching data
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-4 items-center">
        <h1 className="text-2xl font-bold text-blue-900 text-left">
          Your Certifications
        </h1>
      </div>
      <div>
        <Card
          style={{ width: "100%" }}
          tabProps={{ size: "middle" }}
        >
          {activeTabKey === "All" && (
            <>
              <div className="flex flex-wrap gap-4">
                {/* {Certification.map(certification => (
                  <ExamCard key={certification.id} certification={certification} />
                ))} */}

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
         
        </Card>
      </div>
    </div>
  );
};

export default UserCertificationsPage;
