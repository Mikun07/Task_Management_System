import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { BsThreeDotsVertical } from "react-icons/bs";
const BoardCard = ({ title, onClick }) => {
    return (_jsxs("div", { className: "flex bg-white w-[250px] h-[135px] p-2 rounded-md shadow-sm cursor-pointer flex-col justify-between", children: [_jsx("div", { children: _jsxs("h1", { className: "capitalize", children: [title, " Board"] }) }), _jsx("div", { className: "flex w-full p-1 justify-end", children: _jsx("button", { onClick: onClick, className: "text-primaryGray", children: _jsx(BsThreeDotsVertical, { size: 25 }) }) })] }));
};
export default BoardCard;
