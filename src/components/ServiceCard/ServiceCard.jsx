import React from "react";
import "./ServiceCard.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios'
const ServiceCard = ({ item }) => {

 const[postUser,setPostUser]=useState({})

 useEffect(()=>{
    axios.get(`http://localhost:3000/service/getUserNameOfService/${item.id}`)
    .then((response)=>{
      console.log("this is the getuser from card ",response.data)
      setPostUser(response.data)
    })
 },[])
  return (
    <Link to={`/Servicee/${item.id}`} className="link">
      <div className="serviceCard">
        <img src={item.job_img} alt="" />
        <div className="info">
          <div className="user">
            {/* here we gonna put the user img in the store to access it here  */}
            <img src="data:image/jpeg;base64,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 " alt="" />
            <span>{postUser.userName}</span>
          </div>
          <p>{item.title}</p>
          <div className="star">
            <img src="./img/star.png" alt="" />
            <span>{item.star}</span>
          </div>
        </div>
        <hr />
        <div className="detail">
          <img src="./img/heart.png" alt="" />
          <div className="price">
            <span>STARTING AT</span>
            <h2>
              $ {item.price}
              <sup>99</sup>
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
