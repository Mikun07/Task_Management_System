import React from "react";
import { motion } from "framer-motion";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  icon = null,
  disabled = false,
  onClick,
  children,
}) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`flex items-center justify-center w-full h-[48px] text-[14.5px] p-3 rounded-[8px] text-white font-medium ${
        disabled
          ? "bg-primaryGray cursor-not-allowed"
          : `bg-primary hover:scale-105 transition duration-300 cursor-pointer`
      }`}
      whileTap={{ scale: 0.95 }}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </motion.button>
  );
};

export default Button;
