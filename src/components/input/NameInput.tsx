import React from "react";
import { useFormContext, FieldError } from "react-hook-form";
import { motion } from "framer-motion";

interface NameInputProps {
  name: string;
  label: string;
  type?: string;
  error?: FieldError;
  placeholder?: string;
  disabled?: boolean; // Added disabled prop
}

const NameInput: React.FC<NameInputProps> = ({
  name,
  label,
  type = "text",
  error,
  placeholder,
  disabled = false, // Default to false
}) => {
  const { register, formState } = useFormContext();
  const isError = Boolean(error);
  const isSuccess = formState.isSubmitted && !isError;

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
        {...register(name)}
        disabled={disabled} // Apply disabled state here
        className={`p-2 border ${
          isError
            ? "border-red-500"
            : isSuccess
            ? "border-green-500"
            : "border-[#E6E6E6]"
        } rounded-[6px] w-full h-10 focus:outline-none focus:border-primary transition-colors duration-300 ease-in-out placeholder:text-xs ${
          disabled ? "bg-gray-200 cursor-not-allowed" : ""
        }`} // Add disabled styles
      />
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default NameInput;
