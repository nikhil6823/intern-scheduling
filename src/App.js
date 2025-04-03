import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Registration from "./components/Registration";
import InternProfile from "./components/InternHome";
import AdminLogin from "./components/AdminLogIn";
import AdminView from "./components/AdminView";
import ApplyLeave from "./components/ApplyLeave";
import ShowLeaveStatus from "./components/ShowLeaveStatus";
import NomineeRequests from "./components/NomineeLeaveRequest";
import AdminLeaveRequests from "./components/UpdateLeaveState";
import AdminAssign from "./components/AdminAssign";
import AddDepartments from "./components/AddDepartment";
import ShowDepartments from "./components/ShowDepartment";
import AdminDashboard from "./components/AdminHome";
import ScheduleView from "./components/InternSchedule";
import Chatbot from "./components/Chatbot";
import Header from "./components/Header";
import Logout from "./components/Logout";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // ✅ Detect login state when app loads
  useEffect(() => {
    const user = localStorage.getItem("user");
    const admin = localStorage.getItem("admin");
    setIsLoggedIn(!!user || !!admin); // Convert to boolean
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <div>
        <Routes>
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="/intern-profile" element={<InternProfile />} />
          <Route path="/admin-assign" element={<AdminAssign />} />
          <Route path="/admin-view" element={<AdminView />} />
          <Route path="/intern-leave" element={<ShowLeaveStatus />} />
          <Route path="/apply-leave" element={<ApplyLeave />} />
          <Route path="/update-leave" element={<AdminLeaveRequests />} />
          <Route path="/apply-request" element={<NomineeRequests />} />
          <Route path="/add-department" element={<AddDepartments />} />
          <Route path="/show-department" element={<ShowDepartments />} />
          <Route path="/admin-home" element={<AdminDashboard />} />
          <Route path="/intern-view" element={<ScheduleView />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>

        {/* ✅ Show chatbot only if logged in */}
        {isLoggedIn && <Chatbot />}
      </div>
    </BrowserRouter>
  );
};

export default App;
