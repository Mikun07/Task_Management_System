import React from "react";
import { useNavigate } from "react-router-dom";
import DisplayButton from "@/components/button/DisplayButton";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const buttons = [
    { title: "Create new Board", path: "" },
    { title: "Create new task", path: "" },
    { title: "Join Board", path: "" },
    { title: "Board Templates", path: "" },
  ];

  return (
    <div className="h-full overflow-y-auto custom__scrollbar">
      <h1 className="font-semibold capitalize text-gray-700 mb-4">
        quick display
      </h1>
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-2 md:gap-3 gap-4">
        {buttons.map((button) => (
          <DisplayButton
            key={button.title}
            onClick={() => navigate(button.path)}
            title={button.title}
          />
        ))}
      </div>
    </div>
  );
};

export default LandingPage;
