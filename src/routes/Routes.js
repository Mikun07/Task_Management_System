import { jsx as _jsx } from "react/jsx-runtime";
import { lazy } from "react";
import { Navigate } from "react-router-dom";
const LoginPage = lazy(() => import("@/pages/authentication/LoginPage"));
const ForgotPasswordPage = lazy(() => import("@/pages/authentication/ForgotPasswordPage"));
const SignUpPage = lazy(() => import("@/pages/authentication/SignUpPage"));
const DashboardPage = lazy(() => import("@/pages/Dashboard/LandingPage"));
const TaskPage = lazy(() => import("@/pages/Dashboard/TaskPage"));
const routes = {
    landing: {
        link: "/",
        element: _jsx(Navigate, { to: "/login" }),
        pageName: "Landing Page",
    },
    login: {
        link: "/login",
        element: _jsx(LoginPage, {}),
        pageName: "Login Page",
    },
    forgotPassword: {
        link: "/forgotPassword",
        element: _jsx(ForgotPasswordPage, {}),
        pageName: "Forgot Password Page",
    },
    signUp: {
        link: "/signUp",
        element: _jsx(SignUpPage, {}),
        pageName: "SignUp Page",
    },
    dashboard: {
        link: "/layout/dashboard",
        element: _jsx(DashboardPage, {}),
        pageName: "Dashboard",
    },
    task: {
        link: "/layout/task",
        element: _jsx(TaskPage, {}),
        pageName: "Manage Task",
    },
};
export const PUBLIC_ROUTES = [
    routes?.landing,
    routes?.login,
    routes?.forgotPassword,
    routes?.signUp,
];
export const PRIVATE_ROUTES = [routes?.dashboard, routes?.task];
