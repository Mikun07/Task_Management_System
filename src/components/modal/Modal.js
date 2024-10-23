import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { motion, AnimatePresence } from "framer-motion";
const Modal = ({ isOpen, onClose, children }) => {
    return (_jsx(AnimatePresence, { children: isOpen && (_jsxs("div", { className: "fixed inset-0 flex items-center justify-center z-50", children: [_jsx("div", { className: "fixed inset-0 bg-black bg-opacity-50", onClick: onClose }), _jsx(motion.div, { className: "bg-white rounded-lg p-8 z-10 relative", initial: { opacity: 0, scale: 0.9 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.9 }, children: children || _jsx("p", { children: "Default Modal Content" }) })] })) }));
};
export default Modal;
