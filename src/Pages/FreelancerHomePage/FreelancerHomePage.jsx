import React from 'react'
import "./FreelancerHomePage.scss"
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import { useSelector} from "react-redux";
import ServiceCard from '../../components/ServiceCard/ServiceCard';


function FreelancerHomePage() {

  const user =useSelector((state)=>state.user.value)
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();
  const[services,setServices]=useState([])
  // const reSort = (type) => {
  //   setSort(type);
  //   setOpen(false);
  // };

  // const apply = ()=>{
  //   console.log(minRef.current.value)
  //   console.log(maxRef.current.value)
  // }
  useEffect(()=>{
    console.log(user.userId)
    axios.get(`http://localhost:3000/service/getserviceUser/${user.userId}`)
    .then((response)=>{
      console.log(response.data)
      setServices(response.data)
    }).catch((error)=>{
      console.log(error)
    })
  },[])

  return (
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
  );
}

export default FreelancerHomePage
