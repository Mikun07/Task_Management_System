import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
const AvatarButton = ({ data = null, loading = false, signOut, }) => {
    const [modal, openModal] = useState(false);
    const handleButtonClick = () => {
        openModal(!modal);
    };
    return (_jsxs("div", { className: "relative", children: [loading ? (_jsx("div", { className: "w-9 h-9 z-20 rounded-full shadow-md justify-center animate-pulse bg-primaryDark bg-opacity-[8%]" })) : (_jsx("div", { onClick: handleButtonClick, className: `bg-white w-9 h-9 rounded-full relative flex items-center shadow-md justify-center cursor-pointer hover:border-2 hover:border-primaryGray ${modal
                    ? "shadow-none bg-transparent border-2 border-primaryGray scale-105 "
                    : "hover:scale-105 duration-300"}`, children: _jsxs("p", { className: "font-semibold uppercase text-primary lg:text-base text-sm", children: [data?.last_name && data?.first_name
                            ? data.last_name[0] + data.first_name[0]
                            : "?", " "] }) })), modal && (_jsx("div", { className: "absolute z-50 w-56 bg-white bg-opacity-95 border border-dotted border-primaryGray shadow-md shadow-gray-200 top-12 right-0 rounded-lg", children: _jsxs("div", { className: "flex flex-col gap-2 py-2 z-50", children: [_jsxs("div", { className: "flex flex-col gap-1 text-primaryGray border-b border-dashed px-2 pb-2", children: [_jsxs("p", { className: "capitalize lg:text-[12px] text-[9px] font-medium", children: [data?.last_name, " ", data?.first_name] }), _jsx("p", { className: "lowercase lg:text-[12px] text-[9px] font-medium", children: data?.email })] }), _jsx("div", { className: "flex flex-col gap-1 px-2 pb-2", children: _jsx("button", { onClick: signOut, className: "flex items-center w-full gap-2 text-red-500", children: _jsx("p", { className: "flex font-bold", children: "Logout" }) }) })] }) }))] }));
};
export default AvatarButton;
