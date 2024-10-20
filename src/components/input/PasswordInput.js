import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
const PasswordInput = ({ name, label, error, }) => {
    const { register, formState } = useFormContext();
    const [showPassword, setShowPassword] = useState(false);
    const isError = Boolean(error);
    const isSuccess = formState.isSubmitted && !isError;
    const iconColor = isError ? "#ef4444" : "#6b7280";
    return (_jsxs("div", { className: "flex flex-col relative", children: [_jsx("label", { htmlFor: name, className: "text-gray-700 text-[12px] font-semibold mb-1", children: label }), _jsxs("div", { className: "relative", children: [_jsx(motion.input, { id: name, type: showPassword ? "text" : "password", ...register(name), className: `p-2 pr-10 border ${isError
                            ? "border-red-500"
                            : isSuccess
                                ? "border-green-500"
                                : "border-[#E6E6E6]"} rounded-[6px] w-full h-10 focus:outline-none focus:border-primary transition-colors duration-300 ease-in-out` }), _jsx("button", { type: "button", onClick: () => setShowPassword(!showPassword), className: "absolute inset-y-0 right-3 flex items-center", children: showPassword ? (_jsx(EyeOff, { size: 20, color: iconColor })) : (_jsx(Eye, { size: 20, color: iconColor })) })] }), error && _jsx("p", { className: "text-red-500 text-xs mt-1", children: error.message })] }));
};
export default PasswordInput;
