import React, { useEffect, useState } from 'react';
import './UserApplicants.scss';
import { useSelector } from "react-redux";
import axios from 'axios'
import { useParams } from 'react-router-dom';
import ApplicantDetails from '../ApplicantDetails/ApplicantDetails';
function UserApplicants() {

    const user = useSelector((state) => state.user.value);
    const [applicants,setApplicants]=useState([])
    const { serviceId } = useParams(); 
    useEffect(()=>{
        axios.get(`http://localhost:3000/service/usersPending/${serviceId}`)
        .then((response)=>{
            setApplicants(response.data)
            console.log(response.data)
        })
    },[])
  return (
    <div>
      <table className="user-applicants-table">
        <thead>
          <tr>
            <th>{user.isSeller?<>Freelencer</>:<>Client</>}</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
        {applicants.map((applicant) => (
                        <tr key={applicant.id}>
                            {/* <td>{applicant.requester}</td>
                            <td>Action for {applicant.requester}</td> */}
                            <ApplicantDetails applicant={applicant} serviceId={serviceId} />
                        </tr>
                    ))}
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
}

export default UserApplicants;
