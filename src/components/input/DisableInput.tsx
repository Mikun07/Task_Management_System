import React from "react";
import { motion } from "framer-motion";

interface DisableInputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean;  // Optional disabled prop
}

const DisableInput: React.FC<DisableInputProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  disabled = false,  // Default value for disabled
}) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        className="text-gray-700 text-[12px] font-semibold mb-1"
      >
        {label}
      </label>
      <motion.input
        id={name}
        type={type}
        placeholder={placeholder}
        disabled={disabled}  // Apply disabled state
        className={`p-2 border 
          rounded-[6px] w-full h-10 focus:outline-none focus:border-primary transition-colors duration-300 ease-in-out placeholder:text-xs ${
          disabled ? "bg-gray-200 cursor-not-allowed" : ""
        }`}
      />
    </div>
  );
};

export default DisableInput;
