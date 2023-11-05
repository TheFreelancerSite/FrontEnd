import React, { useState } from "react";
import "./Search.scss";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function Search() {
    const user =useSelector((state)=>state.user.value)
    const [input, setInput] = useState("");
    const navigate = useNavigate();
  
    const handleSubmit = () => {
      navigate(`/gigs?search=${input}`);
    };
    return (
      <div className="featured">
        <div className="container">
          <div className="left">
            {user.isSeller ?<h1>
              Find the perfect <span>freelance</span> services for your business
            </h1>:<h1>
              Find the perfect <span>job</span> that matches your expertise.
            </h1> }
            
            <div className="search">
              <div className="searchInput">
                <img src="./img/search.png" alt="" />
                <input
                  type="text"
                  placeholder='Try "building mobil app"'
                  onChange={(e) => setInput(e.target.value)}
                />
              </div>
              <button onClick={handleSubmit}>Search</button>
            </div>
            <div className="popular">
              <span>Popular:</span>
              <button>Web Design</button>
              <button>WordPress</button>
              <button>Logo Design</button>
              <button>AI Services</button>
            </div>
          </div>
          <div className="right">
            <img src="public/img/man.png" alt="" />
          </div>
        </div>
      </div>
    );
}

export default Search
