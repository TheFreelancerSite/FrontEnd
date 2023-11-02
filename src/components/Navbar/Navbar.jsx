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
    id: 1,
    username: "hichem sboui",
    isFreelencer: true ,
  };

  return (
    <div className={active == "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          {/* <Link className="link" to="/"> */}
            <span className="text">Freelenci</span>
          {/* </Link> */}
          <span className="dot">.</span>
        </div>
        <div className="links">
          <span>Freelanci Business</span>
          <span>Explore</span>
          <span>English</span>
          {!currentUser?.isFreelencer && <span>Become a Freelencer</span>}
          {currentUser.isFreelencer ? (
            <div className="user" onClick={()=>setOpen(!open)}>
              <img
                src="https://scontent.ftun14-1.fna.fbcdn.net/v/t39.30808-6/266340950_1523239511389716_7134363116282512829_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=5f2048&_nc_ohc=h32rGxJFf4oAX_03j0A&_nc_ht=scontent.ftun14-1.fna&oh=00_AfDexn53aXmH7giyGklDv1s98lLmPiZQs3z1S94sJADMZw&oe=6542240F"
                alt=""
              />
              <span>{currentUser?.username}</span>
              {open && <div className="options">
                {currentUser.isFreelencer && (
                  <>
                    {/* <Link className="link" to="/servicess">
                     <li> Services</li>
                    </Link> */}
                    <Link className="link" to="/add">
                      <li>Add New Service</li>
                    </Link>
                  </>
                )}
                <Link className="link" to="/orders">
                  <li>Orders</li>
                </Link>
                {/* <Link className="link" to="/messages"> */}
                  <li>Messages</li>
                {/* </Link> */}
                {/* <Link className="link" to="/"> */}
                  <li>Logout</li>
                {/* </Link> */}
              </div>}
            </div>
          ) : (
            <>
              <span>Sign in</span>
              {/* <Link className="link" to="/register"> */}
                <button>Join</button>
              {/* </Link> */}
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
