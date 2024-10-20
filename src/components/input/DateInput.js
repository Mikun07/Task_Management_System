import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useFormContext } from "react-hook-form";
import { motion } from "framer-motion";
const DateInput = ({ name, label, error, placeholder = "Select a date", }) => {
    const { register, formState } = useFormContext();
    const isError = Boolean(error);
    const isSuccess = formState.isSubmitted && !isError;
    return (_jsxs("div", { className: "flex flex-col", children: [_jsx("label", { htmlFor: name, className: "text-gray-700 text-[12px] font-semibold mb-1", children: label }), _jsx(motion.input, { id: name, type: "date" // Setting input type as 'date'
                , placeholder: placeholder, ...register(name), className: `p-2 border ${isError
                    ? "border-red-500"
                    : isSuccess
                        ? "border-green-500"
                        : "border-[#E6E6E6]"} rounded-[6px] w-full h-10 focus:outline-none focus:border-primary transition-colors duration-300 ease-in-out placeholder:text-xs` }), error && _jsx("p", { className: "text-red-500 text-xs mt-1", children: error.message })] }));
};
export default DateInput;
