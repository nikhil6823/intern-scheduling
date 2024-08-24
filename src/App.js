import { Component } from "react";
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Registration from "./components/Registration";
import InternProfile from "./components/InternHome";
import AdminLogin from "./components/AdminLogIn"
//import AdminHome from "./components/AdminHome";
import AdminView from "./components/AdminView";
import ApplyLeave from "./components/ApplyLeave";
import ShowLeaveStatus from "./components/ShowLeaveStatus";
//import LeaveRequests from "./components/UpdateLeaveState";
import NomineeRequests from "./components/NomineeLeaveRequest";
import AdminLeaveRequests from "./components/UpdateLeaveState";
import AdminAssign from "./components/AdminAssign";
import AddDepartments from "./components/AddDepartment";
import ShowDepartments from "./components/ShowDepartment";
import AdminDashboard from "./components/AdminHome";
import ScheduleView from "./components/InternSchedule";


//import { Route } from "react-router-dom";


class App extends Component{
  render(){
    return(
      <BrowserRouter>
      <Routes>
        <Route path = "/admin-login" element = {<AdminLogin/>}/>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/registration" element={<Registration/>}/>
        <Route path = "/login" element={<Login/>}/>
        <Route path = "/intern-profile" element = {<InternProfile/>}/>
        <Route path = "/admin-assign" element = {<AdminAssign/>}/>
        <Route path = "/admin-view" element = {  <AdminView/>}/>
        <Route path = "intern-leave" element = {<ShowLeaveStatus/>}/>
        <Route path = "apply-leave" element={<ApplyLeave/>}/>
        <Route path = "update-leave" element = {<AdminLeaveRequests/>}/>
        <Route path = "apply-request" element = {<NomineeRequests/>}/>
        <Route path = "add-department" element={<AddDepartments/>}/>
        <Route path = "show-department" element={<ShowDepartments/>}/>
        <Route path = "admin-home" element = {<AdminDashboard/>}/>
        <Route path = "intern-view" element = {<ScheduleView/>}/>
      </Routes>
      </BrowserRouter>
    )
  }
}

export default App