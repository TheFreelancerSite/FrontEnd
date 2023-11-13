import React from 'react'
import  "./ClientHomePage.scss"
import { useState } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import axios from 'axios'
import { useSelector} from "react-redux";
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import Search from '../../components/Search/Search';

function ClientHomePage() {
  // const user =useSelector((state)=>state.user.value)
  const [sort, setSort] = useState("sales");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();
  const[services,setServices]=useState([])
  const userId = localStorage.getItem("userId")
  // const reSort = (type) => {
  //   setSort(type);
  //   setOpen(false);
  // };

  // const apply = ()=>{
  //   console.log(minRef.current.value)
  //   console.log(maxRef.current.value)
  // }
  useEffect(()=>{
    console.log(userId)
    axios.get(`http://localhost:3000/service/getserviceUser/${userId}`)
    .then((response)=>{
      console.log("what i want " ,response.data)
      setServices(response.data)
    }).catch((error)=>{
      console.log(error)
    })
  },[])

  return (
    <>
    <Search />
    <div className="services">
      <div className="container">
        <h1>Available services</h1>

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

export default ClientHomePage
