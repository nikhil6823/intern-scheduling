import React, { useState, useEffect } from "react";
import "./index.css"; // Import your CSS file for styling
import LeftNav from "../Navbar";
//import { CiCircleAlert } from 'react-icons/ci';

const LeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);

  const list = [
    { link: "intern-profile", value: "Home" },
    { link: "intern-leave", value: "Leave Status" },
    { link: "intern-view", value: "Schedules" },
    { link: "apply-leave", value: "Apply Leave" },
    { link: "apply-request", value: "Leave Request" },
    { link: "/", value: "Logout" },
  ];

  const fetchLeaveRequests = async () => {
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
        "https://intern-scheduling-b.vercel.app/intern/leave-requests",
        options
      ); // Assuming your API endpoint is /intern/leave-requests
      if (response.ok) {
        const data = await response.json();
        console.log(data);

        const pendingLeaveRequests = data.leaveRequests.filter(
          (leaveRequest) => leaveRequest.internStatus === "pending"
        );
        setLeaveRequests(pendingLeaveRequests);
      } else {
        console.error("Failed to fetch leave requests:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching leave requests:", error.message);
    }
  };

  useEffect(() => {
    fetchLeaveRequests();
  }, []);

  const handleApprove = async (leaveRequestId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://intern-scheduling-b.vercel.app/leave-requests/${leaveRequestId}/approve`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Assuming you have a token for authentication
          },
          mode: "cors",
        }
      );
      if (response.ok) {
        alert("Leave request approved successfully");
        fetchLeaveRequests();
      } else {
        alert("Failed to approve leave request:", response.statusText);
      }
    } catch (error) {
      console.error("Error approving leave request:", error.message);
    }
  };
  const handleReject = async (leaveRequestId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://intern-scheduling-b.vercel.app/leave-requests/${leaveRequestId}/reject`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          mode: "cors",
        }
      );

      if (response.ok) {
        alert("Leave request rejected successfully");
        fetchLeaveRequests();
      } else {
        alert("Failed to reject leave request:", response.statusText);
      }
    } catch (error) {
      console.error("Error rejecting leave request:", error.message);
    }
  };

  return (
    <div className="leave-requests-container-main">
      <LeftNav options={list} />
      <div className="leave-requests-container">
        <h2 className="leave-requests-heading">Leave Requests</h2>
        {leaveRequests.length === 0 ? (
          <p>No Leave Requests</p>
        ) : (
          <ul className="leave-requests-list">
            {leaveRequests.map((leaveRequest) => (
              <li key={leaveRequest._id} className="leave-request-item">
                <div>
                  <strong>Reason:</strong> {leaveRequest.reason}
                </div>
                <div>
                  <strong>Start Date:</strong> {leaveRequest.startDate}
                </div>
                <div>
                  <strong>End Date:</strong> {leaveRequest.endDate}
                </div>
                <div>
                  <strong>Nominated Intern:</strong>{" "}
                  {leaveRequest.nominatedIntern}
                </div>
                <div>
                  <button
                    className="approve-button"
                    onClick={() => handleApprove(leaveRequest._id)}
                  >
                    Approve
                  </button>
                  <button
                    className="reject-button"
                    onClick={() => handleReject(leaveRequest._id)}
                  >
                    Reject
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LeaveRequests;
