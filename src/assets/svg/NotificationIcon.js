import { jsx as _jsx } from "react/jsx-runtime";
const NotificationIcon = ({ size = "60", color = "#000000", className = "", }) => {
    return (_jsx("svg", { xmlns: "http://www.w3.org/2000/svg", xmlSpace: "preserve", width: size, height: size, fill: "none", viewBox: "0 0 25 25" // Adjust the viewBox as necessary
        , className: className, children: _jsx("path", { fill: color, d: "M12.5 0C9.904 0 7.414.845 5.578 2.35 3.742 3.854 2.71 5.895 2.71 8.022v4.044a.98.98 0 0 1-.147.512L.162 16.512a1.073 1.073 0 0 0-.16.62c.011.215.09.424.228.607s.33.334.56.438c.228.105.486.16.749.16H23.46c.263 0 .52-.055.75-.16a1.45 1.45 0 0 0 .56-.438c.137-.183.216-.392.227-.606a1.073 1.073 0 0 0-.16-.62l-2.4-3.935a.981.981 0 0 1-.148-.512V8.022c0-2.127-1.032-4.168-2.868-5.672C17.586.845 15.096 0 12.5 0Zm0 21.775c-.868 0-1.715-.22-2.424-.63-.708-.41-1.244-.991-1.534-1.662h7.916c-.29.67-.826 1.251-1.534 1.662-.71.41-1.556.63-2.424.63Z" }) }));
};
export default NotificationIcon;
