import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { usePageName } from "@/hooks/usePageName";

const Layout = () => {
  const pageName = usePageName();
  return (
    <>
      <div className="flex overflow-hidden w-full h-screen">
          <Sidebar />
        <div className="flex flex-col w-full overflow-hidden">
          <div>
            <Header pageName={pageName} />
          </div>
          <div className="overflow-hidden h-screen p-3 bg-primary bg-opacity-[12%]">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
