import { jsx as _jsx } from "react/jsx-runtime";
const TaskCompletedIcon = ({ size = "60", color = "#000000", className = "", }) => {
    return (_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", xmlSpace: "preserve", width: size, height: size, fill: "none", viewBox: "0 0 24 24" // Adjust the viewBox as necessary
        , className: className, children: _jsx("path", { fill: color, d: "M22 21H2V3h2v16h2v-9h4v9h2V6h4v13h2v-5h4v7Z" }) }));
};
export default TaskCompletedIcon;
