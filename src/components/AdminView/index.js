import React, { useState, useEffect } from "react";
import "./index.css"; // Import your CSS file for styling
import LeftNav from "../Navbar";

const AdminView = () => {
  const [schedules, setSchedules] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const options = [
    { link: "admin-home", value: "Home" },
    { link: "admin-view", value: "View" },
    { link: "show-department", value: "Show Departments" },
    { link: "update-leave", value: "LeaveRequest" },
    { link: "add-department", value: "Add Department" },
    { link: "/", value: "Logout" },
  ];

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        const response = await fetch(
          "https://intern-scheduling-b.vercel.app/schedules"
        );
        if (response.ok) {
          const data = await response.json();
          setSchedules(data.schedules);
        } else {
          console.error("Failed to fetch schedules:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching schedules:", error.message);
      }
    };

    fetchSchedules();
  }, []);

  const filteredSchedules = schedules.filter((schedule) => {
    const internName = schedule.internId.username.toLowerCase();
    return internName.includes(searchTerm.toLowerCase());
  });

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <LeftNav options={options} />
      <div className="schedule-table-container">
        <h2>Schedule</h2>
        <input
          type="text"
          placeholder="Search by Intern Name"
          value={searchTerm}
          onChange={handleSearch}
          id="search-input"
        />
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Week</th>
              <th>Intern Name</th>
              <th>Department Name</th>
            </tr>
          </thead>
          <tbody>
            {filteredSchedules.map((schedule, index) => (
              <tr key={index}>
                <td>{schedule.week}</td>
                <td>{schedule.internId.username}</td>
                <td>{schedule.departmentId.name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminView;
