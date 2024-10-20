import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function Error({ label = "", title = "", ...rest }) {
    // const title = startCase(label);
    return (_jsxs("div", { className: "flex gap-2 flex-col w-full h-screen justify-center items-center", children: [_jsx("div", { children: _jsx("h1", { className: "capitalize font-medium", children: title }) }), _jsx("div", { children: _jsx("button", { onClick: () => window.location.reload(), className: "w-24 h-10 capitalize bg-primaryDark bg-opacity-[14%] text-gray-600 font-medium rounded-lg hover:scale-105 duration-300", children: "Refresh" }) })] }));
}
export default Error;
