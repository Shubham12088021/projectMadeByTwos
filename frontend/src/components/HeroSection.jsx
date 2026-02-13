import HeroVideo from "../assets/herosectionvideo.mp4";
import "./HeroSection.css";
import { useNavigate } from "react-router-dom";
import MovingStrip from "./MovingStrip";


function HeroSection() {
  const navigate = useNavigate();

  return (
    <>
    <section className="hero">
      {/* Background Video */}
      <video className="hero-video" autoPlay loop muted playsInline>
        <source src={HeroVideo} type="video/mp4" />
      </video>

      {/* Soft Overlay */}
      <div className="hero-overlay"></div>

      {/* Content */}
      <div className="hero-content">
        <h1 className="hero-title">Discover Your Style</h1>

        <p className="hero-text">
          Premium fashion for men & women — designed for everyday confidence.
        </p>

        <div className="hero-buttons">
          <button
            className="btn-premium"
            onClick={() => navigate("/men")}
          >
            Shop for Men
          </button>

          <button
            className="btn-premium"
            onClick={() => navigate("/women")}
          >
            Shop for Women
          </button>
        </div>
      </div>
    </section>
    <MovingStrip />
    </>
  );
}

export default HeroSection;
