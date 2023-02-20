import React, { useState, useEffect } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useLocation } from "react-router-dom";
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
import Welcome from "./pages/welcome/Welcome";
import TodoCollectionPage from "./pages/todo/TodoCollectionPage";
import PlanCollectionPage from "./pages/plan/PlanCollectionPage";
import Auth from "./pages/auth/Auth";
import EmailCode from "./pages/auth/EmailCode";
import ForgetPassword from "./pages/auth/ForgetPassword";
import PasswordCode from "./pages/auth/PasswordCode";
import ChangePassword from "./pages/auth/ChangePassword";
const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<PrivateRoutes />}>
        <Route path="/" errorElement={<Error />} element={<Layout />}>
          <Route index errorElement={<Error />} element={<Home />} />
          <Route path="todo" errorElement={<Error />} element={<Todo />} />
          <Route path="todo/:id" errorElement={<Error />} element={<TodoCollectionPage />} />

          <Route path="plan" errorElement={<Error />} element={<Plan />} />
          <Route path="plan/:id" errorElement={<Error />} element={<PlanCollectionPage />} />

          <Route path="about" errorElement={<Error />} element={<About />} />
          <Route path="profile" errorElement={<Error />} element={<Profile />} />
        </Route>
      </Route>

      <Route path="/auth" errorElement={<Error />} element={<Layout />}>
        <Route index errorElement={<Error />} element={<Welcome />} />
        <Route path="login" errorElement={<Error />} element={<Login />} />
        <Route path="authenticate" errorElement={<Error />} element={<Auth />} />

        <Route path="authenticate/code" errorElement={<Error />} element={<EmailCode />} />

        <Route path="password" errorElement={<Error />} element={<ForgetPassword />} />

        <Route path="password/code" errorElement={<Error />} element={<PasswordCode />} />
        <Route path="password/change" errorElement={<Error />} element={<ChangePassword />} />

        <Route path="register" errorElement={<Error />} element={<Register />} />
      </Route>
      <Route element={<Layout />}>
        <Route path="*" element={<ErrorPage />} />
      </Route>
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

function App() {
  useEffect(() => {
    //check user auth
    store.dispatch(loadUser());
  }, []);
  const { t, i18n } = useTranslation();
  useEffect(() => {
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
