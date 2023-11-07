import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";
import { logout } from "../../services/api.service";
import { useSelector } from "react-redux";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);
  const[openModel,setModel]=useState(false)
  const { pathname } = useLocation();
const user = useSelector((state) => state.user.value.isSeller)

const handleJoinClick = () => {
  setShowModal(true);
};
  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const handlLogout = () => {
    try {
      logout();
    } catch (error) {
      console.error(error);
    }
  };
  const currentUser = {
    username: localStorage.getItem("username"),
    isSeller: localStorage.getItem("role"),
    img: localStorage.getItem("imgUrl"),
  };
console.log(currentUser.isSeller);
  return (
    
    <div className={active && pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          
        <Link className="link" to={user === true ? "/clientHomePage" : user === false ? "/freelancerHomePage" :user === "" ?"/" :"/"}>
            <span className="text">Freelenci</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links">
          {!currentUser.isSeller === false&& (
            <>
              <Link className="link" to="/services">
                <li>Services</li>
              </Link>
              <Link className="link" to="/add">
                <li>Add New Service</li>
              </Link>
            </>
          )}
          {currentUser.isSeller === false && currentUser.isSeller !== null && (
            <>
              <Link className="link" to="/services">
                <li>freelancer</li>
              </Link>
              <Link className="link" to="/add">
                <li>freelancer</li>
              </Link>
            </>
          )}
          {!currentUser.isSeller === false && (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img} alt="" />
              <span>{currentUser.username}</span>
              {open && (
                <div className="options">
                  <Link className="link" to="/messages">
                    <li>Messages</li>
                  </Link>
                  <Link className="link" to="/profil">
                    <li>Profil</li>
                  </Link>
                  <Link className="link" to="/">
                    <li onClick={handlLogout}>Logout</li>
                  </Link>
                </div>
              )}
            </div>
          )}
          {!currentUser.isSeller && currentUser.isSeller !== null && (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img} alt="" />
              <span>{currentUser.username}</span>
              {open && (
                <div className="options">
                  <Link className="link" to="/messages">
                    <li>Messages</li>
                  </Link>
                  <Link className="link" to="/profil">
                    <li>Profil</li>
                  </Link>
                  <Link className="link" to="/">
                    <li onClick={handlLogout}>Logout</li>
                  </Link>
                </div>
              )}
            </div>
          )}
          {currentUser.isSeller === null && (
            <>
              <Link className="link" to="/login">
                <span>Sign in</span>
              </Link>
              <Link className="link" to="/signup">
                <button >Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
