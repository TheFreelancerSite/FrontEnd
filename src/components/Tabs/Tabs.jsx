import React, { useState , useEffect } from "react";
import "./Tabs.scss";
import axios from "axios";

function Tabs({serviceId}) {
  const [activeTab, setActiveTab] = useState("Pending");
  const [isthereAccepted,setIsThereAccepted]=useState(false)
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  useEffect(()=>{
    axios.get(`http://localhost:3000/service/isServiceHaveAcceptedUser/${serviceId}`)
    .then((response)=>{
      response.data.message ? setIsThereAccepted(true): setIsThereAccepted(false)
    }).catch((error)=>{
      console.log(error)
    })
  },[isthereAccepted])

  return (
    <div className="tabs-container">
      <div className="tabs">
      {isthereAccepted ? (        <div
          className={`tab ${activeTab === "Accepted" ? "active" : ""}`}
          onClick={() => handleTabClick("Accepted")}
        >
          Accepted
        </div>)  :  (        <div
          className={`tab ${activeTab === "Pending" ? "active" : ""}`}
          onClick={() => handleTabClick("Pending")}
        >
          Pending
        </div>) }


        <div
          className={`tab ${activeTab === "Rejected" ? "active" : ""}`}
          onClick={() => handleTabClick("Rejected")}
        >
          Rejected
        </div>
      </div>

    </div>
  );
}

export default Tabs;
