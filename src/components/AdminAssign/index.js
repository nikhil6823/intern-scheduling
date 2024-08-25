import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import LeftNav from "../Navbar";

const AdminAssign = () => {
  const [interns, setInterns] = useState([]);
  const [intern, setIntern] = useState("default");
  const [domain, setDomain] = useState("default");
  const options = [
    { link: "admin-view", value: "View" },
    { link: "update-leave", value: "LeaveRequest" },
    { link: "admin-home", value: "Assign" },
    { link: "/", value: "Logout" },
  ];
  const navigate = useNavigate();

  useEffect(() => {
    getAllInterns();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getAllInterns = async () => {
    const token = localStorage.getItem("admin");
    if (!token) {
      navigate("/admin-login");

      return;
    }

    const url = "https://intern-scheduling-b.vercel.app/interns";
    const response = await fetch(url, {
      method: "GET",
      mode: "cors",
    });
    const data = await response.json();
    console.log(data);
    setInterns([...data]);
  };

  const selectIntern = (event) => {
    console.log(event.target.value);
    setIntern(event.target.value);
  };

  const selectDomain = (event) => {
    console.log(event.target.value);
    setDomain(event.target.value);
  };

  const submit = async () => {
    const details = {
      name: intern,
      newDomain: domain,
    };

    const url = "https://intern-scheduling-b.vercel.app/interns/update";
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(details),
      mode: "cors",
    };

    const response = await fetch(url, options);
    const data = await response.json();
    console.log(data);
    alert("Domain Assigned Successfully");
  };

  return (
    <div className="adminHome">
      <LeftNav options={options} />
      <div className="adminHomeContainer">
        <h1 className="adminPortalHeading">Admin Portal</h1>
        <div className="selectCom">
          <select value={intern} onChange={selectIntern}>
            <option value="default" disable>
              Select an Intern
            </option>
            {interns.map((each) => (
              <option key={each._id} value={each.username}>
                {each.username}
              </option>
            ))}
          </select>
          <select value={domain} onChange={selectDomain}>
            <option value="default" disabled>
              Select an option
            </option>
            <option value="cardio">Cardio</option>
            <option value="neuro">Neuro</option>
          </select>
        </div>
        <button className="submitButton" onClick={submit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default AdminAssign;
