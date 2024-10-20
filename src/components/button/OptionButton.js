import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
const OptionButton = ({ options }) => {
    const [modal, openModal] = useState(false);
    const handleButtonClick = () => {
        openModal(!modal);
    };
    return (_jsxs("div", { className: "relative", children: [_jsx("span", { onClick: handleButtonClick, className: "cursor-pointer", children: _jsx(BsThreeDots, { size: 20 }) }), modal && (_jsx("div", { className: "absolute z-20 w-24 right-0 bg-white bg-opacity-95 border border-primaryGray rounded", children: options.map((option, index) => (_jsx("button", { onClick: option.onClick, className: "w-full text-left text-base hover:bg-gray-200 rounded font-semibold p-1", children: option.label }, index))) }))] }));
};
export default OptionButton;
