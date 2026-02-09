import Slider from "react-slick";
import "./HeroSection.css";

function CollectionHero({ slides, overlay = 0.5 }) {
  const settings = {
    infinite: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: false,
    pauseOnHover: false
  };

  return (
    <section className="hero">
      <Slider {...settings} className="hero-slider">
        {slides.map((slide, index) => (
          <div className="hero-slide" key={index}>
            {/* IMAGE */}
            <img
              src={slide.image}
              alt={slide.title}
              className="hero-media"
            />

            {/* OVERLAY */}
            <div
              className="hero-overlay"
              style={{
                background: `linear-gradient(
                  90deg,
                  rgba(0,0,0,${overlay}),
                  rgba(0,0,0,0.15)
                )`
              }}
            />

            {/* TEXT (PER SLIDE) */}
            <div className="hero-content">
              <h1 className="hero-title">{slide.title}</h1>
              <p className="hero-text">{slide.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default CollectionHero;
