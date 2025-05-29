import React, { useState } from "react";
import api from "../api";
import { toast } from 'react-toastify';
import "./LoginPage.css"; // If you already have basic CSS

const LoginPage = ({ setUserType, setLoggedInUser }) => {
  const [loginType, setLoginType] = useState("candidate");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const url = loginType === "candidate" ? "/users/login" : "/doctors/login";
      const res = await api.post(url, { email, password });
      setLoggedInUser(res.data[loginType === "candidate" ? "user" : "doctor"]);
      setUserType(loginType);
      localStorage.setItem('user', JSON.stringify(res.data[loginType === "candidate" ? "user" : "doctor"]));
      localStorage.setItem('userType', loginType);
      toast.success("Login successful!");
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="login-page">
      <h2>Login to Happy Health</h2>

      <div className="login-buttons">
        <button
          type="button"
          className={loginType === "candidate" ? "active-btn" : "inactive-btn"}
          onClick={() => setLoginType("candidate")}
        >
          Candidate Login
        </button>
        <button
          type="button"
          className={loginType === "doctor" ? "active-btn" : "inactive-btn"}
          onClick={() => setLoginType("doctor")}
        >
          Doctor Login
        </button>
      </div>

      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input 
          type="password" 
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit" className="login-btn">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;

