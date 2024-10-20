import React from "react";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
import { FiCopy } from "react-icons/fi";

interface DisableInputProps {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  disabled?: boolean; // Optional disabled prop
}

const DisableInput: React.FC<DisableInputProps> = ({
  name,
  label,
  type = "text",
  placeholder,
  disabled = false, // Default value for disabled
}) => {
  // Function to handle copying the placeholder text
  const handleCopyPlaceholder = () => {
    if (placeholder) {
      navigator.clipboard.writeText(placeholder);
      toast.success("Copied to clipboard!");
    }
  };

  return (
    <div className="flex flex-col">
      <label
        htmlFor={name}
        className="text-gray-700 text-[12px] font-semibold mb-1"
      >
        {label}
      </label>
      <div className="relative flex items-center">
        <motion.input
          id={name}
          type={type}
          placeholder={placeholder} // Display placeholder
          disabled={disabled} // Apply disabled state
          className={`p-2 border 
            rounded-[6px] w-full h-10 focus:outline-none focus:border-primary transition-colors duration-300 ease-in-out placeholder:text-xs placeholder:truncate placeholder:w-[80%] ${
              disabled ? "bg-gray-200 cursor-not-allowed" : ""
            }`}
        />
        {disabled && placeholder && (
          <button
            type="button"
            onClick={handleCopyPlaceholder}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 bg-transparent text-primaryGray rounded hover:scale-105 duration-300 transition"
            aria-label="Copy placeholder text"
          >
            <FiCopy />
          </button>
        )}
      </div>
    </div>
  );
};

export default DisableInput;
