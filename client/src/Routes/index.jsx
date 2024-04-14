import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";

// Screens
import Home from "../Screens/Home";
import RegistrationScreen from "../Screens/RegistrationScreen";
import LoginScreen from "../Screens/LoginScreen";
import DashboardScreen from "../Screens/DashboardScreen";
import ProtectedRoutes from '../Screens/ProtectedRoutes'

//Pages
import DashboardPage from "../Pages/DashboardPage";
import ProfilePage from "../Pages/ProfilePage";
import NotFoundPage from "../Pages/NotFoundPage";


const AllRoutes = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
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
        path='register'
        element={<RegistrationScreen />}
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
  );
};

export default AllRoutes
