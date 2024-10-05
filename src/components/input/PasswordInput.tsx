import React, { useState } from "react";
import { useFormContext, FieldError } from "react-hook-form";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";

interface PasswordInputProps {
  name: string;
  label: string;
  error?: FieldError;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  name,
  label,
  error,
}) => {
  const { register, formState } = useFormContext();
  const [showPassword, setShowPassword] = useState(false);
  const isError = Boolean(error);
  const isSuccess = formState.isSubmitted && !isError;
  const iconColor = isError ? "#ef4444" : "#6b7280";

  return (
    <div className="flex flex-col relative">
      <label
        htmlFor={name}
        className="text-gray-700 text-[12px] font-semibold mb-1"
      >
        {label}
      </label>
      <div className="relative">
        <motion.input
          id={name}
          type={showPassword ? "text" : "password"}
          {...register(name)}
          className={`p-2 pr-10 border ${
            isError
              ? "border-red-500"
              : isSuccess
              ? "border-green-500"
              : "border-[#E6E6E6]"
          } rounded-[6px] w-full h-10 focus:outline-none focus:border-primary transition-colors duration-300 ease-in-out`}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute inset-y-0 right-3 flex items-center"
        >
          {showPassword ? (
            <EyeOff size={20} color={iconColor} />
          ) : (
            <Eye size={20} color={iconColor} />
          )}
        </button>
      </div>
      {error && <p className="text-red-500 text-xs mt-1">{error.message}</p>}
    </div>
  );
};

export default PasswordInput;
