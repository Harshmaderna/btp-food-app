import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Signup from "./pages/signup.jsx";
import Signin from "./pages/Signin.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import useGetCurrentUser from "./Hooks/useGetCurrentUser.jsx";
import { useSelector } from "react-redux";
import Home from "./pages/Home.jsx";
import useGetCity from "./Hooks/useGetCity.jsx";

const App = () => {
   useGetCurrentUser();
   useGetCity();
  const { userData } = useSelector((state) => state.user);

  return (
    <Routes>
      <Route
        path="/signup"
        element={!userData ? <Signup /> : <Navigate to={"/"} />}
      />
      <Route
        path="/signin"
        element={!userData ? <Signin /> : <Navigate to={"/"} />}
      />
      <Route
        path="/forgot-password"
        element={!userData ? <ForgotPassword /> : <Navigate to={"/"} />}
      />
      <Route
        path="/"
        element={userData ? <Home /> : <Navigate to={"/signin"} />}
      />
    </Routes>
  );
};

export default App;
