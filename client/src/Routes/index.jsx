import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { BrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Screens
import Home from "../Screens/Home";
import RegistrationScreen from "../Screens/RegistrationScreen";
import LoginScreen from "../Screens/LoginScreen";
import ForgotPasswordScreen from "../Screens/ForgotPasswordScreen";
import OTPScreen from "../Screens/OTPScreen";
import VerifyEmailScreen from "../Screens/VerifyEmailScreen";
import ResetPasswordScreen from "../Screens/ResetPasswordScreen";
import DashboardScreen from "../Screens/DashboardScreen";
import ProtectedRoutes from '../Screens/ProtectedRoutes';
import VerifyEmail from "../Screens/VerifyEmail";


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
        element={<ResetPasswordScreen/>}
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