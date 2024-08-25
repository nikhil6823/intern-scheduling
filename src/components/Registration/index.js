import React, { useState } from "react";
//import { useHistory } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./index.css";

const Registration = () => {
  const [username, setUsername] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //const history = useHistory();

  const navigate = useNavigate();

  const onChangeName = (event) => {
    setUsername(event.target.value);
  };

  const onChangeContact = (event) => {
    setPhoneNumber(event.target.value);
  };

  const onChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const submit = async () => {
    const internDetails = {
      email,
      username,
      password,
      phonenumber,
    };

    const url = "https://intern-scheduling-b.vercel.app/register";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(internDetails),
    };

    const response = await fetch(url, options);
    const data = await response.json();

    console.log(data.message);
    if (data.message === "Intern registration successful.") {
      navigate("/login");
    }
  };

  return (
    <div className="body">
      <div className="registerContainer">
        <h1>Register</h1>

        <label htmlFor="name">
          <b>Name</b>
        </label>
        <input
          type="text"
          placeholder="Enter Your Name"
          name="name"
          value={username}
          onChange={onChangeName}
          required
        />
        <br />

        <label htmlFor="number">
          <b>Contact No.</b>
        </label>
        <input
          type="text"
          placeholder="Enter Your Contact No."
          name="number"
          value={phonenumber}
          onChange={onChangeContact}
          required
        />
        <br />

        <label htmlFor="email">
          <b>Email</b>
        </label>
        <input
          type="text"
          placeholder="Enter Your E-mail"
          name="email"
          value={email}
          onChange={onChangeEmail}
          required
        />
        <br />

        <label htmlFor="pwd">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Your Password"
          name="psw"
          value={password}
          onChange={onChangePassword}
          required
        />
        <br />

        <button onClick={submit} className="registerbutton">
          Register
        </button>
        <p>
          Already have an account? <a href="login">Sign in</a>.
        </p>
      </div>
    </div>
  );
};

export default Registration;
