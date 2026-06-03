import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/LoginSection/LoginPage";
import DashBoard from "../pages/DashBoard/DashBoard";
import ProductDetails from "../pages/DashBoard/Components/ProductDetails/ProductDetails";
import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashBoard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/product/:id"
        element={
          <ProtectedRoute>
            <ProductDetails />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;