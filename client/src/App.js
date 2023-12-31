import React, { Fragment, useEffect, useState } from "react";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Loading from "./components/LoadingComponent/Loading";
import DefaultComponent from "./components/DefaultComponent/DefaultComponent";
import { routes } from "./routes";
import ResetPassword from "./pages/ResetPassword/ResetPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <Loading isLoading={isLoading}>
        <Router>
          <Routes>
            <Route
              path={"/reset-password/:token"}
              element={<ResetPassword />}
            />
            {routes.map((route) => {
              const Page = route.page;
              const Layout = route.isShowHeader ? DefaultComponent : Fragment;
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={
                    <Layout>
                      <Page />
                    </Layout>
                  }
                />
              );
            })}
          </Routes>
        </Router>
      </Loading>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <ToastContainer />
    </div>
  );
}

export default App;
