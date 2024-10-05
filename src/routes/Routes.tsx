import { lazy } from "react";
import { Navigate } from "react-router-dom";
const LoginPage = lazy(() => import("@/pages/authentication/LoginPage"));
const ForgotPasswordPage = lazy(
  () => import("@/pages/authentication/ForgotPasswordPage")
);
const SignUpPage = lazy(() => import("@/pages/authentication/SignUpPage"));

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

  ForgotPassword: {
    link: "/forgotPassword",
    element: <ForgotPasswordPage />,
    pageName: "Forgot Password Page",
  },

  SignUp: {
    link: "/signUp",
    element: <SignUpPage />,
    pageName: "SignUp Page",
  },
};

export const PUBLIC_ROUTES = [
  routes.landing,
  routes.login,
  routes.ForgotPassword,
  routes.SignUp,
];

export const PRIVATE_ROUTES = [];
