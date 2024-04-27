import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Screens
import Home from "../Screens/LandingPageScreens/Home";
import RegistrationScreen from "../Screens/AuthScreens/RegistrationScreen";
import LoginScreen from "../Screens/AuthScreens/LoginScreen";
import ForgotPasswordScreen from "../Screens/AuthScreens/ForgotPasswordScreen";
import OTPScreen from "../Screens/AuthScreens/OTPScreen";
import VerifyEmailScreen from "../Screens/AuthScreens/VerifyEmailScreen";
import ResetPasswordScreen from "../Screens/AuthScreens/ResetPasswordScreen";
import DashboardScreen from "../Screens/DashboardScreens/DashboardScreen";
import ProtectedRoutes from "../Screens/ProtectedRoutes";
import VerifyEmail from "../Screens/AuthScreens/VerifyEmail";


//Pages
import DashboardPage from "../Pages/DashboardPage";
import ProfilePage from "../Pages/ProfilePage";
import NotFoundPage from "../Pages/NotFoundPage";

const AllRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <>
      <Routes>
    
        <Route
          index
          path='/'
          element={<Home />}
        />
        <Route
          path='sign-in'
          element={<LoginScreen />}
        />
        <Route
          path='forgot-password'
          element={<ForgotPasswordScreen />}
        />
        <Route
          path='verify-otp'
          element={<OTPScreen />}
        />
        <Route
          path='verify-email'
          element={<VerifyEmailScreen />}
        />
        <Route
          path='reset-password/*'
          element={<ResetPasswordScreen />}
        />
        <Route
          path='register'
          element={<RegistrationScreen />}
        />

        <Route
          path='activate'
          element={<VerifyEmail />}
        />

        <Route
          path='/dashboard'
          element={
            <ProtectedRoutes isAuthenticated={isAuthenticated}>
              <DashboardScreen />
            </ProtectedRoutes>
          }>
          <Route
            path=''
            element={<DashboardPage />}
          />
          <Route
            path='profile'
            element={<ProfilePage />}
          />
          <Route
            path='*'
            element={<NotFoundPage />}
          />
        </Route>
        <Route
          path='*'
          element={<NotFoundPage />}
        />
      </Routes>

      <ToastContainer position='top-right' />
    </>
  );
};

export default AllRoutes;
