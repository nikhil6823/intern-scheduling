import React, { useState, useEffect } from "react";
import "./index.css"; // Import your CSS file for styling
import LeftNav from "../Navbar";

const AdminDashboard = () => {
  const [interns, setInterns] = useState([]);
  const [departments, setDepartments] = useState([]);
  const options = [
    { link: "admin-home", value: "Home" },
    { link: "admin-view", value: "View" },
    { link: "show-department", value: "Show Departments" },
    { link: "update-leave", value: "LeaveRequest" },
    { link: "add-department", value: "Add Department" },
    { link: "/", value: "Logout" },
  ];
  const scheduleDuties = async () => {
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      };
      const response = await fetch(
        "https://intern-scheduling-b.vercel.app/assign-departments",
        options
      ); // Assuming your API endpoint is /intern/leave-requests
      if (response.ok) {
        alert("Duties Scheduled Successfully");
        alert("ok");
      } else {
        alert("Failed to fetch leave requests:", response.statusText);
      }
    } catch (error) {
      alert("Error fetching leave requests:", error.message);
    }
  };
  useEffect(() => {
    const fetchInternsAndDepartments = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        };
        const internsResponse = await fetch(
          "https://intern-scheduling-b.vercel.app/interns",
          options
        );
        //const data = await internsResponse.json()
        if (internsResponse.ok) {
          const internsData = await internsResponse.json();
          //console.log(internsData)
          setInterns(internsData);
        } else {
          console.error("Failed to fetch interns:", internsResponse.statusText);
        }

        // Fetch departments
        const departmentsResponse = await fetch(
          "https://intern-scheduling-b.vercel.app/get-departments",
          options
        );
        if (departmentsResponse.ok) {
          const departmentsData = await departmentsResponse.json();
          setDepartments(departmentsData.departments);
        } else {
          console.error(
            "Failed to fetch departments:",
            departmentsResponse.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchInternsAndDepartments();
  }, []);

  return (
    <div>
      <LeftNav options={options} />
      <div className="admin-dashboard-container">
        {/* Interns count card */}
        <div className="cards">
          <div className="dashboard-card">
            <h3>Interns Count</h3>
            <p>{interns.length}</p>
          </div>

          {/* Departments count card */}
          <div className="dashboard-card">
            <h3>Departments Count</h3>
            <p>{departments.length}</p>
          </div>
        </div>
        <button className="schedule-duty" onClick={scheduleDuties}>
          Schedule Duties
        </button>
        {/* Interns table */}
        <div className="table-container">
          <h2>List of Interns</h2>
          <table className="interns-table">
            <thead>
              <tr>
                <th>Intern Name</th>
                <th>Email</th>
                <th>Phone Number</th>
              </tr>
            </thead>
            <tbody>
              {interns.map((intern, index) => (
                <tr key={index}>
                  <td>{intern.username}</td>
                  <td>{intern.email}</td>
                  <td>{intern.phonenumber}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Departments table */}
        <div className="table-container">
          <h2>List of Departments</h2>
          <table className="departments-table">
            <thead>
              <tr>
                <th>Department Name</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((department, index) => (
                <tr key={index}>
                  <td>{department.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
