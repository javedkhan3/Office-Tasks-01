import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./layout/Layout";
import ProtectedRoute from "./auth/protectedroute/ProtectedRoute";
import Profile from "./Pages/profiles/Profile";
import Settings from "./Pages/settings/Settings";
import UserManagement from "./Pages/user_mangement/User_Management";
import Login from "./auth/login/Login";
import ManageProfile from "./Pages/manage_profile/ManageProfile";
import Register from "./auth/register/Register";
import Logout from "./auth/logout/Logout";
import Dashboard from "./Pages/dash_board/Dashboard";


const App = () => {
  return (
    <Router>
      <Routes>
        {/* ✅ Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ✅ Protected Layout with children */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="logout" element={<Logout />} />
          <Route path="manage-profile" element={<ManageProfile />} />{" "}
          {/* ✅ Fixed path */}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
