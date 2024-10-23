import { jsx as _jsx } from "react/jsx-runtime";
const DashboardIcon = ({ size = "60", color = "#000000", className = "", }) => {
    return (_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", xmlSpace: "preserve", width: size, height: size, fill: "none", viewBox: "0 0 24 24", className: className, children: _jsx("path", { fill: color, d: "M10 6V0h8v6h-8ZM0 10V0h8v10H0Zm10 8V8h8v10h-8ZM0 18v-6h8v6H0Z" }) }));
};
export default DashboardIcon;
