import React from 'react'
import "./signin.scss";
import Img from "../../assets/login-bg.png"
export default function Signin() {

  return (
    <div className="login">
      <form>
        <div className="left">
          <h1>Sign in</h1>
          
          <label htmlFor="" >Email</label>
          <input name="email" type="email" placeholder="email" />

          <label htmlFor=""  size="50">Password</label>
          <input name="password" type="password" placeholder="password" />

          <button type="submit">Login</button>
          <p>Don't have an account? <a class="link">Sign Up</a></p>
          
        </div>
        <div className="right">
          <div>
            <img
              src={Img }
              className="signup-image" 
              alt="Sample image"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
