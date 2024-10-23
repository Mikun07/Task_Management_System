import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React from "react";
const TaskCard = React.memo(({ title, subtitle, mainIcon, actionIcons, assignee }) => {
    return (_jsxs("div", { className: "bg-white rounded-md border-[1px] shadow-md p-2 relative", children: [_jsxs("div", { className: "flex justify-between p-2 pb-3 border-b-2", children: [_jsxs("div", { children: [_jsx("h2", { className: "flex capitalize font-semibold", children: title }), _jsx("p", { className: "flex capitalize font-semibold", children: subtitle })] }), _jsx("span", { className: "cursor-pointer", children: mainIcon })] }), _jsxs("div", { className: "flex justify-between p-2 pt-3", children: [_jsx("div", { className: "flex gap-5 cursor-pointer", children: actionIcons.map((icon, index) => (_jsx("span", { children: icon }, index))) }), _jsx("div", { className: "h-6 w-6 bg-primaryGray text-white rounded-full flex items-center justify-center text-xs font-medium", children: _jsx("p", { className: "font-medium", children: assignee }) })] })] }));
});
export default TaskCard;
