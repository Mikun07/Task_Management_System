import React, { useEffect, useState } from "react";
import DisplayButton from "@/components/button/DisplayButton";
import Modal from "@/components/modal/Modal";
import CreateTaskForm from "@/components/forms/CreateTaskForm";
import CreateUserFrom from "@/components/forms/CreateUserFrom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchUser } from "@/redux/features/getUserSlice";
import { RootState } from "@/redux/root";

interface User {
  email: string;
  first_name: string;
  id: number;
  last_name: string;
  phone_number: string;
  role: string;
  username: string;
}

const LandingPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalUserOpen, setModalUserOpen] = useState(false);

  const toggleModal = () => setModalOpen(!modalOpen);
  const toggleUserModal = () => setModalUserOpen(!modalUserOpen);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const { data: user } = useSelector((state: RootState) => state.getUser) as {
    data: User;
  };

  const getButtons = () => {
    const buttons = [];

    if (user?.role === "admin") {
      buttons.push({
        title: "Create new user",
        path: "/create-board",
        onClick: toggleUserModal,
      });
    }

    buttons.push({
      title: "Create new Task",
      onClick: toggleModal,
    });

    return buttons;
  };

  const buttonsToDisplay = getButtons();

  return (
    <div className="h-full overflow-y-auto custom__scrollbar">
      <h1 className="font-semibold capitalize text-gray-700 mb-4">
        Quick Display
      </h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-2 md:gap-3 gap-4">
        {buttonsToDisplay.map((button) => (
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

      <Modal isOpen={modalUserOpen} onClose={toggleUserModal}>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-semibold">Create User</h2>
          <button
            className="bg-primary text-white py-2 px-4 rounded"
            onClick={toggleUserModal}
          >
            Close
          </button>
        </div>

        <CreateUserFrom onClose={toggleUserModal} />
      </Modal>
    </div>
  );
};

export default LandingPage;