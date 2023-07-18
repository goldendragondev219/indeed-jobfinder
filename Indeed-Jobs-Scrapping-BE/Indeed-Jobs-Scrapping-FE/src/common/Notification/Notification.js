import { useState } from "react";
import "./Notification.scss";
import { Modal } from "antd";

function Notification() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Modal
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          Your content has been submitted for processing. Please review
          publishing after 24 Hours.
        </p>
      </Modal>
    </>
  );
}

export default Notification;
