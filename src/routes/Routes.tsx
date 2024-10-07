import { lazy } from "react";
import { Navigate } from "react-router-dom";
const LoginPage = lazy(() => import("@/pages/authentication/LoginPage"));
const ForgotPasswordPage = lazy(
  () => import("@/pages/authentication/ForgotPasswordPage")
);
const SignUpPage = lazy(() => import("@/pages/authentication/SignUpPage"));
const DashboardPage = lazy(() => import("@/pages/Dashboard/LandingPage"));

const routes = {
  landing: {
    link: "/",
    element: <Navigate to={"/login"} />,
    pageName: "Landing Page",
  },

  login: {
    link: "/login",
    element: <LoginPage />,
    pageName: "Login Page",
  },

  forgotPassword: {
    link: "/forgotPassword",
    element: <ForgotPasswordPage />,
    pageName: "Forgot Password Page",
  },

  signUp: {
    link: "/signUp",
    element: <SignUpPage />,
    pageName: "SignUp Page",
  },

  dashboard: {
    link: "/layout/dashboard",
    element: <DashboardPage />,
    pageName: "Dashboard",
  },
};

export const PUBLIC_ROUTES = [
  routes.landing,
  routes.login,
  routes.forgotPassword,
  routes.signUp,
];

export const PRIVATE_ROUTES = [routes.dashboard];
