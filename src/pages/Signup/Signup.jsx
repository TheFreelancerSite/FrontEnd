import React from "react";
import "./signup.scss";
import img  from "../../assets/draw1aa-removebg-preview.png"

export default function Signup() {
  return (
    <div className="register">
      <form>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">FirstName</label>
          <input name="FirstName" type="text" placeholder="abdou" />
          <label htmlFor="">LastName</label>
          <input name="LastName" type="text" placeholder="lh" />

          <label htmlFor="">Email</label>
          <input name="email" type="email" placeholder="email" />

          <label htmlFor="">Password</label>
          <input name="password" type="password" />

          <label htmlFor="">Phone Number</label>
          <input name="phone" type="text" placeholder="+216 234 567 89" />

          <label htmlFor="">Country</label>
          <input name="country" type="text" placeholder="Tunisia" />
          <div className="toggle">
            <label htmlFor="">Activate the seller account</label>
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>

          <button type="submit">Register</button>
          <p >
             Already have an account? <a routerLink="/login" class="link">Login</a>
           </p>
          

        </div>
        <div className="right">
          <div>
            <img
              src={img }
              className="signup-image" 
              alt="Sample image"
            />
          </div>
        </div>
      </form>
    </div>
  );
}
