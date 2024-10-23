import { lazy } from "react";
import { Navigate } from "react-router-dom";
const LoginPage = lazy(() => import("@/pages/authentication/LoginPage"));
const ForgotPasswordPage = lazy(
  () => import("@/pages/authentication/ForgotPasswordPage")
);
const SignUpPage = lazy(() => import("@/pages/authentication/SignUpPage"));
const DashboardPage = lazy(() => import("@/pages/dashboard/LandingPage"));
const TaskPage = lazy(() => import("@/pages/dashboard/TaskPage"));
const ManageBoardPage = lazy(
  () => import("@/pages/dashboard/board/ManageBoard")
);
const PrivateBoardPage = lazy(
  () => import("@/pages/dashboard/board/PrivateBoard")
);
const InvitePage = lazy(() => import("@/pages/InvitePage"));

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

  task: {
    link: "/layout/task",
    element: <TaskPage />,
    pageName: "Manage Task",
  },

  board: {
    link: "/layout/board",
    element: <ManageBoardPage />,
    pageName: "Manage Board",
  },

  privateBoard: {
    link: "/layout/private",
    element: <PrivateBoardPage />,
    pageName: "Invited Board",
  },

  invite: {
    link: "/invite",
    element: <InvitePage />,
    pageName: "invite",
  },
};

export const PUBLIC_ROUTES = [
  routes?.landing,
  routes?.login,
  routes?.forgotPassword,
  routes?.signUp,
  routes?.invite,
];

export const PRIVATE_ROUTES = [
  routes?.dashboard,
  routes?.task,
  routes?.board,
  routes?.privateBoard,
];
