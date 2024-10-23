import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from "react";
import DisplayButton from "@/components/button/DisplayButton";
import Modal from "@/components/modal/Modal";
import CreateTaskForm from "@/components/forms/CreateTaskForm";
import CreateUserFrom from "@/components/forms/CreateUserFrom";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/redux/features/getUserSlice";
const LandingPage = () => {
    const dispatch = useDispatch();
    const [modalOpen, setModalOpen] = useState(false);
    const [modalUserOpen, setModalUserOpen] = useState(false);
    const toggleModal = () => setModalOpen(!modalOpen);
    const toggleUserModal = () => setModalUserOpen(!modalUserOpen);
    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);
    const { data: user } = useSelector((state) => state.getUser);
    const getButtons = () => {
        const buttons = [];
        if (user?.role === "admin") {
            buttons.push({
                title: "Create new user",
                // path: "/create-board",
                onClick: toggleUserModal,
            });
        }
        buttons.push({
            title: "Create new Task",
            onClick: toggleModal,
        });
        return buttons;
    };
    const buttonsToDisplay = getButtons();
    return (_jsxs("div", { className: "h-full overflow-y-auto custom__scrollbar", children: [_jsx("h1", { className: "font-semibold capitalize text-gray-700 mb-4", children: "Quick Display" }), _jsx("div", { className: "grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 lg:gap-2 md:gap-3 gap-4", children: buttonsToDisplay.map((button) => (_jsx(DisplayButton, { onClick: button.onClick, title: button.title }, button.title))) }), _jsxs(Modal, { isOpen: modalOpen, onClose: toggleModal, children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsx("h2", { className: "text-xl font-semibold", children: "Board Templates" }), _jsx("button", { className: "bg-primary text-white py-2 px-4 rounded", onClick: toggleModal, children: "Close" })] }), _jsx(CreateTaskForm, { onClose: toggleModal })] }), _jsxs(Modal, { isOpen: modalUserOpen, onClose: toggleUserModal, children: [_jsxs("div", { className: "flex items-center justify-between mb-8", children: [_jsx("h2", { className: "text-xl font-semibold", children: "Create User" }), _jsx("button", { className: "bg-primary text-white py-2 px-4 rounded", onClick: toggleUserModal, children: "Close" })] }), _jsx(CreateUserFrom, { onClose: toggleUserModal })] })] }));
};
export default LandingPage;
