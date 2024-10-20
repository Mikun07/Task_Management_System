import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const TableSkeleton = ({ headers, rowCount }) => {
    return (_jsxs("table", { className: "min-w-full divide-y divide-gray-200", children: [_jsx("thead", { className: "bg-primary text-white", children: _jsx("tr", { children: headers.map((header, index) => (_jsx("th", { scope: "col", className: "px-4 py-2 text-left text-xs font-medium uppercase tracking-wider", children: header.header }, index))) }) }), _jsx("tbody", { className: "bg-white divide-y divide-gray-200", children: [...Array(rowCount)].map((_, index) => (_jsx("tr", { children: headers.map((_, columnIndex) => (_jsx("td", { className: `px-4 py-2 whitespace-nowrap ${index % 2 === 0 ? "bg-gray-100" : "bg-white"}`, children: _jsx("div", { className: "flex items-center justify-between", children: _jsx("p", { className: "animate-pulse bg-primaryDark bg-opacity-[8%] h-4 w-48 rounded" }) }) }, columnIndex))) }, index))) })] }));
};
export default TableSkeleton;
