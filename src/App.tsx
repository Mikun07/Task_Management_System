import { Suspense } from "react";
import { PRIVATE_ROUTES, PUBLIC_ROUTES } from "@/routes/Routes";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ErrorBoundary from "@/components/withStatus/error/ErrorBoundary";
import Loading from "@/components/withStatus/loading/Loading";
import PROTECTED_ROUTES from "@/routes/ProtectedRoutes";
import Layout from "./pages/Layout";

function App() {
  return (
    <>
      <Router>
        <Routes>
          {PUBLIC_ROUTES.map(({ link, element }, index) => (
            <Route
              path={link}
              element={
                <ErrorBoundary>
                  <Suspense fallback={<Loading />}>{element}</Suspense>
                </ErrorBoundary>
              }
              key={index}
            />
          ))}

          <Route element={<PROTECTED_ROUTES />}>
            <Route path="admin" element={<Layout />}>
              {PRIVATE_ROUTES.map(({ link, element }, index) => (
                <Route
                  path={link}
                  element={
                    <ErrorBoundary>
                      <Suspense fallback={<Loading />}>{element}</Suspense>
                    </ErrorBoundary>
                  }
                  key={index}
                />
              ))}
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;