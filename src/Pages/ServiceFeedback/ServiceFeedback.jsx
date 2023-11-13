import React, { useState, useEffect } from 'react';
import "./ServiceFeedback.scss";
import { FaStar } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ServiceFeedback() {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [feedback, setFeedback] = useState('');
    const { serviceId } = useParams();

    useEffect(() => {
        rateService();
    }, [rating, serviceId]);

    const handleChange = (e) => {
        setRating(e.target.value);
    };

    const rateService = () => {
        // Check if the rating is not null before making the API call
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

    return (
        <div className="service-feedback">
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
            </div>
        </div>
        
    );
}

export default ServiceFeedback;
