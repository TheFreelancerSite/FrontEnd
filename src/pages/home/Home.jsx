import React from "react";
import "./Home.scss";
// import Featured from "../../components/featured/Featured";
// import TrustedBy from "../../components/trustedBy/TrustedBy";
// import Slide from "../../components/slide/Slide";
// import CatCard from "../../components/catCard/CatCard";
// import ProjectCard from "../../components/projectCard/ProjectCard";
// import { cards, projects } from "../../data";
import checkImg from "../../assets/check.png";
import landImg from "../../assets/land.svg";
import workImg from "../../assets/work.png";
import CarouselImage from "./CarouselImage";
import Carousel from "react-bootstrap/Carousel";
import { useState } from "react";

function Home() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };
  return (
    <div className="home">
      {/* <Featured />
      <TrustedBy />
      <Slide slidesToShow={5} arrowsScroll={5}>
        {cards.map((card) => (
          <CatCard key={card.id} card={card} />
        ))}
      </Slide> */}
      <div className="features">
        <div className="container">
          <div className="item">
            <Carousel activeIndex={index} onSelect={handleSelect}>
              <Carousel.Item>
                <CarouselImage text="Freelacner" subtext = "Freelancing, which is a term used to describe a career in which a person works for themselves and is hired on a project-by-project basis by different organizations, is becoming a more popular career choice." />
              </Carousel.Item>
              <Carousel.Item>
                <CarouselImage text="Job Seeker" subtext = "Job seeker refers to an individual who is actively looking for an employment opportunity/job and has submitted an application to the employer."/>
              </Carousel.Item>
              <Carousel.Item>
                <CarouselImage text="Service" subtext = " Freelanci has three types of accounts: Client, Freelancer, As someone who's engaged independent professionals  you already have a Client account."/>
              </Carousel.Item>
            </Carousel>
          </div>
          {/* <div className="item">
            <img className="workimage" src={workImg} />
          </div> */}
        </div>
      </div>
      <div className="explore">
        <div className="container">
          <h1>Explore the marketplace</h1>
          <div className="items">
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/graphics-design.d32a2f8.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Graphics & Design</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/online-marketing.74e221b.svg"
                alt=""
              />
              <div className="line"></div>

              <span>Digital Marketing</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/writing-translation.32ebe2e.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Writing & Translation</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/video-animation.f0d9d71.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Video & Animation</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/music-audio.320af20.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Music & Audio</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/programming.9362366.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Programming & Tech</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/business.bbdf319.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Business</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/lifestyle.745b575.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Lifestyle</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/data.718910f.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Data</span>
            </div>
            <div className="item">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/photography.01cf943.svg"
                alt=""
              />
              <div className="line"></div>
              <span>Photography</span>
            </div>
          </div>
        </div>
      </div>
      <div className="features dark">
        <div className="container">
          <div className="item">
            <h1>
              Freelanci <i>business</i>
            </h1>
            <h1>
              A business solution designed for <i>teams</i>
            </h1>
            <p>
              Upgrade to a curated experience packed with tools and benefits,
              dedicated to businesses
            </p>
            <div className="title">
              <img src={checkImg} alt="" />
              Connect to freelancers with proven business experience
            </div>

            <div className="title">
              <img src={checkImg} alt="" />
              Get matched with the perfect talent by a customer success manager
            </div>

            <div className="title">
              <img src={checkImg} alt="" />
              Manage teamwork and boost productivity with one powerful workspace
            </div>
            {/* <button>Explore Freelanci Business</button> */}
          </div>
          <div className="item">
            <img className="image" src={landImg} alt="" />
          </div>
        </div>
      </div>
      {/* <Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map((card) => (
          <ProjectCard key={card.id} card={card} />
        ))}
      </Slide> */}
    </div>
  );
}

export default Home;
