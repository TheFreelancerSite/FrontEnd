import React, { useState } from "react";
import "./signup.scss";
import img from "../../assets/draw1aa-removebg-preview.png";
import { register } from "../../services/api.service";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [signupData, setSignupData] = useState({
    userName: "",
    email: "",
    password: "",
    image: null,
    phone: "",
    country: "",
    description: "",
    isSeller: false,
  });
  const [errorMsgEmail, setErrorMsgEmail] = useState("");
  const [errorMsgPassword, setErrorMsgPassword] = useState("");
  const navigate = useNavigate();
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file" && files.length > 0) {
      const file = files[0];
      setSignupData({
        ...signupData,
        [name]: file,
      });
    } else {
      setSignupData({
        ...signupData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const validator = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;

    let isValid = true;

    if (!emailRegex.test(signupData.email)) {
      setErrorMsgEmail("Invalid email format");
      isValid = false;
    } else {
      setErrorMsgEmail("");
    }

    if (!passwordRegex.test(signupData.password)) {
      setErrorMsgPassword(
        "Password should have a minimum of 8 characters, at least one letter, and one number"
      );
      isValid = false;
    } else {
      setErrorMsgPassword("");
    }

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validator()) {
      try {
        const formData = new FormData();
        formData.append("userName", signupData.userName);
        formData.append("email", signupData.email);
        formData.append("password", signupData.password);
        formData.append("image", signupData.image);
        formData.append("country", signupData.country);
        formData.append("phone", signupData.phone);
        formData.append("description", signupData.description);
        formData.append("isSeller", signupData.isSeller);

        await register(formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        setSuccessMessage("Registration successful. Redirecting to login...");
        setTimeout(() => {
          navigate("/login");
        }, 2000);

        console.log("Success");
      } catch (error) {
        console.error("Signup failed:", error);
      }
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="userName">UserName</label>
          <input
            name="userName"
            type="text"
            placeholder="abdou"
            value={signupData.userName}
            onChange={handleChange}
          />

          <label htmlFor="email">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            value={signupData.email}
            onChange={handleChange}
          />
          {errorMsgEmail && (
            <div className="error-message">{errorMsgEmail}</div>
          )}

          <label htmlFor="image">Profile Picture</label>
          <input name="image" type="file" onChange={handleChange} />

          <label htmlFor="password">Password</label>
          <input
            name="password"
            type="password"
            value={signupData.password}
            onChange={handleChange}
          />
          {errorMsgPassword && (
            <div className="error-message">{errorMsgPassword}</div>
          )}

          <label htmlFor="phone">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+216 234 567 89"
            value={signupData.phone}
            onChange={handleChange}
          />

          <label htmlFor="country">Country</label>
          <input
            name="country"
            type="text"
            placeholder="Tunisia"
            value={signupData.country}
            onChange={handleChange}
          />

          <div className="toggle">
            <label htmlFor="isSeller">Activate the seller account</label>
            <label className="switch">
              <input
                name="isSeller"
                type="checkbox"
                checked={signupData.isSeller}
                onChange={handleChange}
              />
              <span className="slider round"></span>
            </label>
          </div>

          <button type="submit">Register</button>
          <p>
            Already have an account?{" "}
            <a href="/login" className="link">
              Login
            </a>
          </p>
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
        </div>
        <div className="right">
          <div>
            <img src={img} className="signup-image" alt="Sample image" />
          </div>
        </div>
      </form>
    </div>
  );
}
