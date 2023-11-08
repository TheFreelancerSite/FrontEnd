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
    console.log(signupData)
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
        console.log(signupData)
      } catch (error) {
        console.error("Signup failed:", error);
        console.log(signupData)

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
                </div>
                <div className="input-box">
                  <span className="details">Confirm Password</span>
                  <input type="text" placeholder="Confirm your password"  />
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

            </form>
             <p>
                Don't have an account?{" "}
                <Link className="link" to="/login">
                Sign In
                </Link>
              </p>
            
          </div>
        </div>
      </div>
    );
    
  
}
