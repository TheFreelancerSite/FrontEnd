import React, { useEffect, useState } from 'react';
import './UserApplicants.scss';
import { useSelector } from "react-redux";
import axios from 'axios'
import { useParams } from 'react-router-dom';
import ApplicantDetails from '../ApplicantDetails/ApplicantDetails';
import Tabs from '../../components/Tabs/Tabs';
function UserApplicants() {

    const user = useSelector((state) => state.user.value);
    const [applicants,setApplicants]=useState([])
    const[acceptedApplicant,setAcceptedApplicant]=useState([])
    const { serviceId } = useParams(); 
    console.log("thissss test ",acceptedApplicant );
    
    useEffect(()=>{
        axios.get(`http://localhost:3000/service/usersPending/${serviceId}`)
        .then((response)=>{
            setApplicants(response.data)
            console.log(response.data)
        })
        axios.get(`http://localhost:3000/service/getTheAcceptedUser/${serviceId}`)
        .then((response) => {
          if (response.data.message) {
            const userAcceptArray = Array.isArray(response.data.userAccept)
              ? response.data.userAccept
              : [response.data.userAccept];
    
            setAcceptedApplicant(userAcceptArray);
          } else {
            setAcceptedApplicant([]);
          }
        });
      
    },[applicants])


  return (
    <div  className="user-applicants-container">
      <Tabs  serviceId={serviceId} />
      <table className="user-applicants-table">
      {    acceptedApplicant.length > 0   ? (
        <tbody>
          {acceptedApplicant.map((applicant) => (
       
            <tr key={applicant.id}>
                  
              <ApplicantDetails applicant={applicant} serviceId={serviceId} />
            </tr>
          ))}
        </tbody>
      ) : (
        <tbody>
          {applicants.map((applicant) => (
            <tr key={applicant.id}>
              <ApplicantDetails applicant={applicant} serviceId={serviceId} />
            </tr>
          ))}
        </tbody>
      )}
    </table>
    </div>
  );
}

export default UserApplicants;
