import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { motion } from "framer-motion";
// import TaskIcon from "@/assets/svg/TaskIcon";
// import ReportIcon from "@/assets/svg/ReportIcon";
// import TeamIcon from "@/assets/svg/TeamIcon";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch } from "@/redux/store";
// import { fetchUser } from "@/redux/features/getUserSlice";
// import { RootState } from "@/redux/root";
import NewBoardIcon from "@/assets/svg/NewBoardIcon";
const Sidebar = () => {
    const location = useLocation();
    // const dispatch = useDispatch<AppDispatch>();
    // useEffect(() => {
    //   dispatch(fetchUser());
    // }, [dispatch]);
    // const { data: user, loading: isLoading } = useSelector(
    //   (state: RootState) => state?.getUser
    // );
    const isMenuActive = (menuUrl) => location.pathname === menuUrl;
    const mainMenuItems = [
        // {
        //   url: "/layout/dashboard",
        //   icon: <DashboardIcon color="#888888" size="25" />,
        //   activeIcon: <DashboardIcon size="25" />,
        //   tooltip: "Dashboard",
        // },
        // {
        //   url: "/layout/task",
        //   icon: <TaskIcon color="#888888" size="25" />,
        //   activeIcon: <TaskIcon size="25" />,
        //   tooltip: "Task",
        // },
        {
            url: "/layout/board",
            icon: _jsx(NewBoardIcon, { color: "#888888", size: "25" }),
            activeIcon: _jsx(NewBoardIcon, { size: "25" }),
            tooltip: "Board",
        },
        // {
        //   url: "/layout/report",
        //   icon: <ReportIcon color="#888888" size="25" />,
        //   activeIcon: <ReportIcon size="25" />,
        //   tooltip: "Report",
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
                        return (_jsx(motion.div, { initial: false, animate: isActive ? "active" : "inactive", variants: menuVariants, className: classNames("flex px-2 pt-2 bg-primary items-center transition-colors duration-200 ease-in-out relative group cursor-pointer"
                            // {
                            //   "bg-primary shadow bg-opacity-10": isActive,
                            //   "hover:bg-primary": !isActive,
                            // }
                            ), children: _jsxs(Link, { to: menuItem.url, "aria-current": isActive ? "page" : undefined, className: "flex items-center gap-3", children: [_jsx("span", { children: isActive ? menuItem.activeIcon : menuItem.icon }), isActive ? (_jsx("span", { className: "text-black capitalize font-semibold", children: menuItem.tooltip })) : (_jsx("span", { className: "text-primaryGray capitalize font-semibold", children: menuItem.tooltip }))] }) }, index));
                    }) }) }) }) }));
};
export default Sidebar;
