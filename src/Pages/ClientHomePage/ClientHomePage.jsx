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
  const [searchInput, setSearchInput] = useState(""); 
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

  const handleSearch = (input) => {
    setSearchInput(input);
  };

  const filteredServices = searchInput
  ? services.filter((service) =>
      Object.values(service).some(
        (value) =>
          typeof value === "string" &&
          value.toLowerCase().includes(searchInput.toLowerCase())
      )
    )
  : services;

  return (
    <>
    <Search onSearch={handleSearch} />
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

export default ClientHomePage