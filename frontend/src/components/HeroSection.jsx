import HeroVideo from "../assets/herosectionvideo.mp4";
import "./HeroSection.css";

function HeroSection() {
  return (
    <section className="hero">
      {/* Background Video */}
      <video className="hero-video" autoPlay loop muted playsInline>
        <source src={HeroVideo} type="video/mp4" />
      </video>

      {/* Soft Overlay */}
      <div className="hero-overlay"></div>

      {/* LEFT & LOWER CONTENT */}
      <div className="hero-content">
        <h1 className="hero-title">Discover Your Style</h1>

        <p className="hero-text">
          Premium fashion for men & women — designed for everyday confidence.
        </p>

        <div className="hero-buttons">
          <button className="btn-premium">Shop for Men</button>
          <button className="btn-premium">Shop for Women</button>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
