import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion } from "framer-motion";
// Import a loading spinner icon (optional)
import { FaSpinner } from "react-icons/fa";
const Button = ({ type = "button", icon = null, disabled = false, loading = false, onClick, children, }) => {
    return (_jsxs(motion.button, { type: type, onClick: onClick, disabled: disabled || loading, className: `flex items-center justify-center w-full h-[48px] text-[14.5px] p-3 rounded-[8px] text-white font-medium ${disabled || loading
            ? "bg-primaryGray cursor-not-allowed"
            : `bg-primary hover:scale-105 transition duration-300 cursor-pointer`}`, whileTap: { scale: 0.95 }, children: [loading ? (_jsx(FaSpinner, { className: "animate-spin mr-2" }) // Spinner during loading
            ) : (icon && _jsx("span", { className: "mr-2", children: icon })), loading ? "" : children, " "] }));
};
export default Button;
