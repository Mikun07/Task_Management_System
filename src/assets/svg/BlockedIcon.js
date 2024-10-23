import { jsx as _jsx } from "react/jsx-runtime";
const BlockedIcon = ({ size = "60", color = "#000000", className = "", }) => {
    return (_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", xmlSpace: "preserve", width: size, height: size, fill: "none", viewBox: "0 0 24 24", className: className, children: _jsx("path", { fill: color, d: "M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12Zm-3 0a8.96 8.96 0 0 0-1.664-5.215L6.786 19.336A9 9 0 0 0 21 12Zm-3.785-7.336a9 9 0 0 0-12.55 12.55l12.55-12.55Z" }) }));
};
export default BlockedIcon;
