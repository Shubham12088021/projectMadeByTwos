import "./AboutUs.css";
import { useEffect } from "react";

function AboutUs() {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-creative-wrapper">

      {/* INTRO SPLIT SECTION */}
      <section className="about-split">

        <div className="about-left">
          <h1>
            More Than Shoes. <br />
            <span>It’s An Identity.</span>
          </h1>

          <p>
            We design footwear for those who move with purpose.
            Every pair is engineered for confidence,
            comfort and timeless style.
          </p>

          <div className="about-stats">
            <div>
              <h3>50K+</h3>
              <span>Customers</span>
            </div>
            <div>
              <h3>120+</h3>
              <span>Designs</span>
            </div>
            <div>
              <h3>4.8★</h3>
              <span>Ratings</span>
            </div>
          </div>
        </div>

        <div className="about-right">
          <img
            src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519"
            alt="Luxury Sneakers"
          />
        </div>

      </section>


      {/* CRAFT SECTION */}
      <section className="about-craft">
        <h2>Crafted With Precision</h2>

        <p>
          From premium leather selection to ergonomic sole design,
          our footwear is built with attention to detail and modern aesthetics.
          We blend craftsmanship with innovation.
        </p>
      </section>


      {/* VALUE CARDS */}
      <section className="about-values">

        <div className="value-card">
          <h4>Premium Quality</h4>
          <p>
            High-grade materials sourced responsibly for durability and comfort.
          </p>
        </div>

        <div className="value-card">
          <h4>Modern Design</h4>
          <p>
            Minimal silhouettes inspired by urban fashion culture.
          </p>
        </div>

        <div className="value-card">
          <h4>Comfort First</h4>
          <p>
            Engineered cushioning that supports every step.
          </p>
        </div>

      </section>

    </div>
  );
}

export default AboutUs;
