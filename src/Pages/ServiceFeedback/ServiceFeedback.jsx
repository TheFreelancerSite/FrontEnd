import React, { useState } from 'react';
import "./ServiceFeedback.scss";
import { FaStar } from 'react-icons/fa';

function ServiceFeedback() {
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);

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
                                onClick={() => setRating(currentRating)}
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
        </div>
    );
}

export default ServiceFeedback;
