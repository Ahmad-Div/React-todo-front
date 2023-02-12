import React, { useState, useEffect } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import Layout from "./component/layout/Layout";
import About from "./pages/about/About";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Plan from "./pages/plan/Plan";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";
import Todo from "./pages/todo/Todo";
import { useTranslation } from "react-i18next";
import Fallback from "./pages/Fallback";
import ErrorBoundary from "./pages/ErrorBoundary";
import i18n from "./language/i18react";
import store from "./redux/store";
import { Provider } from "react-redux";
import { getCookie } from "./data/cookie";
import setAuthToken from "./data/setAuthToken";
import { loadUser } from "./actions/auth";
import PrivateRoutes from "./routers/PrivateRoutes";
import ErrorPage from "./error/ErrorPage";
import Error from "./error/Error";
const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Layout />}>
          <Route index errorElement={<Error />} element={<Home />} />
          <Route path="todo" errorElement={<Error />} element={<Todo />} />
          <Route path="plan" errorElement={<Error />} element={<Plan />} />
          <Route path="about" errorElement={<Error />} element={<About />} />
          <Route path="profile" errorElement={<Error />} element={<Profile />} />
        </Route>
      </Route>

      <Route path="/auth/login" errorElement={<Error />} element={<Login />} />
      <Route path="/auth/register" errorElement={<Error />} element={<Register />} />
      <Route path="*" element={<ErrorPage />} />
    </>
  )
);

const ErrorBoundaryDetect = ({ children }) => {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    return () => {
      if (hasError) {
        logErrorToMyService();
      }
    };
  }, [hasError]);

  if (hasError) {
    return <ErrorBoundary />;
  }

  return children;
};

if (getCookie("user")) {
  setAuthToken(getCookie("user"));
}

function App() {
  const { t, i18n } = useTranslation();
  useEffect(() => {
    //check user auth
    store.dispatch(loadUser());
    if (i18n.language === "kr" || i18n.language === "ar") {
      document.body.style.direction = "rtl";
      document.body.style.fontFamily = "rabar-39";
    } else {
      document.body.style.direction = "ltr";
      document.body.style.fontFamily = "Poppins";
    }
  }, [i18n.language]);

  const [show, setShow] = useState(false);
  useEffect(() => {
    const interval = setInterval(() => {
      setShow(true);
    }, [500]);
    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <ErrorBoundaryDetect>
      <Provider store={store}>
        <div className="App">{!show ? <Fallback /> : <RouterProvider router={routes} />}</div>
      </Provider>
    </ErrorBoundaryDetect>
  );
}

export default App;
