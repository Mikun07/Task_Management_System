import DashboardIcon from "@/assets/svg/DashboardIcon";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import classNames from "classnames";
import { motion } from "framer-motion";
import TaskIcon from "@/assets/svg/TaskIcon";
// import ReportIcon from "@/assets/svg/ReportIcon";
// import TeamIcon from "@/assets/svg/TeamIcon";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { fetchUser } from "@/redux/features/getUserSlice";
import { RootState } from "@/redux/root";
import NewBoardIcon from "@/assets/svg/NewBoardIcon";

interface MenuItem {
  url: string;
  icon: JSX.Element;
  activeIcon: JSX.Element;
  tooltip: string;
}

const Sidebar: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const { data: user, loading: isLoading } = useSelector(
    (state: RootState) => state?.getUser
  );

  const isMenuActive = (menuUrl: string) => location.pathname === menuUrl;

  const mainMenuItems: MenuItem[] = [
    {
      url: "/layout/dashboard",
      icon: <DashboardIcon color="#888888" size="25" />,
      activeIcon: <DashboardIcon size="25" />,
      tooltip: "Dashboard",
    },
    // {
    //   url: "/layout/task",
    //   icon: <TaskIcon color="#888888" size="25" />,
    //   activeIcon: <TaskIcon size="25" />,
    //   tooltip: "Task",
    // },
    {
      url: "/layout/board",
      icon: <NewBoardIcon color="#888888" size="25" />,
      activeIcon: <NewBoardIcon size="25" />,
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
                    "flex px-2 pt-2 bg-primary items-center transition-colors duration-200 ease-in-out relative group cursor-pointer"
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
