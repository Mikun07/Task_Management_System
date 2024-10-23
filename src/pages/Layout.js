import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import { usePageName } from "@/hooks/usePageName";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/redux/features/getUserSlice";
const Layout = () => {
    const pageName = usePageName();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUser());
    }, [dispatch]);
    const { data: user, loading: isLoading } = useSelector((state) => state?.getUser);
    return (_jsxs("div", { className: "flex overflow-hidden w-full h-screen", children: [_jsx(Sidebar, {}), _jsxs("div", { className: "flex flex-col w-full overflow-hidden", children: [_jsx(Header, { pageName: pageName, 
                        // @ts-ignore
                        data: user || null, isLoading: isLoading }), _jsx("div", { className: "overflow-hidden h-screen p-3 bg-primary bg-opacity-[12%]", children: _jsx(Outlet, {}) })] })] }));
};
export default Layout;
