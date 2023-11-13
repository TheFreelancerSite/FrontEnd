import React, { useEffect, useState } from 'react';
import './ApplicantDetails.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function ApplicantDetails({ applicant, serviceId}) {
  const [user, setUser] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isValidate ,setIsValidate]=useState(false)
  const navigate = useNavigate();
console.log(applicant,"fromdetails");
  useEffect(() => {
    axios
      .get(`http://localhost:3000/user/getUser/${applicant.userId}`)
      .then((response) => {
        setUser(response.data);
        console.log("oyyyyyyyyy",applicant)
      })
      .catch((error) => {
        console.log(error);
      });

    // axios.get(`http://localhost:3000/service/isUserCompleteJob/${applicant.userId}/${serviceId}`)
    // .then((response)=>{
    //   setIsValidate(response.data)
    //   console.log('i m heeeeeeeeere ' ,isValidate)
    // }).catch((error)=>{
    //   console.log(error)
    // })
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

  const Validating =()=>{
    setShowConfirmation(true);

  }

  const  handleConfirmation =(confirmed)=>{
    console.log("haha")
    if(confirmed){
      axios.put(`http://localhost:3000/service/validatingService/${applicant.userId}/${serviceId}`)
      .then((response)=>{
        console.log(response.data)
        navigate(`/serviceFeedback/${serviceId}`)
      })
      .catch((error)=>{
        console.log(error)
      })
    }
    else{
      setShowConfirmation(false)
    }
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
      {applicant.user_service_status ==="pending"? (
              <div className="button-container">
              <span>
                <button onClick={()=>{handleAccept()}} className="accept-button">Accept</button>
              </span>
              <span>
                <button className="reject-button">Reject</button>
              </span>
            </div>
      ) :(applicant.isCompleted ?<>validated</>:(<button className='accept-button' onClick={Validating} >validate</button>)) }

{showConfirmation && (
        <div className="popup-container">
          <div className="popup">
            <p>Are you sure you want to validate this user?</p>
            <button onClick={() => handleConfirmation(true)}>Yes</button>
            <button onClick={() => handleConfirmation(false)}>No</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default ApplicantDetails;
