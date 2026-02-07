import Slider from "react-slick";
import "./brandStory.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { useLocation } from "react-router-dom";
import { motion } from "framer-motion";

function BrandStory() {
  const location = useLocation();

  const isHomePage = location.pathname === "/";
  const isMenPage = location.pathname.startsWith("/men");
  const isWomenPage = location.pathname.startsWith("/women");

  /* ===== SLIDER SETTINGS ===== */
  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 1,
    swipeToSlide: true,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 4 } },
      { breakpoint: 768, settings: { slidesToShow: 3, arrows: false } },
      { breakpoint: 480, settings: { slidesToShow: 2, arrows: false } },
    ],
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="brand-story-long">

      {/* ===== AS SEEN ON ===== */}
      <div className="seen-on">
        <p className="seen-title">As seen on</p>

        <div className="logo-slider-wrapper">
          <Slider {...settings} className="logo-slider">
            <img src="/images/femina.jpeg" alt="Femina" />
            <img src="/images/elle.jpeg" alt="Elle" />
            <img src="/images/cosmopolitan.jpeg" alt="Cosmopolitan" />
            <img src="/images/grazia.jpeg" alt="Grazia" />
            <img src="/images/homegrown.jpeg" alt="Homegrown" />
            <img src="/images/label.jpeg" alt="Label" />
            <img src="/images/lbb.jpeg" alt="LBB" />
            <img src="/images/traveler.jpeg" alt="Traveler" />
          </Slider>
        </div>
      </div>

      {/* ===== CONTENT ===== */}
      <div className="container">
        <div className="row align-items-center">

          {/* ===== TEXT ===== */}
          <motion.div
            className="col-md-7 story-text"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* ===== HOME PAGE INTRO ONLY ===== */}
            {isHomePage && (
              <>
                <h2>Welcome to MyStore</h2>
                <h4>Find Your Perfect Pair of Handcrafted Shoes</h4>

                <p>
                  MyStore creates premium handcrafted footwear that blends
                  traditional craftsmanship with modern aesthetics — designed
                  for comfort, durability and timeless style.
                </p>
              </>
            )}

            {/* ===== MEN ===== */}
            {(isHomePage || isMenPage) && (
              <>
                <h3>Men’s Collection</h3>
                <p>
                  Built for strength and refined style, our men’s footwear
                  delivers everyday comfort with classic silhouettes,
                  crafted to last and designed to impress.
                </p>
              </>
            )}

            {/* ===== WOMEN ===== */}
            {(isHomePage || isWomenPage) && (
              <>
                <h3>Women’s Collection</h3>
                <p>
                  Designed for modern women, our footwear blends elegance,
                  lightness and effortless comfort — perfect for everyday
                  wear with a touch of sophistication.
                </p>
              </>
            )}

            {/* ===== HOME PAGE EXTRA ===== */}
            {(isHomePage || isMenPage || isWomenPage) && (
              <>
                <h3>Let’s Talk About Our Shoes</h3>
                <ul>
                  <li><strong>Brogues:</strong> Timeless classics for every occasion.</li>
                  <li><strong>Slip-ons:</strong> Easy, stylish and versatile.</li>
                  <li><strong>Sneakers:</strong> Handcrafted comfort meets modern design.</li>
                  <li><strong>Mules:</strong> Effortless elegance for all-day wear.</li>
                  <li><strong>High-tops:</strong> Bold silhouettes with premium finish.</li>
                </ul>
              </>
            )}

            {/* ===== COMMON END ===== */}
            {(isHomePage || isMenPage || isWomenPage) && (
              <>
                <h3>Why Choose MyStore?</h3>
                <p>
                  Every pair is thoughtfully handcrafted using premium
                  materials, ensuring long-lasting comfort, durability
                  and style you can rely on.
                </p>
              </>
            )}
          </motion.div>

          {/* ===== SIDE NOTE ===== */}
          <div className="col-md-5 story-image">
            <p className="made-in">
              Proudly designed and handcrafted in India ❤️ 🇮🇳
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default BrandStory;
