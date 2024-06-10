import { Card, Input, Pagination } from "antd";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import axios from "axios";

const { Search } = Input;

const UserCertificationsPage = () => {
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [current, setCurrent] = useState(1); // Current page number
  const [totalItems, setTotalItems] = useState(0); // Total number of items

  const fetchData = async (page = 1) => {
    try {
      const response = await axios.get(`/api/users/me/cert/?page=${page}`);
      console.log(response, "*****************************************************************************************");
      setCertifications(response.data.data.data);
      setTotalItems(response.data.data.total); // Set the total number of items
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
      toast.error("Error fetching data");
    }
  };

  useEffect(() => {
    fetchData(current);
  }, [current]);

  const onPaginationChange = (page) => {
    setCurrent(page);
    fetchData(page);
  };

  const ExamCard = ({ _id, certName, organization }) => {
    return (
      <Link to={`/dashboard/certifications/${_id}`} key={_id}>
        <Card
          style={{
            width: 280,
          }}
          className="hover:shadow-md transition-all ease-in-out duration-300 border border-gray-200"
        >
          <div className="flex-col flex items-start gap-2">
            <h3 className="font-bold text-md">{certName}</h3>
            <p className="font-semibold flex gap-2 items-center justify-center">
              {organization?.name}{" "}
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
          Your Certifications
        </h1>
      </div>

      {loading && <p className="font-semibold text-blue-900">Loading...</p>}
      {!loading && (
        <div>
          <Card style={{ width: "100%" }} tabProps={{ size: "middle" }}>
            <>
              <div className="flex flex-wrap gap-2">
                {certifications && certifications.map((certification) => (
                  <ExamCard key={certification._id} {...certification} />
                ))}
                {/* <ExamCard />
         <ExamCard />
         <ExamCard />
         <ExamCard />
         <ExamCard />
         <ExamCard /> */}
              </div>
              
              <Pagination
                className="mt-8"
                current={current}
                total={totalItems}
                onChange={onPaginationChange}
              />
            </>
          </Card>
        </div>
      )}
    </div>
  );
};

export default UserCertificationsPage;
