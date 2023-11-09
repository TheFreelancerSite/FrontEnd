import React, { useState } from "react";
import "./signin.scss";
import Img from "../../assets/login-bg.png";
import toast, { Toaster } from "react-hot-toast";
import { login } from "../../services/api.service";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../../components/feautures/user";
export default function Signin() {
  const [signinData, setSigninData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSigninData({ ...signinData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(signinData.email, signinData.password);
      localStorage.setItem("token", response.token);
      localStorage.setItem("role", response.payload.isSeller);
      localStorage.setItem("imgUrl", response.payload.imgUrl);
      localStorage.setItem("userId", response.payload.userId);
      // dispatch(addUser({
      //   token : response.token,
      //   isSeller : response.payload.isSeller,
      //   imgUrl : response.payload.imgUrl
      // }))
      dispatch(
        signIn({
          userId: response.payload.userId,
          isSeller: response.payload.isSeller,
          userName: response.payload.userName,
          imgUrl: response.payload.imgUrl,
        })
      );
      if (response.payload.isSeller === false) {
        navigate("/freelancerHomePage");
      }
      if (response.payload.isSeller === true) {
        navigate("/clientHomePage");
      }
      console.log("Login successful:", response);
    } catch (error) {
      // console.log("Login failed. Please check your email and password.", error);
      toast.error("Login failed. Please check your email and password");
    }
  };
  return (
    <div className="signup-container">
      <div className="signup-content">
        <div className="title">Sign In</div>
        <div className="content">
          <form onSubmit={handleSubmit}>
            <div className="input-box">
              <span className="details">Email</span>
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={signinData.email}
                onChange={handleChange}
              />
            </div>
            <div className="input-box">
              <span className="details">Password</span>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={signinData.password}
                onChange={handleChange}
              />
            </div>
            <div className="button">
              <button type="submit">Login</button>
            </div>
          </form>
          <p>
            Don't have an account?{" "}
            <a className="link" href="/signup">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
