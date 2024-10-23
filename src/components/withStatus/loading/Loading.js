import { jsx as _jsx } from "react/jsx-runtime";
import { ThreeCircles } from "react-loader-spinner";
function Loading({ size = "80", className = "flex w-full h-screen items-center justify-center", color = "#007BFF", }) {
    return (_jsx("div", { className: className, children: _jsx(ThreeCircles, { visible: true, height: size, width: size, color: color, ariaLabel: "three-circles-loading", wrapperStyle: {}, wrapperClass: "" }) }));
}
export default Loading;
