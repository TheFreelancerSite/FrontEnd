import React, { useEffect, useState } from 'react';
import './ApplicantDetails.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";

function ApplicantDetails({ applicant, serviceId,success}) {
  const userr = useSelector((state) => state.user.value);

  const [user, setUser] = useState({});
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [isValidate ,setIsValidate]=useState(false)
  const [reload, setReload] = useState(false); // Add reload state

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
  }, [reload]);

  const handleAccept = (e) => {
    axios
      .post(`http://localhost:3000/service/AcceptApply/${applicant.userId}/${serviceId}`)
      .then((response) => {
        console.log(response.data);
        setReload(true);
        window.location.reload();

      })
      .catch((error) => {
        console.log(error);
      });
  }

  const Validating =()=>{
    setShowConfirmation(true);

  }

  const startConversation = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://localhost:3000/conversation/create/${userr.userId}/${applicant.userId}`
        
      )
      .then((response) => {
        console.log(response.data.conversation);
        navigate(`/messages`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const  handleConfirmation =(confirmed)=>{
    console.log("haha")
    if(confirmed){
      axios.put(`http://localhost:3000/service/validatingService/${applicant.userId}/${serviceId}`)
      .then((response)=>{
        console.log(response.data)
        navigate(`/serviceFeedback/${serviceId}/${applicant.userId}`)
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
        <div className='user-Message'>
           <img  className="user-Message" src="../public/img/message.png" alt="oyy" onClick={startConversation} /> 
        </div>
      </div>
      {applicant.user_service_status ==="pending" ? (
              <div className="button-container">
              <span>
                {/* once he clicks on the accept button the client should pay */}
                {success ? (handleAccept()):( <button onClick={()=>{userr.isSeller ? navigate(`/Payment/${userr.userId}/${applicant.id}/${serviceId}`):navigate(`/Payment/${applicant.id}/${userr.id}/${serviceId}`)}} className="accept-button">Accept</button>)}
                
               

              </span>
              <span>
                <button className="reject-button">Reject</button>
              </span>
            </div>
      ) :(applicant.isCompleted ?<>validated</>:(<button className='accept-button .validate-button' onClick={Validating} >validate</button>)) }

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
