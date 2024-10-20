import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import DashboardIcon from "@/assets/svg/DashboardIcon";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { motion } from "framer-motion";
import TaskIcon from "@/assets/svg/TaskIcon";
import ReportIcon from "@/assets/svg/ReportIcon";
const Sidebar = () => {
    const location = useLocation();
    const isMenuActive = (menuUrl) => location.pathname === menuUrl;
    const mainMenuItems = [
        {
            url: "/layout/dashboard",
            icon: _jsx(DashboardIcon, { color: "#888888", size: "25" }),
            activeIcon: _jsx(DashboardIcon, { size: "25" }),
            tooltip: "Dashboard",
        },
        {
            url: "/layout/task",
            icon: _jsx(TaskIcon, { color: "#888888", size: "25" }),
            activeIcon: _jsx(TaskIcon, { size: "25" }),
            tooltip: "Task",
        },
        {
            url: "/layout/report",
            icon: _jsx(ReportIcon, { color: "#888888", size: "25" }),
            activeIcon: _jsx(ReportIcon, { size: "25" }),
            tooltip: "Report",
        },
        // {
        //   url: "",
        //   icon: "",
        //   activeIcon: "",
        //   tooltip: "",
        // },
    ];
    const menuVariants = {
        active: {
            scale: 1.1,
            backgroundColor: "rgba(113, 113, 113, 0.1)",
            transition: { duration: 0.3 },
        },
        inactive: {
            scale: 1,
            backgroundColor: "transparent",
            transition: { duration: 0.3 },
        },
    };
    return (_jsx(_Fragment, { children: _jsx("div", { className: "w-56 h-screen p-4 shadow-sm shadow-gray-200 lg:flex flex-col md:flex sm:hidden hidden", children: _jsx("div", { className: "flex flex-col flex-grow", children: _jsx("div", { className: "flex flex-col gap-4 mt-[80px]", children: mainMenuItems.map((menuItem, index) => {
                        const isActive = isMenuActive(menuItem.url);
                        return (_jsx(motion.div, { initial: false, animate: isActive ? "active" : "inactive", variants: menuVariants, className: classNames("flex px-2 pt-2 bg-primary items-center transition-colors duration-200 ease-in-out relative group cursor-pointer"), children: _jsxs(Link, { to: menuItem.url, "aria-current": isActive ? "page" : undefined, className: "flex items-center gap-3", children: [_jsx("span", { children: isActive ? menuItem.activeIcon : menuItem.icon }), isActive ? (_jsx("span", { className: "text-black capitalize font-semibold", children: menuItem.tooltip })) : (_jsx("span", { className: "text-primaryGray capitalize font-semibold", children: menuItem.tooltip }))] }) }, index));
                    }) }) }) }) }));
};
export default Sidebar;
