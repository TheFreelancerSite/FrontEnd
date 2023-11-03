import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.scss";

function Navbar() {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false);

//   const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener("scroll", isActive);
    return () => {
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  // const currentUser = null

  const currentUser = {
    // id: localStorage.getItem("id"),
    username : localStorage.getItem("username"),
    isSeller:localStorage.getItem("role") ,
    img:localStorage.getItem("imgUrl") ,
  };
  console.log(currentUser);

  return (
    <div className={active == "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link className="link" to="/">
            <span className="text">Freelenci</span>
          </Link>
          <span className="dot">.</span>
        </div>
        <div className="links"> 
          <span>Freelanci Business</span>
          <span>Explore</span>
          {/* <span>English</span> */}
          {/* {!currentUser?.isSeller && <span>Become a Freelencer</span>} */}
          {currentUser.isSeller ? (
            <div className="user" onClick={()=>setOpen(!open)}>
              <img
                src={currentUser.img}
                alt=""
              />
              <span>{currentUser.username}</span>
              {open && <div className="options">
                {currentUser.isSeller.includes(true) && (
                  <>
                    <Link className="link" to="/servicess">
                     <li> Services</li>
                    </Link>
                    <Link className="link" to="/add">
                      <li>Add New Service</li>
                    </Link>
                  </>
                )}
                <Link className="link" to="/orders">
                  <li>Orders</li>
                </Link>
                <Link className="link" to="/messages">
                  <li>Messages</li>
                </Link>
                <Link className="link" to="/">
                  <li>Logout</li>
                </Link>
              </div>}
            </div>
          ) : (
            <>
              <Link className="link" to="/login">
                <span>Sign in</span>
              </Link>
              <Link className="link" to="/signup">
                <button>Join</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {(active  !== "/") && (
        <>
          <hr />
          <div className="menu">
            {/* <Link className="link menuLink" to="/"> */}
              <a>Graphics & Design</a>
            {/* </Link> */}
            {/* <Link className="link menuLink" to="/"> */}
              <a>Video & Animation</a>
            {/* </Link> */}
            {/* <Link className="link menuLink" to="/"> */}
              <a>Writing & Translation</a>
            {/* </Link> */}
            {/* <Link className="link menuLink" to="/"> */}
            <a>AI Services</a>
            {/* </Link> */}
            {/* <Link className="link menuLink" to="/"> */}
            <a>Digital Marketing</a>
            {/* </Link> */}
            {/* <Link className="link menuLink" to="/"> */}
            <a> Music & Audio</a>
            {/* </Link> */}
            {/* <Link className="link menuLink" to="/"> */}
            <a>Programming & Tech</a>
            {/* </Link> */}
            {/* <Link className="link menuLink" to="/"> */}
            <a> Business</a>
            {/* </Link> */}
            {/* <Link className="link menuLink" to="/"> */}
            <a> Lifestyle</a>
            {/* </Link> */}
          </div>
          <hr />
        </>
      )}
    </div>
  );
}

export default Navbar;
