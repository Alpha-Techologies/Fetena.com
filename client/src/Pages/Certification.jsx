import React, { useEffect, useState } from "react";
import { Card, Form, Button, Input, Avatar, Pagination, Image } from "antd";
import { Link, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import fetena_logoo from "../assets/fetena_logo_primary.png";
import signature from "../assets/sign.png";
import fetena_icon from "../assets/Frame.svg";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import axios from "axios";

const Certification = (
  {
    // examinee = "Yosef Lakew",
    // exam = "Data Analysis with Python",
    // examDate = "March 21, 2024",
    // score = "90%",
    // org = "AASTU",
  }
) => {
  const printableContentRef = useRef(null);
  // extract the params from the page
  const params = useParams();
  const { id } = params;
  const [cert, setCert] = useState({});

  useEffect(() => {
    // fetch the data from the server
    // fetch the certificate from the database using the id using axois
    console.log("the error liees here");
    const fetchCertificate = async () => {
      try {
        const response = await axios.get(`/api/cert/${id}`);
        setCert(response.data.data.data[0]);
      } catch (error) {
        console.log("error fetching the certificate", error);
      }
    };

    fetchCertificate();
  }, []);

  const handleSaveAsPdf = async () => {
    const element = printableContentRef.current;
    const canvas = await html2canvas(element);
    const data = canvas.toDataURL("image/png");

    const pdf = new jsPDF({
      orientation: "portrait",
      format: "a4",
    });

    const imgProps = pdf.getImageProperties(data);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("certificate.pdf");
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between gap-4 items-center">
        <div className="flex gap-4 items-center ">
          <Link to="/dashboard/usercertifications">
            <Icon
              icon="fluent-emoji-high-contrast:left-arrow"
              className="text-2xl text-primary-500"
            />
          </Link>
          <h1 className="text-2xl font-bold text-blue-900 text-left">
            Certificate
          </h1>
        </div>

        <Button
          onClick={handleSaveAsPdf}
          className="flex items-center gap-2 bg-primary-500 hover:bg-primary-700 text-white font-bold py-2 px-16 rounded"
        >
          Save as PDF
        </Button>
      </div>
      <div className="flex flex-col justify-center" ref={printableContentRef}>
        <div className="flex flex-col items-center  pb-2.5 w-full border-blue-900 border-solid border-[11px]">
          <div className="flex justify-center items-center self-stretch py-5 w-full bg-blue-900 ">
            <img
              loading="lazy"
              src={fetena_logoo}
              className="max-w-full aspect-[2.7] w-[171px]"
            />
          </div>
          <div className="mt-8 text-2xl leading-7 text-center text-slate-900">
            This certifies that
          </div>
          <div className="mt-4 text-5xl font-bold text-center text-blue-900 leading-[49.5px] max-md:text-4xl">
            {cert.user?.fullName}
          </div>
          <div className="mt-7 text-2xl leading-7 text-center text-slate-900">
            successfully taken the
          </div>
          <div className="mt-6 text-5xl font-bold text-center text-blue-900 leading-[49.5px] max-md:max-w-full max-md:text-4xl">
            {cert.exam?.examName}
          </div>
          <div className="mt-5 text-2xl leading-7 text-center text-slate-900">
            Exam from{" "}
            <span className="text-blue-800 font-semibold">
              {cert.organizationName}
            </span>{" "}
            organization with a score of{" "}
            <span className="text-blue-800 font-semibold">{cert.score}</span> on{" "}
            <span className="text-blue-800 font-semibold">
              {new Date(cert.issueDate).toLocaleString()}
            </span>
          </div>
          <div className="flex gap-5 mt-8 w-full max-w-[1074px] max-md:flex-wrap max-md:max-w-full">
            <div className="flex-auto max-md:max-w-full">
              <div className="flex gap-5 max-md:flex-col max-md:gap-0">
                <div className="flex flex-col w-[17%] max-md:ml-0 max-md:w-full">
                  <div className="shrink-0 self-stretch m-auto  h-[150px] w-[150px] max-md:mt-10" />
                </div>
                <div className="flex flex-col ml-5 w-[83%] max-md:ml-0 max-md:w-full">
                  <div className="flex flex-col grow items-center leading-7 text-center text-slate-900 max-md:mt-2 max-md:max-w-full">
                    <img
                      loading="lazy"
                      srcSet={signature}
                      className="z-10 max-w-full aspect-[1.82] w-[247px]"
                    />
                    <div className="text-xl font-bold w-[287px] mb-8">
                      Yosef Lakew
                      <br />
                      <span className="text-lg ">
                        Executive Director, Fetena.com
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <img
              loading="lazy"
              srcSet={fetena_icon}
              className="shrink-0 my-auto max-w-full aspect-[0.67] w-[120px]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Certification;
