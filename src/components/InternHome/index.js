import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';


import "./index.css";
import LeftNav from "../Navbar";



const InternProfile = () => {
  const [userDetails, setUserDetails] = useState({});
  const list = [{link:"intern-profile",value:"Home"},{link:"intern-leave",value:"Leave Status"},{link:"intern-view",value:"Schedules"},{link:"apply-leave",value:"Apply Leave"},{link:"apply-request",value:"Leave Request"},{link:"/",value:"Logout"}]

  const navigate = useNavigate();

  useEffect(() => {
    getUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getUserDetails = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
     navigate('/login');
    
      return;
    }

    const url = "http://localhost:3000/intern-details";
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      mode: "cors",
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();
      setUserDetails(data.User);
    } catch (error) {
      console.error("Error fetching user details", error);
    }
  };

  return (
    <div className="intern-profile">
   
    <LeftNav options={list}/>
    <div className="internHome">
      <div className="internDetails">
        <h1 className="InternDetailsHeading">User Details</h1>
        <div className="userDetailsBox">
          <h3>Name :</h3>
          <h3>{userDetails.username}</h3>
        </div>
        <div className="userDetailsBox">
          <h3>Email :</h3>
          <h3>{userDetails.email}</h3>
        </div>
        <div className="userDetailsBox">
          <h3>phoneNumber :</h3>
          <h3>{userDetails.phonenumber}</h3>
        </div>
       
      </div>
    </div>
    </div>
  );
};

export default InternProfile;
