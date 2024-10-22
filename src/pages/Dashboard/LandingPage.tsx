import React, { useState } from "react";
import DisplayButton from "@/components/button/DisplayButton";
import Modal from "@/components/modal/Modal";
import CreateTaskForm from "@/components/forms/CreateTaskForm";

const LandingPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);

  const buttons = [
    // {
    //   title: "Create new Board",
    //   path: "/create-board",
    //   onClick: () => navigate("/create-board"),
    // },
    {
      title: "Create new Task",
      // path: "/create-task",
      onClick: toggleModal,
    },
    // {
    //   title: "Join Board",
    //   path: "/join-board",
    //   onClick: () => navigate("/join-board"),
    // },
    // {
    //   title: "Board Templates",
    //   path: "",
    //   onClick: () => navigate("/create-task"),
    // },
  ];

  return (
    <div className="h-full overflow-y-auto custom__scrollbar">
      <h1 className="font-semibold capitalize text-gray-700 mb-4">
        Quick Display
      </h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-2 md:gap-3 gap-4">
        {buttons.map((button) => (
          <DisplayButton
            key={button.title}
            onClick={button.onClick}
            title={button.title}
          />
        ))}
      </div>

      <Modal isOpen={modalOpen} onClose={toggleModal}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold">Board Templates</h2>
          <button
            className="bg-primary text-white py-2 px-4 rounded"
            onClick={toggleModal}
          >
            Close
          </button>
        </div>

        <CreateTaskForm onClose={toggleModal} />
      </Modal>
    </div>
  );
};

export default LandingPage;
