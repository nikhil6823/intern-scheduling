import React, { useState } from "react";
import LeftNav from "../Navbar";
import "./index.css";

const ApplyLeave = () => {
  const [leaveDetails, setLeaveDetails] = useState({
    reason: "",
    startDate: "",
    endDate: "",
    nominatedIntern: "", // New state for nominee
  });

  const applyForLeave = async () => {
    const { reason, startDate, endDate, nominatedIntern } = leaveDetails; // Include nominee in the request body
    const token = localStorage.getItem("token");
    const Details = { reason, startDate, endDate, nominatedIntern }; // Include nominee in the request body
    const url = "https://intern-scheduling-b.vercel.app/intern/leave-request";
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(Details),
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      console.log(data);
      alert("Leave Applied");
    } catch (error) {
      alert("Failed To Apply");
      console.error("Error applying for leave:", error);
    }
  };

  const onChangeTextarea = (e) => {
    setLeaveDetails({ ...leaveDetails, reason: e.target.value });
  };

  const setStartDate = (e) => {
    setLeaveDetails({ ...leaveDetails, startDate: e.target.value });
  };

  const setEndDate = (e) => {
    setLeaveDetails({ ...leaveDetails, endDate: e.target.value });
  };

  const setNominee = (e) => {
    // Handle change in nominee input
    setLeaveDetails({ ...leaveDetails, nominatedIntern: e.target.value });
  };

  const list = [
    { link: "intern-profile", value: "Home" },
    { link: "intern-leave", value: "Leave Status" },
    { link: "intern-view", value: "Schedules" },
    { link: "apply-leave", value: "Apply Leave" },
    { link: "apply-request", value: "Leave Request" },
    { link: "/", value: "Logout" },
  ];
  const { reason, startDate, endDate, nominatedIntern } = leaveDetails;

  return (
    <div className="intern-leave">
      <LeftNav options={list} />
      <div className="form">
        <textarea
          placeholder="Enter the Reason..."
          cols={40}
          rows={5}
          onChange={onChangeTextarea}
          value={reason}
        />
        <div className="date-container">
          <label>Start Date</label>
          <input type="date" onChange={setStartDate} value={startDate} />
        </div>
        <div className="date-container">
          <label>End Date</label>
          <input type="date" onChange={setEndDate} value={endDate} />
        </div>
        <div className="date-container">
          {" "}
          {/* Add nominee input field */}
          <label>Nominee</label>
          <input
            type="text"
            placeholder="Enter Nominee's Name"
            onChange={setNominee}
            value={nominatedIntern}
          />
        </div>
        <button className="apply-button" onClick={applyForLeave}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default ApplyLeave;
