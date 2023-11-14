import React from "react";
import "./ServiceCard.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios'
const ServiceCard = ({ item }) => {

 const[postUser,setPostUser]=useState({})
 const imgUrl = useSelector((state) => state.user.value.imgUrl)
// console.log(imgUrl)
 useEffect(()=>{
    axios.get(`http://localhost:3000/service/getUserNameOfService/${item.id}`)
    .then((response)=>{
      console.log("this is the get user from card ",response.data)
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
            <img src={postUser.imgUrl} alt="" />
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

            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
