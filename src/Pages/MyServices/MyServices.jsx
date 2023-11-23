import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MyServices.scss";
import axios from 'axios';
import { useSelector } from "react-redux";

function MyServices() {
  const user = useSelector((state) => state.user.value);
  const [services, setServices] = useState([]);
  const [pendingServices, setPendingServices] = useState([]);
  const [activeServices, setActiveServices] = useState([]);
  const [validatedServices, setValidatedServices] = useState([]);
  const currentUser = {
    id: 1,
    username: "Anna",
    isSeller: true, // Assuming this property indicates if the user is a seller (freelancer) or client.
  };

  useEffect(() => {
    axios.get(`http://localhost:3000/service/getServicesForSpecificUser/${user.userId}`)
      .then(async (response) => {
        setServices(response.data);
  
        // Use map to return an array of promises
        const servicePromises = response.data.map(async (service) => {
          try {
            const statusResponse = await axios.get(`http://localhost:3000/service/getServiceStatus/${service.id}`);
            const { status, validated } = statusResponse.data;
        
            if (status === 'pending') {
              setPendingServices((prevPendingServices) => [...prevPendingServices, service]);
            } else if (status === 'accepted') {
              
        
              if (validated) {
                // Only add to validatedServices if both accepted and validated
                setValidatedServices((prevValidatedServices) => [...prevValidatedServices, service]);
              }
              else{
                setActiveServices((prevActiveServices) => [...prevActiveServices, service]);
              }
            }
          } catch (error) {
            console.log(error);
          }
        });
  
        // Use Promise.all to wait for all promises to resolve
        await Promise.all(servicePromises);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="myGigs">
      <div className="container">
        <div className="title">
          <h1>{currentUser.isSeller ? "My Pending Services" : "Orders"}</h1>
          {currentUser.isSeller && (
            <Link to="/add">
              <button>Add New Service</button>
            </Link>
          )}
        </div>
        
        {currentUser.isSeller && (
          <table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Created At</th>
                <th>Price</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendingServices.map((service) => (
                <tr key={service.id}>
                  <td>{service.title}</td>
                  <td>{service.createdAt.slice(0, 10)}</td>
                  <td>{service.price}</td>
                  <td>
                    <Link to={`/delete/${service.id}`} className="link">Delete</Link>|{" "}
                    <Link to={`/applicant/${service.id}`} className="link">See applicants</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <h1>My Active Services</h1>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Created At</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {activeServices.map((service) => (
              <tr key={service.id}>
                <td>{service.title}</td>
                <td>{service.createdAt.slice(0, 10)}</td>
                <td>{service.price}</td>
                <td>
                  <Link to={`/delete/${service.id}`} className="link">Delete</Link>|{" "}
                  <Link to={`/applicant/${service.id}`} className="link">See applicants</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <h1>My Validated Services</h1>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Created At</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {validatedServices.map((service) => (
              <tr key={service.id}>
                <td>{service.title}</td>
                <td>{service.createdAt.slice(0, 10)}</td>
                <td>{service.price}</td>
                <td>
                  <Link to={`/delete/${service.id}`} className="link">Delete</Link>|{" "}
                  <Link to={`/applicant/${service.id}`} className="link">See applicants</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MyServices;
