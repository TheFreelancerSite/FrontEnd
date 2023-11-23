import React from "react";
import "./FreelancerHomePage.scss";
import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import ServiceCard from "../../components/ServiceCard/ServiceCard";
import Search from "../../components/Search/Search";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../../components/feautures/user";
import { useSearchParams } from "react-router-dom";
function FreelancerHomePage() {
  const location = useLocation();
  let [searchParams] = useSearchParams();

  const user = useSelector((state) => state.user.value);
  const dispatch = useDispatch();
  const userId = searchParams.get("user");
  const isSeller = searchParams.get("isSeller");
  const imgUrl = searchParams.get("imgUrl");
  const userName = searchParams.get("userName");
  const idUser = localStorage.getItem("userId")
  console.log(userId);
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (input) => {
    setSearchInput(input);
  };

  useEffect(() => {
    if (userId) {
      dispatch(
        signIn({
          userId: userId,
          isSeller: isSeller,
          imgUrl: imgUrl,
          userName : userName,
        })
      );
      localStorage.setItem("userId", userId);
      localStorage.setItem("role", isSeller);
      localStorage.setItem("imgUrl", imgUrl);
      localStorage.setItem("userName", userName);
    }
  }, []);
  const [services, setServices] = useState([]);
  const filteredServices = searchInput
    ? services.filter((service) =>
        Object.values(service).some(
          (value) =>
            typeof value === "string" &&
            value.toLowerCase().includes(searchInput.toLowerCase())
        )
      )
    : services;

  useEffect(() => {
    console.log(user.userId);
    axios
      .get(`http://localhost:3000/service/getserviceUser/${idUser}`)
      .then((response) => {
        console.log("this is servicess ", response.data);
        setServices(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Search onSearch={handleSearch}/>
      <div className="services">
        <div className="container">
          <h1>Available services</h1>


          <div className="cards">
            {filteredServices.map((service) => (
              <ServiceCard key={service.id} item={service} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default FreelancerHomePage;
