import React from "react";
import "./Servicee.scss";
import { useEffect } from "react";
import axios from 'axios'
import { useState } from "react";
import { useParams ,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';
function Servicee() {
  const user =useSelector((state)=>state.user.value)
  const { id } = useParams();
  const navigate = useNavigate(); 
  console.log("iddddddd",id)
    const[postUser,setPostUser]=useState({})
    const [service,setService]=useState({})
    useEffect(() => {
      axios.get(`http://localhost:3000/service/getUserNameOfService/${id}`)
        .then((response) => {
          console.log("Response from getUserNameOfService:", response.data);
          setPostUser(response.data);
          console.log("this is the postUser ",postUser)
        })
        .catch((error) => {
          console.error("Error in getUserNameOfService:", error);
        });
  
      axios.get(`http://localhost:3000/service/getServiceById/${id}`)
        .then((response) => {
          console.log("Response from getServiceById:", response.data);
          setService(response.data);
        })
        .catch((error) => {
          console.error("Error in getServiceById:", error);
        });
    }, [id]);

    const ApplyForService =()=>{
      axios.post(`http://localhost:3000/service/userApplyForJob/${user.userId}/${id}`)
      .then((response)=>{
        console.log(response)
        toast(
          "Your request was sent ",
          {
            duration: 4000,
          }
        );
      }).catch((error)=>{
        console.log(error)
        toast.error("request failed")
      })
    }
    const notify = () => toast('Here is your toast.');
  const startConversation =(e)=>{
    e.preventDefault()
    axios.post(`http://localhost:3000/conversation/create/${user.userId}/${service.userId}`)
    .then((response)=>{
      console.log(response.data.conversation)
      navigate(`/message/${response.data.conversation.id}/${service.userId}`);
    }).catch((error)=>{
      console.log(error)
    })
  }

  return (
    
    <div className="gig">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container">
        <div className="left">
          <h1>{service.title}</h1>
          <div className="user">
            <img
              className="pp"
              src={postUser.imgUrl}
              alt=""
            />
            <span>{postUser.userName}</span>
            <div className="stars">
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <img src="/img/star.png" alt="" />
              <span>5</span>
            </div>
          </div>

          <h2>About This service</h2>
          <p>
            {service.description}
          </p>
          <div className="seller">
            <h2>About The Seller</h2>
            <div className="user">
              <img
                src={postUser.imgUrl}
                alt=""
              />
              <div className="info">
                <span>{postUser.userName}</span>
                <div className="stars">
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <img src="/img/star.png" alt="" />
                  <span>5</span>
                </div>
                {user.isSeller ?(<button onClick={startConversation}>Contact Me</button>) :<></>}
              </div>
            </div>
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="title">From :</span>
                  <span className="desc">{postUser.country}</span>
                </div>
                    <div className="item">
                       <span className="title">Member since :</span>
                        {postUser.createdAt && (
                          <span className="desc">{postUser.createdAt.substring(0, 10)}</span>
                      )}
                     </div>
              </div>
              <hr />
              <p>
               {postUser.description}
              </p>
            </div>
          </div>
          <div className="reviews">
            <h2>Reviews</h2>
            <div className="item">
              <div className="user">
                <img
                  className="pp"
                  src="https://images.pexels.com/photos/839586/pexels-photo-839586.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <div className="info">
                  <span>Garner David</span>
                  <div className="country">
                    <img
                      src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                      alt=""
                    />
                    <span>United States</span>
                  </div>
                </div>
              </div>
              <div className="stars">
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <span>5</span>
              </div>
              <p>
                I just want to say that art_with_ai was the first, and after
                this, the only artist Ill be using on Fiverr. Communication was
                amazing, each and every day he sent me images that I was free to
                request changes to. They listened, understood, and delivered
                above and beyond my expectations. I absolutely recommend this
                gig, and know already that Ill be using it again very very soon
              </p>
              <div className="helpful">
                <span>Helpful?</span>
                <img src="/img/like.png" alt="" />
                <span>Yes</span>
                <img src="/img/dislike.png" alt="" />
                <span>No</span>
              </div>
            </div>
            <hr />
            <div className="item">
              <div className="user">
                <img
                  className="pp"
                  src="https://images.pexels.com/photos/4124367/pexels-photo-4124367.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <div className="info">
                  <span>Sidney Owen</span>
                  <div className="country">
                    <img
                      src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1e9-1f1ea.png"
                      alt=""
                    />
                    <span>Germany</span>
                  </div>
                </div>
              </div>
              <div className="stars">
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <span>5</span>
              </div>
              <p>
                The designer took my photo for my book cover to the next level!
                Professionalism and ease of working with designer along with
                punctuality is above industry standards!! Whatever your project
                is, you need this designer!
              </p>
              <div className="helpful">
                <span>Helpful?</span>
                <img src="/img/like.png" alt="" />
                <span>Yes</span>
                <img src="/img/dislike.png" alt="" />
                <span>No</span>
              </div>
            </div>
            <hr />
            <div className="item">
              <div className="user">
                <img
                  className="pp"
                  src="https://images.pexels.com/photos/842980/pexels-photo-842980.jpeg?auto=compress&cs=tinysrgb&w=1600"
                  alt=""
                />
                <div className="info">
                  <span>Lyle Giles </span>
                  <div className="country">
                    <img
                      src="https://fiverr-dev-res.cloudinary.com/general_assets/flags/1f1fa-1f1f8.png"
                      alt=""
                    />
                    <span>United States</span>
                  </div>
                </div>
              </div>
              <div className="stars">
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <img src="/img/star.png" alt="" />
                <span>5</span>
              </div>
              <p>
                Amazing work! Communication was
                amazing, each and every day he sent me images that I was free to
                request changes to. They listened, understood, and delivered
                above and beyond my expectations. I absolutely recommend this
                gig, and know already that Ill be using it again very very soon
              </p>
              <div className="helpful">
                <span>Helpful?</span>
                <img src="/img/like.png" alt="" />
                <span>Yes</span>
                <img src="/img/dislike.png" alt="" />
                <span>No</span>
              </div>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="price">
            <h3>{service.title}</h3>
            <h2>{service.price}</h2>
          </div>
          <p>
            {service.description}
          </p>
          <div className="details">
            <div className="item">
              <img src="/img/clock.png" alt="" />
              <span>{service.deliveryTime}</span>
            </div>

          </div>
          <div className="features">
            <div className="item">
              <img src="/img/greencheck.png" alt="" />
              <span>{service.feautures}</span>
            </div>
          </div>
          
          <button onClick={ApplyForService} >Continue</button>
        </div>
      </div>
    </div>
  );
}

export default Servicee;
