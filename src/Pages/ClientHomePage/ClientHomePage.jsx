import React, { useState, useEffect } from 'react';
import './ClientHomePage.scss';
import axios from 'axios';
import { useSelector } from 'react-redux';
import ServiceCard from '../../components/ServiceCard/ServiceCard';
import Search from '../../components/Search/Search';

function ClientHomePage() {
  const user = useSelector((state) => state.user.value);
  const [services, setServices] = useState([]);

  // const apply = ()=>{
  //   console.log(minRef.current.value)
  //   console.log(maxRef.current.value)
  // }
  useEffect(()=>{
    console.log(user.userId)
    axios.get(`http://localhost:3000/service/getserviceUser/${user.userId}`)
    .then((response)=>{
      console.log("what i want " ,response.data)
      setServices(response.data)
    }).catch((error)=>{
      console.log(error)
    })
  },[])

  return (
    <>
      <Search setServices={setServices} userId={user.userId} />
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

export default ClientHomePage;
