import React, { useEffect, useState } from 'react';
import './ApplicantDetails.scss';
import axios from 'axios';

function ApplicantDetails({ applicant, serviceId,changeToaccept }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:3000/user/getUser/${applicant.userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleAccept = (e) => {
    axios
      .post(`http://localhost:3000/service/AcceptApply/${applicant.userId}/${serviceId}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="applicant-details">
      <div className="user-info">
        <div className="user-icon">
          <img className="user-image" src={user.imgUrl} alt={user.userName} />
        </div>
        <div className="user-name">
          <p>{user.userName}</p>
        </div>
      </div>
      <div className="button-container">
        <span>
          <button onClick={()=>{handleAccept() 
          changeToaccept()}} className="accept-button">Accept</button>
        </span>
        <span>
          <button className="reject-button">Reject</button>
        </span>
      </div>
    </div>
  );
}

export default ApplicantDetails;
