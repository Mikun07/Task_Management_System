import React, { useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { usePageName } from "@/hooks/usePageName";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/redux/features/getUserSlice";
import { RootState } from "@/redux/root";
import { AppDispatch } from "@/redux/store";

const Layout = () => {
  const pageName = usePageName();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const { data: user, loading: isLoading } = useSelector(
    (state: RootState) => state?.getUser
  );
  return (
    <>
      <div className="flex overflow-hidden w-full h-screen">
        <Sidebar />
        <div className="flex flex-col w-full overflow-hidden">
          <div>
            <Header pageName={pageName} data={user} isLoading={isLoading} />
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
