import React from "react";
import { Link } from "react-router-dom";
import "./MyServices.scss";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import { data } from "../../../data.json" 


function MyServices() {
  const currentUser = {
    id: 1,
    username: "Anna",
    isSeller: true,
  };

  return (
    <div className="myGigs">
      <div className="container">
        <div className="title">
          <h1>{currentUser.isSeller ? "My Services" : "Orders"}</h1>
          {currentUser.isSeller && (
            <Link to="/add">
              <button>Add New Service</button>
            </Link>
          )}
        </div>
         <div className="cards">
          {data.map((gig) => (
            <ServiceCard key={gig.id} item={gig} />
          ))}
       
      </div>
    </div>
    </div>
  );
}

export default MyServices;
