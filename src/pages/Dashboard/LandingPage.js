import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DisplayButton from "@/components/button/DisplayButton";
import Modal from "@/components/modal/Modal";
import CreateTaskForm from "@/components/forms/CreateTaskForm";
const LandingPage = () => {
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const toggleModal = () => setModalOpen(!modalOpen);
    const buttons = [
        // {
        //   title: "Create new Board",
        //   path: "/create-board",
        //   onClick: () => navigate("/create-board"),
        // },
        {
            title: "Create new Task",
            // path: "/create-task",
            onClick: toggleModal,
        },
        // {
        //   title: "Join Board",
        //   path: "/join-board",
        //   onClick: () => navigate("/join-board"),
        // },
        // {
        //   title: "Board Templates",
        //   path: "",
        //   onClick: () => navigate("/create-task"),
        // },
    ];
    return (_jsxs("div", { className: "h-full overflow-y-auto custom__scrollbar", children: [_jsx("h1", { className: "font-semibold capitalize text-gray-700 mb-4", children: "Quick Display" }), _jsx("div", { className: "grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-2 md:gap-3 gap-4", children: buttons.map((button) => (_jsx(DisplayButton, { onClick: button.onClick, title: button.title }, button.title))) }), _jsxs(Modal, { isOpen: modalOpen, onClose: toggleModal, children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsx("h2", { className: "text-xl font-semibold", children: "Board Templates" }), _jsx("button", { className: "bg-primary text-white py-2 px-4 rounded", onClick: toggleModal, children: "Close" })] }), _jsx(CreateTaskForm, {})] })] }));
};
export default LandingPage;
