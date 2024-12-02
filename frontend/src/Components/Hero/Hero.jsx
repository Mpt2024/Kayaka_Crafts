import React from "react";
import './Hero.css'
import arrow from '../Assets/arrow.png'
import koudi2hero2 from '../Assets/Kinnal Toys4.png';

const Hero = () => {
  return <div className="hero">
    <div className="hero-left">
    
      <p>Welcome to Kayaka</p>

      <div>
        <div className="hero-hand-icon">
          <h2>Where Artistry Meets Craftsmanship!</h2>

       
        </div>
        <h2>Explore Unique,</h2>
        <h2>  Handcrafted Treasures Made Just for You.</h2>
      </div>
      <div className="hero-latest-btn">
        <div>
       
          Latest collections
          <img src={ arrow } alt="" />
        </div>
      </div>
    </div>
    <div className="hero-right">
  <img src={koudi2hero2} alt="" style={{width:'400px',height:'550px'}}/>
    </div>

  </div>;
};

export default Hero;
