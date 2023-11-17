import React, { useEffect } from 'react'
import './Completion.scss'
import axios from 'axios'
import {  useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
function Completion({handleSuccess}) {
    const {clientId,freelancerId,serviceId} = useParams()
    useEffect(()=>{
        axios.post(`http://localhost:3000/payment/updatingPaymentTable/${clientId}/${freelancerId}/${serviceId}`, {
            amount: 255 // Update with the actual amount
        }).then((response)=>{
            console.log(response.data)
        }).catch((error)=>{
            console.log(error)
        })
    },[])
    const navigate =useNavigate()
    useEffect(()=>{
        handleSuccess()
        navigate(`/applicant/${serviceId}`)
    },[])
  return (
    <div className='container'>
      <h1>Thank you! 🎉</h1>
    </div>  
  )
}

export default Completion
