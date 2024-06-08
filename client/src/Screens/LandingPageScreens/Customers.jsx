import React from "react";
import { Card, Form, Button, Input, Avatar, Pagination, Badge } from "antd";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const Customers = () => {
  const SupportCard = () => {
    return (
      <Card
        className="hover:shadow-md transition-all ease-in-out duration-300 border border-gray-200 "
        style={{
          width: 380,
          // marginTop: 16,
        }}
        // key={index}
        // loading={loading}
      >
        <div className="flex flex-col gap-4">
          <div className="flex gap-2 items-center">
            <Icon
              icon="healthicons:i-exam-multiple-choice-outline"
              className="text-4xl text-blue-700"
            />
            <h3 className="font-bold text-lg">English exam</h3>
          </div>
          <ul className="flex-col flex items-start gap-2">
            <li className="border-b py-2">
              Lorem, ipsum dolor sit amet consectetur adipisicing
            </li>
            <li className="border-b py-2">
              Lorem, ipsum dolor sit amet consectetur adipisicing
            </li>

            <li className="border-b py-2">
              Lorem, ipsum dolor sit amet consectetur adipisicing
            </li>

            <li className="border-b py-2">
              Lorem, ipsum dolor sit amet consectetur adipisicing
            </li>
          </ul>
        </div>
      </Card>
    );
  };

  return (
    <div className="flex flex-col gap-4 mt-24 mx-auto">
      <div className="flex flex-col items-center justify-center px-auto mb-16">
        <h1 className="text-3xl font-bold text-blue-900 mb-8 text-left">
          How to use Fetena
        </h1>

        <div className="flex flex-wrap gap-4 items-center justify-center px-autol">
          <SupportCard />
          <SupportCard />
          <SupportCard />
          <SupportCard />
          <SupportCard />
          <SupportCard />
        </div>
      </div>
    </div>
  );
};

export default Customers;
