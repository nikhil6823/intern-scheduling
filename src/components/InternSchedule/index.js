import React, { useState, useEffect } from "react";
import "./index.css";
import LeftNav from "../Navbar";

const ScheduleView = ({ userId }) => {
  const [schedules, setSchedules] = useState([]);
  const list = [
    { link: "intern-profile", value: "Home" },
    { link: "intern-leave", value: "Leave Status" },
    { link: "intern-view", value: "Schedules" },
    { link: "apply-leave", value: "Apply Leave" },
    { link: "apply-request", value: "Leave Request" },
    { link: "/", value: "Logout" },
  ];
  useEffect(() => {
    const fetchUserSchedules = async () => {
      try {
        const token = localStorage.getItem("token");
        const options = {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          mode: "cors",
        };
        const response = await fetch(
          `https://intern-scheduling-b.vercel.app/user/schedules`,
          options
        );
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setSchedules(data.schedules);
        } else {
          console.error("Failed to fetch schedules:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching schedules:", error.message);
      }
    };

    fetchUserSchedules();
  }, [userId]);
  const getShortWeekFormat = (weekNumber) => {
    return `W${weekNumber}`;
  };

  return (
    <div>
      <LeftNav options={list} />
      <div className="schedule-view-container">
        <div className="schedule-table-container">
          <table className="schedule-table">
            <thead>
              <tr>
                <th>Week</th>
                <th>Department</th>
              </tr>
            </thead>
            <tbody>
              {schedules.map((schedule, index) => (
                <tr key={index}>
                  <td>{getShortWeekFormat(schedule.week)}</td>
                  <td>{schedule.departmentId.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ScheduleView;
