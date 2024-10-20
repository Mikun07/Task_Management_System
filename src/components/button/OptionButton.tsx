import React, { useState } from "react";
import { BsThreeDots } from "react-icons/bs";

interface Option {
  label: string;
  onClick: () => void;
}

interface OptionButtonProps {
  options: Option[];
}

const OptionButton: React.FC<OptionButtonProps> = ({ options }) => {
  const [modal, openModal] = useState(false);

  const handleButtonClick = () => {
    openModal(!modal);
  };

  return (
    <div className="relative">
      <span onClick={handleButtonClick} className="cursor-pointer">
        <BsThreeDots size={20} />
      </span>

      {modal && (
        <div className="absolute z-20 w-24 right-0 bg-white bg-opacity-95 border border-primaryGray rounded">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={option.onClick}
              className="w-full text-left text-base hover:bg-gray-200 rounded font-semibold p-1"
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default OptionButton;
