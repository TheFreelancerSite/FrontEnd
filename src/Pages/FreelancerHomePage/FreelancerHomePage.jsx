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
  console.log(userId);

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
  // const reSort = (type) => {
  //   setSort(type);
  //   setOpen(false);
  // };

  // const apply = ()=>{
  //   console.log(minRef.current.value)
  //   console.log(maxRef.current.value)
  // }

  // const userData = location.search
  //   ? JSON.parse(decodeURIComponent(location.search.replace("?userData=", "")))
  //   : null;
  // if (userData) {
  //   localStorage.setItem("userId", userData.userId);
  //   localStorage.setItem("userName", userData.userName);
  //   localStorage.setItem("imgUrl", userData.imgUrl);
  //   localStorage.setItem("isSeller", userData.isSeller);
  // }

  useEffect(() => {
    console.log(user.userId);
    axios
      .get(`http://localhost:3000/service/getserviceUser/${user.userId}`)
      .then((response) => {
        console.log(response.data);
        setServices(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <Search />
      <div className="services">
        <div className="container">
          <h1>Available services</h1>

          {/* <div className="menu">
          <div className="left">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min" />
            <input ref={maxRef} type="number" placeholder="max" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="right">
            <span className="sortBy">Sort by</span>
            <span className="sortType">
              {sort === "sales" ? "Best Selling" : "Newest"}
            </span>
            <img src="./img/down.png" alt="" onClick={() => setOpen(!open)} />
            {open && (
              <div className="rightMenu">
                {sort === "sales" ? (
                  <span onClick={() => reSort("createdAt")}>Newest</span>
                ) : (
                  <span onClick={() => reSort("sales")}>Best Selling</span>
                  )}
                  <span onClick={() => reSort("sales")}>Popular</span>
              </div>
            )}
          </div>
        </div> */}
          <div className="cards">
            {services.map((service) => (
              <ServiceCard key={service.id} item={service} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default FreelancerHomePage;
