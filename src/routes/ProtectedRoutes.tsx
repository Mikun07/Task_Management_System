import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router";
import { useLocation } from "react-router-dom";
import { userToken } from "../config/auth";
import { RootState } from "@/redux/root";


const PROTECTED_ROUTES = () => {
  const isLoggedIn =
    useSelector((state: RootState) => state?.login?.isLoggedIn) || !!userToken;

  const location = useLocation();
  if (isLoggedIn) {
    return <Outlet />;
  } else {
    return <Navigate to={"/login"} state={{ from: location }} replace />;
  }
};

export default PROTECTED_ROUTES;