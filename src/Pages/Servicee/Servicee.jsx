import React from "react";
import "./Servicee.scss";
import { useEffect } from "react";
import axios from 'axios'
import { useState } from "react";
import { useParams ,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import toast, { Toaster } from 'react-hot-toast';
import FeedbackDetails from "../FeedbackDetails/FeedbackDetails";
function Servicee() {
  const user = useSelector((state) => state.user.value);
  const { id } = useParams();
  const navigate = useNavigate();

  const [postUser, setPostUser] = useState([]);
  const [service, setService] = useState([]);
  const [stars, setStars] = useState(null);
  const [reviews ,setReviews]=useState([])
  const handelSetting = (numberStars) => {
    setStars(numberStars);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await axios.get(`http://localhost:3000/service/getUserNameOfService/${id}`);
        console.log("Response from getUserNameOfService:", response1.data);
        setPostUser(response1.data);
        console.log("this isss the postuser",postUser)
        const response2 = await axios.get(`http://localhost:3000/service/getServiceById/${id}`);
        console.log("Response from getServiceById:", response2.data);
        setService(response2.data);
        console.log("this is serviiiice ",service)

        const response3 = await axios.get(`http://localhost:3000/service/averageRatingStars/${response1.data.id}`);
        console.log("This is the number of stars ", response3.data.averageRating);
        handelSetting(response3.data.averageRating);

        const response4 =await axios.get(`http://localhost:3000/service/getAllReviewsForUser/${response1.data.id}`);
        setReviews(response4.data)
        console.log("revvvvviews",response4.data)
      } catch (error) {
        console.error("Error:", error);
      }


    };

    fetchData();
  }, [id]);

  const ApplyForService = () => {
    axios.post(`http://localhost:3000/service/userApplyForJob/${user.userId}/${id}`)
      .then((response) => {
        console.log(response);
        toast(
          "Your request was sent ",
          {
            duration: 4000,
          }
        );
      })
      .catch((error) => {
        console.log(error);
        toast.error("Request failed");
      });
  };

  const startConversation = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:3000/conversation/create/${user.userId}/${service.userId}`)
      .then((response) => {
        console.log(response.data.conversation);
        navigate(`/message/${response.data.conversation.id}/${service.userId}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };



    

  return (
    
    <div className="gig">
      <Toaster position="top-center" reverseOrder={false} />
      <div className="container">
        <div className="left">
             <div className="seller">
            {user.isSeller ? (<h2>About The freelancer</h2>) : (<h2>About The client</h2>) }
            <div className="user">
              <img
                src={postUser.imgUrl}
                alt=""
              />
              <div className="info">
                <span>{postUser.userName}</span>
                <div className="stars">
                 {stars !== null &&
                  Array.from({ length: Math.floor(stars) }, (_, index) => (
                  <img key={index} src="/img/star.png" alt="00" />
                    ))}
                    {stars !== null && stars % 1 !== 0 && (
                      <img
                      className="half-star"
                      src="/img/half-star.png"
                      alt=""
                      style={{ width: '19px', height: '19px' }} // Adjust the size as needed
                    />
  )}
                   {/* <span>{stars}</span> */}
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
                {reviews.map((review)=>{
                  return <FeedbackDetails review={review}  />
                })}
            <hr />
            {/* <div className="item">
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
            </div> */}
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
