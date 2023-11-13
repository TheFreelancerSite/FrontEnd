import React, { useState, useEffect } from 'react';
import "./ServiceFeedback.scss";
import { FaStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function ServiceFeedback() {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [feedback, setFeedback] = useState('');
    const { serviceId } = useParams();
    const navigate =useNavigate()
    useEffect(() => {
        rateService();
    }, [rating, serviceId]);

    const handleChange = (e) => {
        setRating(e.target.value);
    };

    const rateService = () => {
        if (rating !== null) {
            axios.put(`http://localhost:3000/service/updateThestars/${serviceId}`, {
                stars: rating
            })
            .then((response) => {
                console.log("owaaaaaaaaaaaaaaaaaaa", rating); 
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    };

    const handleFeedbackChange = (e) => {
        setFeedback(e.target.value);
    };

    const giveReview =(e)=>{
        e.preventDefault()
        axios.put(`http://localhost:3000/service/giveReview/${serviceId}`,{
            feedback :feedback,
        })
        .then((response)=>{
            console.log(response.data)
            toast.success('thank you for submitting')
            navigate("/myServices")
        }).catch((error)=>{
            console.log(error)
        })

    }
    return (
        <div className="service-feedback">
            <Toaster position="top-center" reverseOrder={false} />
            <h1 className="rating-title">Rate the service</h1>
            <div className="star-group">
                {[...Array(5)].map((_, index) => {
                    const currentRating = index + 1;
                    return (
                        <label key={index}>
                            <input
                                type="radio"
                                name='rating'
                                value={currentRating}
                                onChange={handleChange}
                            />
                            <FaStar
                                key={index}
                                className="star-icon"
                                size={50}
                                color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                                onMouseEnter={() => setHover(currentRating)}
                                onMouseLeave={() => setHover(null)}
                            />
                        </label>
                    );
                })}
                </div>
                {/* <p>Your rating is {rating} </p> */}
                <div className="feedback-container">
                <label htmlFor="feedback">Share your feedback:</label>
                <textarea
                    id="feedback"
                    name="feedback"
                    value={feedback}
                    onChange={handleFeedbackChange}
                    placeholder="Write your feedback here..."
                />
                <button onClick={giveReview}>Submit</button>
            </div>
        </div>
        
    );
}

export default ServiceFeedback;
