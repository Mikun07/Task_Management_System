import DisplayButton from "@/components/button/DisplayButton";
import CreateUserFrom from "@/components/forms/CreateUserFrom";
import Modal from "@/components/modal/Modal";
import { fetchAllUser } from "@/redux/features/getAllUserSlice";
import { RootState } from "@/redux/root";
import { AppDispatch } from "@/redux/store";
import React, { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";

const ManageUser = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchAllUser());
  }, [dispatch]);

  const { data: allUser, loading: isLoading } = useSelector(
    (state: RootState) => state?.getAllUser
  );

  console.log(allUser);
  const [modalUserOpen, setModalUserOpen] = useState(false); // State for add task modal

  const toggleUserModal = () => setModalUserOpen(!modalUserOpen);

  return (
    <div>
      <div className="my-1 rounded-md">
        <DisplayButton
          onClick={toggleUserModal}
          title="Create User"
          image={<AiOutlinePlus />}
        />
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

          {/* <CreateUserForm onClose={toggleUserModal} /> */}
          <CreateUserFrom />
        </Modal>
      </div>
    </div>
  );
};

export default ManageUser;
