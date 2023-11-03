import React, { useState } from "react";
import "./signin.scss";
import Img from "../../assets/login-bg.png";
import { login } from "../../services/api.service";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });
const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSigninData({ ...signinData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(signinData.email, signinData.password);
      localStorage.setItem("token", response.token)
      localStorage.setItem("role" , response.payload.isSeller)
      if(response.payload.isSeller === false){
        navigate("/")
      }
      if(response.payload.isSeller === true){
        navigate("/")
      }
      
      console.log("Login successful:", response);
    } catch (error) {
      console.log("Login failed. Please check your email and password.", error);
    }
  };
  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Sign in</h1>

          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            value={signinData.email}
            onChange={handleChange}
          />

          <label htmlFor="" size="50">
            Password
          </label>
          <input
            name="password"
            type="password"
            placeholder="password"
            value={signinData.password}
            onChange={handleChange}
          />

          <button type="submit">Login</button>
          <p>
            Don't have an account? <a class="link">Sign Up</a>
          </p>
        </div>
        <div className="right">
          <div>
            <img src={Img} className="signup-image" alt="Sample image" />
          </div>
        </div>
      </form>
    </div>
  );
}
