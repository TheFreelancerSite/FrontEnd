import React, { useEffect, useState } from 'react';
import './ApplicantDetails';
import axios from 'axios';

function ApplicantDetails({ applicant ,serviceId }) {
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

  const handleAccept =(e)=>{
    axios.post(`http://localhost:3000/service/AcceptApply/${applicant.userId}/${serviceId}`)
    .then((response)=>{
        console.log(response.data)
    }).catch((error)=>{
        console.log(error)
    })
  }

  return (
    <>  
        {/* here you should do a Link to redirect to the profile of the user   */}
      <td>{user.userName}</td>
      <td>
        <div className="button-container">
          <span>
            <button onClick={handleAccept} className="accept-button">Accept</button>
          </span>
          <span>
            <button className="reject-button">Reject</button>
          </span>
        </div>
      </td>
    </>
  );
}

export default ApplicantDetails;
