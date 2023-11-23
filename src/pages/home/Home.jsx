import React, { useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Signup from "../Signup/Signup";
import checkImg from "../../assets/check.png";
import landImg from "../../assets/land.svg";
import CarouselImage from "./CarouselImage";
import Slider from "react-slick";

function Home(props) {
  const showModal = props.showModal;
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleAfterChange = (currentSlide) => {
    setIndex(currentSlide);
  };

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: handleAfterChange,
  };
const gradientColors = ' radial-gradient(circle, #74a9fd, #9ab7fd, #b8c6fd, #d1d6fe, #e7e7fe, #e2e2fd, #dedcfc, #dad7fb, #bbbbf8, #98a0f5, #6c86f1, #1d6fee)';
const downUpgradient = ' linear-gradient(to right top, #1a365d, #003a7c, #003d9a, #003db7, #0038d1, #3b45de, #5852eb, #7060f8, #9887fc, #bcafff, #ded7ff, #ffffff)';
  return (
    <div className="home">
      {showModal && <Signup />}
      <section className="feature text-white py-16"
            style={{ background: gradientColors }}
            >
        <div className="container mx-auto flex flex-wrap items-center gap-20">
          <Slider {...sliderSettings} className="w-full">
            <div className="w-full">
              <CarouselImage
                text="Freelancer"
                subtext="Freelancing, which is a term used to describe a career in which a person works for themselves and is hired on a project-by-project basis by different organizations, is becoming a more popular career choice."
              />
            </div>
            <div className="w-full">
              <CarouselImage
                text="Job Seeker"
                subtext="Job seeker refers to an individual who is actively looking for an employment opportunity/job and has submitted an application to the employer."
              />
            </div>
            <div className="w-full">
              <CarouselImage
                text="Service"
                subtext=" Freelanci has three types of accounts: Client, Freelancer, As someone who's engaged independent professionals  you already have a Client account."
              />
            </div>
          </Slider>
        </div>
      </section>
      <section className="explore py-16"
      >
        <div className="container mx-auto">
          <h1 className="text-gray-700 text-3xl font-bold mb-6">
            Explore the marketplace
          </h1>
          <div className="items flex justify-between flex-wrap">
            <div className="item w-1/4 h-36 flex flex-col items-center justify-center cursor-pointer">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/graphics-design.d32a2f8.svg"
                alt=""
                className="w-12 h-12"
              />
              <div className="line w-12 h-2 bg-lightgray transition-all duration-300 mt-2"></div>
              <span className="text-sm font-light">Graphics & Design</span>
            </div>
            <div className="item w-1/4 h-36 flex flex-col items-center justify-center cursor-pointer">
              <img
                 src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/online-marketing.74e221b.svg"
                 alt=""
                className="w-12 h-12"
              />
              <div className="line w-12 h-2 bg-lightgray transition-all duration-300 mt-2"></div>
              <span className="text-sm font-light">Digital Marketing</span>
            </div>
            <div className="item w-1/4 h-36 flex flex-col items-center justify-center cursor-pointer">
              <img
                src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/video-animation.f0d9d71.svg"
                alt=""
                className="w-12 h-12"
              />
              <div className="line w-12 h-2 bg-lightgray transition-all duration-300 mt-2"></div>
              <span className="text-sm font-light">Video & Animation</span>
            </div>
            <div className="item w-1/4 h-36 flex flex-col items-center justify-center cursor-pointer">
              <img
                 src="https://fiverr-res.cloudinary.com/npm-assets/@fiverr/logged_out_homepage_perseus/apps/programming.9362366.svg"
                 alt=""
                className="w-12 h-12"
              />
              <div className="line w-12 h-2 bg-lightgray transition-all duration-300 mt-2"></div>
              <span className="text-sm font-light">Programming & Tech</span>
            </div>
            {/* ... (other items) ... */}
          </div>
        </div>
      </section>
      <section className="features dark  text-white py-16"
                  style={{ background: downUpgradient }}
                  >
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-4">
              Freelanci <i className="italic">business</i>
            </h1>
            <h1 className="text-3xl font-bold mb-4">
              A business solution designed for{" "}
              <i className="italic">teams</i>
            </h1>
            <p className="text-lg mb-6">
              Upgrade to a curated experience packed with tools and benefits,
              dedicated to businesses
            </p>
            <div className="title flex items-center mb-4">
              <img src={checkImg} alt="" className="w-6 h-6 mr-2" />
              Connect to freelancers with proven business experience
            </div>
            <div className="title flex items-center mb-4">
              <img src={checkImg} alt="" className="w-6 h-6 mr-2" />
              Get matched with the perfect talent by a customer success manager
            </div>
            <div className="title flex items-center mb-4">
              <img src={checkImg} alt="" className="w-6 h-6 mr-2" />
              Manage teamwork and boost productivity with one powerful workspace
            </div>
            {/* ... (other titles) ... */}
          </div>
          <div className="flex items-center">
            <img className="image rounded-full bg-white" src={landImg} alt="" />
          </div>
        </div>
      </section>
      {/* ... (additional code if any) ... */}
    </div>
  );
}

export default Home;
