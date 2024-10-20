import { jsx as _jsx } from "react/jsx-runtime";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router";
import { useLocation } from "react-router-dom";
import { userToken } from "../config/auth";
const PROTECTED_ROUTES = () => {
    const isLoggedIn = useSelector((state) => state?.login?.isLoggedIn) || !!userToken;
    const location = useLocation();
    if (isLoggedIn) {
        return _jsx(Outlet, {});
    }
    else {
        return _jsx(Navigate, { to: "/login", state: { from: location }, replace: true });
    }
};
export default PROTECTED_ROUTES;
