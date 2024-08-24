import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./index.css";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const login = async () => {
    // const details = {
    //   username: username,
    //   password: password,
    // };

    // const url = "http://localhost:3000/admin-login";
    // const options = {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     mode: "cors",
    //     body: JSON.stringify(details),
    // };

    // const response = await fetch(url, options);
    // const data = await response.json();
    // if(data.status === "ok"){
    //     localStorage.setItem('admin', data.token);
    //     navigate('/adminhome');
    // }

    if(username === password){
      localStorage.setItem('admin', "admin")
      navigate("/admin-home")
    }
  };

  return (
    <div className="login">
         <div className="whole">
      <div className="container">
        <div className="title">Login Form</div>
        <form>
          <div className="row">
            <input
              type="text"
              placeholder="Username"
              onChange={onChangeUsername}
              required
            />
          </div>
          <div className="row">
            <input
              type="password"
              placeholder="Password"
              onChange={onChangePassword}
              required
            />
          </div>
          <div className="pass">
            <a href="/">Forgot Password?</a>
          </div>
          <div className="row bottom">
            <input type="button" value="Login" onClick={login} />
          </div>
          <div className="signup-link">
            Not a member? <a href="registration">Signup Now</a>
          </div>
        </form>
      </div>
    </div>
    </div>
   
  );
};

export default AdminLogin;
