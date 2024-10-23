import {
  jsx as _jsx,
  jsxs as _jsxs,
  Fragment as _Fragment,
} from "react/jsx-runtime";
import { Suspense } from "react";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "@/routes/Routes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorBoundary from "@/components/withStatus/error/ErrorBoundary";
import Loading from "@/components/withStatus/loading/Loading";
import PROTECTED_ROUTES from "@/routes/ProtectedRoutes";
import Layout from "./pages/Layout";
function App() {
  return _jsx(_Fragment, {
    children: _jsx(Router, {
      children: _jsxs(Routes, {
        children: [
          PUBLIC_ROUTES.map(({ link, element }, index) =>
            _jsx(
              Route,
              {
                path: link,
                element: _jsx(ErrorBoundary, {
                  children: _jsx(Suspense, {
                    fallback: _jsx(Loading, {}),
                    children: element,
                  }),
                }),
              },
              index
            )
          ),
          _jsx(Route, {
            element: _jsx(PROTECTED_ROUTES, {}),
            children: _jsx(Route, {
              path: "/layout",
              element: _jsx(Layout, {}),
              children: PRIVATE_ROUTES.map(({ link, element }, index) =>
                _jsx(
                  Route,
                  {
                    path: link,
                    element: _jsx(ErrorBoundary, {
                      children: _jsx(Suspense, {
                        fallback: _jsx(Loading, {}),
                        children: element,
                      }),
                    }),
                  },
                  index
                )
              ),
            }),
          }),
        ],
      }),
    }),
  });
}
export default App;
