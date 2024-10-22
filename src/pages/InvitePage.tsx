import React from "react";
import { useNavigate } from "react-router-dom";

const InvitePage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="overflow-hidden h-screen p-3 flex justify-center items-center bg-primary bg-opacity-[12%]">
      <div className="lg:w-[500px] p-3 w-full lg:h-[300px] h-full rounded-md shadow-md bg-white flex flex-col gap-20 items-center  justify-center">
        <h1 className="capitalize text-3xl text-center w-full">
          do you accept the invitation
        </h1>

        <div>
          <div className="flex items-center gap-16">
            <button className="bg-primary text-white py-2 px-4 rounded w-28 h-12 text-xl">
              Yes
            </button>
            <button
              className="w-28 h-12 text-xl bg-transparent border-2 border-primaryGray text-primaryGray py-2 px-4 rounded"
              onClick={handleLogin}
            >
              No
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InvitePage;
