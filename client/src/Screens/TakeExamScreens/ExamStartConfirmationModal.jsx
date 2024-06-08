import { Modal } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";


const ExamStartConfirmationModal = ({handleStartExam}) => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const navigate = useNavigate()

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    handleStartExam();
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    navigate(-1);
  };
  return (
    <>
      <Modal
        title='Get Ready for your Exam'
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}>
        <p>
          This is a high security exam. Make sure to give permission for camera
          and microphone. The exam is about to start.
        </p>
      </Modal>
    </>
  );
};

export default ExamStartConfirmationModal;