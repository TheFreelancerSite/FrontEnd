import React, { useState } from "react";
import "./signin.scss";
import Img from "../../assets/login-bg.png";
import toast, { Toaster } from "react-hot-toast";
import { login } from "../../services/api.service";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../../components/feautures/user";
import Navbar from "../../components/Navbar/Navbar";
import { Link } from "react-router-dom";

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
      localStorage.setItem("userId  ", response.payload.userId);
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
      toast.error("Login failed. Please check your email and password")

    }
  };
;

  return (
    <div className="login">
    
      <Toaster position="top-right" reverseOrder={false} />
      <form onSubmit={handleSubmit}>
        <div className="left">
        <Link to="/" className="logo">
          <span className="text">Freelenci</span>
          <span className="dot">.</span>
        </Link>
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
            Don't have an account?{" "}
            <a class="link" href="/signup">
              Sign Up
            </a>
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
