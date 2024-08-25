import React, { useState, useEffect } from "react";
import "./index.css";
import LeftNav from "../Navbar";

const ShowDepartments = () => {
  const [departments, setDepartments] = useState([]);

  const options = [
    { link: "admin-home", value: "Home" },
    { link: "admin-view", value: "View" },
    { link: "show-department", value: "Show Departments" },
    { link: "update-leave", value: "LeaveRequest" },
    { link: "add-department", value: "Add Department" },
    { link: "/", value: "Logout" },
  ];

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          mode: "cors",
        };
        const response = await fetch(
          "https://intern-scheduling-b.vercel.app/get-departments",
          options
        );

        if (response.ok) {
          const data = await response.json();
          setDepartments(data.departments);
        } else {
          console.error("Failed to fetch departments:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching departments:", error.message);
      }
    };

    fetchDepartments();
  }, []);

  return (
    <div>
      <LeftNav options={options} />
      <div className="departments-container">
        <h2>All Departments</h2>
        <div className="department-cards">
          {departments.map((department, index) => (
            <div key={index} className="department-card">
              <h3>{department.name}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowDepartments;
