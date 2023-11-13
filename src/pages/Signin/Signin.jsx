import React, { useEffect, useState } from "react";
import "./signin.scss";
import Img from "../../assets/login-bg.png";
import toast, { Toaster } from "react-hot-toast";
import { login } from "../../services/api.service";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import user, { signIn } from "../../components/feautures/user";
import axios from "axios";

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


const handleGoogleLogin = async (e) => {
  e.preventDefault();
  try {
    // Open the Google authentication URL in the current window
    window.location.href = `http://localhost:3000/auth/google`;


    dispatch(
      signIn({
        userId: response.payload.userId,
        isSeller: response.payload.isSeller,
        userName: response.payload.userName,
        imgUrl: response.payload.imgUrl,
      }),
      navigate("/freelancerHomePage")
    );
    if (response.payload.isSeller === false) {
      navigate("/freelancerHomePage");
    }
    if (response.payload.isSeller === true) {
      navigate("/clientHomePage");
    }
  navigate('freelancerHomePage')

  } catch (error) {
    console.error("Google login error:", error);
    toast.error("Google login failed. Please try again.");
  }
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

           
            <div className="with-line flex items-center">
              <div className="flex-1 border-t border-black"></div>
              <span className="mx-2">OR</span>
              <div className="flex-1 border-t border-black"></div>
            </div>
            <div className="flex items-center justify-center">
              <button
                class="px-4 py-2 border flex gap-2 border-slate-200 dark:border-slate-700 rounded-lg text-slate-700 dark:text-slate-200 hover:border-slate-400 dark:hover:border-slate-500 hover:text-slate-900 dark:hover:text-slate-300 hover:shadow transition duration-150"
                type="submit"
                onClick={handleGoogleLogin}
              >
                <img
                  className="w-6 h-6"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  loading="lazy"
                  alt="google logo"
                />
                <span>Login with Google</span>
              </button>
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
