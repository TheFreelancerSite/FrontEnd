import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import workImg from '../../assets/work.png';
import './CarouselImage.scss';

export default function CarouselImage({ text , subtext}) {
  return (
    <div className="carousel-image">
      <img src={workImg} alt={text} />

      <div className="caption-container">
        <div className="caption-left">
          <h3>{text}</h3>
          <p>{subtext}</p>
        </div>
        
        <div className="caption-right">
        <Link to="/signup">
          <button className="get-started-button" class="button-36" to ="/signup">Get Started</button>
          </Link  >
        </div>
      </div>
    </div>
  );
}

