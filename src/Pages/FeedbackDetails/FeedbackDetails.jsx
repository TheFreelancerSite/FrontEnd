import React, { useEffect, useState } from 'react'
import "./FeedbackDetails.scss"
import axios from 'axios'
function FeedbackDetails({review,postUser}) {
// const [userReview,setUserReview]=useState([])
//     useEffect(()=>{
//         console.log("hahaha",postUser)
//         axios.get(`http://localhost:3000/service/getAllReviewsForUser/${postUser.id}`)
//         .then((response)=>{
//             setUserReview(response.data.reviewer)
//             console.log("opppa" ,response.data)
//         })

//     },[])
  return (
    <div className="item">
    <div className="user">
      <img
        className="pp"
        src={review.reviewer.imgUrl}
        alt=""
      />
      <div className="info">
        <span>{review.reviewer.userName}</span>

      </div>
    </div>
        {/* <div className="stars">
        <img src="/img/star.png" alt="" />
        <img src="/img/star.png" alt="" />
        <img src="/img/star.png" alt="" />
        <img src="/img/star.png" alt="" />
        <img src="/img/star.png" alt="" />
        <span>5</span>
        </div> */}
    <p>
       {review.comment}
    </p>
  </div>
  )
}

export default FeedbackDetails
