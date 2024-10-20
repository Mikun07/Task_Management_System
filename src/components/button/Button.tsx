import React from "react";
import { motion } from "framer-motion";

// Import a loading spinner icon (optional)
import { FaSpinner } from "react-icons/fa";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  icon?: React.ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  type = "button",
  icon = null,
  disabled = false,
  loading = false,
  onClick,
  children,
}) => {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading} // Disable when loading
      className={`flex items-center justify-center w-full h-[48px] text-[14.5px] p-3 rounded-[8px] text-white font-medium ${
        disabled || loading
          ? "bg-primaryGray cursor-not-allowed"
          : `bg-primary hover:scale-105 transition duration-300 cursor-pointer`
      }`}
      whileTap={{ scale: 0.95 }}
    >
      {loading ? (
        <FaSpinner className="animate-spin mr-2" /> // Spinner during loading
      ) : (
        icon && <span className="mr-2">{icon}</span>
      )}
      {loading ? "" : children} {/* Text changes when loading */}
    </motion.button>
  );
};

export default Button;
