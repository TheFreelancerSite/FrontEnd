import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./MyServices.scss";
import axios from 'axios';
import { useSelector } from "react-redux";

function MyServices() {
  const user = useSelector((state) => state.user.value);
  const [services, setServices] = useState([]);
  const currentUser = {
    id: 1,
    username: "Anna",
    isSeller: true, // Assuming this property indicates if the user is a seller (freelancer) or client.
  };

  useEffect(() => {
    axios.get(`http://localhost:3000/service/getServicesForSpecificUser/${user.userId}`)
      .then((response) => {
        setServices(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user.userId]);

  return (
    <div className="myGigs">
      <div className="container">
        <div className="title">
          <h1>{currentUser.isSeller ? "Pending Services" : "Orders"}</h1>
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
              {services.map((service) => (
                <tr key={service.id}>
                  <td>{service.title}</td>
                  <td>{service.createdAt.slice(0, 10)}</td>
                  <td>{service.price}</td>
                  <td>
                    <Link to={`/delete/${service.id}` } className="link">Delete</Link>|{" "}
                    <Link to={`/applicant/${service.id}`} className="link">See applicants</Link>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <h1>Active Services</h1>
      </div>
    </div>
  );
}

export default MyServices;
