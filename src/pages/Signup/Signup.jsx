import React, { useState } from "react";
import "./signup.scss";
import img from "../../assets/draw1aa-removebg-preview.png";
import { register } from "../../services/api.service";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

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
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMsgConfirmPassword, setErrorMsgConfirmPassword] = useState("");


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
        [name]: name === "registerAs" ? value === "client" : value,
      });
    }
  
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      setErrorMsgEmail(emailRegex.test(value) ? "" : "Invalid email format");
    }
  
    if (name === "password") {
      const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
      setErrorMsgPassword(
        passwordRegex.test(value)
          ? ""
          : "Password should have a minimum of 8 characters, at least one letter, and one number"
      );
    }
  
    if (name === "confirmPassword") {
      setConfirmPassword(value);
      setErrorMsgConfirmPassword(
        value === signupData.password ? "" : "Passwords do not match"
      );
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
    console.log(signupData);
    e.preventDefault();

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

      if (signupData.password !== confirmPassword) {
        setErrorMsgConfirmPassword("Passwords do not match");
        return;
      }
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
      console.log(signupData);
    } catch (error) {
      console.error("Signup failed:", error);
      console.log(signupData);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-content">
        <div className="title">Registration</div>
        <div className="content">
          <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="user-details">
              <div className="input-box">
                <span className="details">Username</span>
                <input
                  name="userName"
                  type="text"
                  placeholder="userName"
                  value={signupData.userName}
                  onChange={handleChange}
                />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input
                  name="email"
                  type="email"
                  placeholder="email"
                  value={signupData.email}
                  onChange={handleChange}
                />
                <span className="error-msg">{errorMsgEmail}</span>
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input
                  name="phone"
                  type="text"
                  placeholder="+216 234 567 89"
                  value={signupData.phone}
                  onChange={handleChange}
                />
              </div>
              <div className="input-box">
                <span className="details">Country</span>
                <input
                  name="country"
                  type="text"
                  placeholder="Tunisia"
                  value={signupData.country}
                  onChange={handleChange}
                />
              </div>

              <div className="input-box">
              <span className="details">Password</span>
              <input
                name="password"
                type="password"
                value={signupData.password}
                onChange={handleChange}
              />
              <span className="error-msg">{errorMsgPassword}</span>
            </div>
            <div className="input-box">
              <span className="details">Confirm Password</span>
              <input
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={handleChange}
              />
              <span className="error-msg">{errorMsgConfirmPassword}</span>
            </div>
              <div className="input-box">
                <span className="details">Register as</span>
                <select
                  name="registerAs"
                  value={signupData.registerAs}
                  onChange={handleChange}
                >
                  <option value="freelancer">Freelancer</option>
                  <option value="client">Client</option>
                </select>
              </div>
              <div className="input-box">
                <span className="details">Profil picture </span>
                <input name="image" type="file" onChange={handleChange} />
              </div>
              <div className="button">
                <input type="submit" value="Register" />
              </div>
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
              >
                <img
                  className="w-6 h-6"
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  loading="lazy"
                  alt="google logo"
                />
                <span>Register with Google</span>
              </button>
            </div>
          </form>

          <p>
            Already have an account?{" "}
            <Link className="link" to="/login">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
