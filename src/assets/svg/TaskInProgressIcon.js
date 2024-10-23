import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
const TaskInProgressIcon = ({ size = "60", color = "#000000", className = "", }) => {
    return (_jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", xmlSpace: "preserve", width: size, height: size, fill: "none", viewBox: "0 0 24 24" // Adjust the viewBox as necessary
        , className: className, children: [_jsx("g", { clipPath: "url(#a)", children: _jsx("path", { stroke: color, d: "M6.5 21a7.5 7.5 0 0 0-.847-3.469A3.196 3.196 0 0 0 5.3 17H.5v.25c.655 1.147 1 2.43 1 3.75H10m5 2.5H0m15.5-14a7.5 7.5 0 0 0-.847-3.469A3.197 3.197 0 0 0 14.3 5.5H9.5v.25c.655 1.147 1 2.43 1 3.75H19m5 2.5h-9m-.5 9.5V19s-1.5-1-4-1c-1.006 0-1.85.162-2.5.355M23.5 10V7.5s-1.5-1-4-1c-1.006 0-1.85.162-2.5.356M10.35 16s-1.6-1-1.6-2.25a1.748 1.748 0 1 1 3.496 0C12.246 15 10.65 16 10.65 16h-.3Zm9-11.5s-1.6-1-1.6-2.25a1.748 1.748 0 0 1 3.496 0c0 1.25-1.596 2.25-1.596 2.25h-.3Z" }) }), _jsx("defs", { children: _jsx("clipPath", { id: "a", children: _jsx("path", { fill: "#fff", d: "M0 0h24v24H0z" }) }) })] }));
};
export default TaskInProgressIcon;
