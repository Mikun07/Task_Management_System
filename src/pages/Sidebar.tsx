import DashboardIcon from "@/assets/svg/DashboardIcon";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { motion } from "framer-motion";
import TaskIcon from "@/assets/svg/TaskIcon";
import ReportIcon from "@/assets/svg/ReportIcon";

interface MenuItem {
  url: string;
  icon: JSX.Element;
  activeIcon: JSX.Element;
  tooltip: string;
}

const Sidebar: React.FC = () => {
  const location = useLocation();

  const isMenuActive = (menuUrl: string) => location.pathname === menuUrl;

  const mainMenuItems: MenuItem[] = [
    {
      url: "/layout/dashboard",
      icon: <DashboardIcon color="#888888" size="25" />,
      activeIcon: <DashboardIcon size="25" />,
      tooltip: "Dashboard",
    },
    {
      url: "/layout/task",
      icon: <TaskIcon color="#888888" size="25" />,
      activeIcon: <TaskIcon size="25" />,
      tooltip: "Task",
    },
    {
      url: "/layout/report",
      icon: <ReportIcon color="#888888" size="25" />,
      activeIcon: <ReportIcon size="25" />,
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

  return (
    <>
      <div className="w-56 h-screen p-4 shadow-sm shadow-gray-200 lg:flex flex-col md:flex sm:hidden hidden">
        <div className="flex flex-col flex-grow">
          <div className="flex flex-col gap-4 mt-[80px]">
            {mainMenuItems.map((menuItem, index) => {
              const isActive = isMenuActive(menuItem.url);
              return (
                <motion.div
                  key={index}
                  initial={false}
                  animate={isActive ? "active" : "inactive"}
                  variants={menuVariants}
                  className={classNames(
                    "flex px-2 pt-2 bg-primary items-center transition-colors duration-200 ease-in-out relative group cursor-pointer",
                    // {
                    //   "bg-primary shadow bg-opacity-10": isActive,
                    //   "hover:bg-primary": !isActive,
                    // }
                  )}
                >
                  <Link
                    to={menuItem.url}
                    aria-current={isActive ? "page" : undefined}
                    className="flex items-center gap-3"
                  >
                    <span>
                      {isActive ? menuItem.activeIcon : menuItem.icon}
                    </span>
                    {isActive ? (
                      <span className="text-black capitalize font-semibold">
                        {menuItem.tooltip}
                      </span>
                    ) : (
                      <span className="text-primaryGray capitalize font-semibold">
                        {menuItem.tooltip}
                      </span>
                    )}
                  </Link>
                  {/* <span className="absolute z-20 left-full ml-2 px-2 py-1 text-xs text-white bg-black rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                    {menuItem.tooltip}
                  </span> */}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
