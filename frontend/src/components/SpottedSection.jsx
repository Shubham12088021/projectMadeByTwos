import Slider from "react-slick";
import "./SpottedSection.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SpottedSection() {

  const settings = {
    dots: false,
    arrows: true,
    infinite: true,
    speed: 600,
    slidesToShow: 4,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2, arrows: false }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, arrows: false }
      }
    ]
  };

  const spottedData = [
    {
      img: "https://images.unsplash.com/photo-1520975916090-3105956dac38",
      desc: "Effortless street style with premium comfort.",
      tag: "@bajpayee.manoj"
    },
    {
        img: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
        desc: "Minimal footwear paired with sharp outfits.",
        tag: "@ayushmannk"
    },
    {
        img: "https://images.unsplash.com/photo-1520975916090-3105956dac38",
        desc: "Effortless street style with premium comfort.",
        tag: "@bajpayee.manoj"
    },
    {
        img: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
      desc: "Minimal footwear paired with sharp outfits.",
      tag: "@ayushmannk"
    },
    {
        img: "https://images.unsplash.com/photo-1600180758890-6b94519a8ba6",
        desc: "Comfort-driven design with modern silhouettes.",
        tag: "@vickykaushal09"
    },
    {
        img: "https://images.unsplash.com/photo-1549298916-b41d501d3772",
        desc: "Minimal footwear paired with sharp outfits.",
        tag: "@ayushmannk"
    },
    {
      img: "https://images.unsplash.com/photo-1523381294911-8d3cead13475",
      desc: "Bold leather shoes for standout looks.",
      tag: "@hrithikroshan"
    },
    {
      img: "https://images.unsplash.com/photo-1519744792095-2f2205e87b6f",
      desc: "Clean white sneakers styled effortlessly.",
      tag: "@ranveersingh"
    }
  ];

  return (
    <section className="spotted-section">
      <div className="container">
        <h2 className="spotted-title">Spotted in Our Soles</h2>
      </div>

      <div className="spotted-slider-wrapper">
        <Slider {...settings} className="spotted-slider">
          {spottedData.map((item, index) => (
            <div className="spotted-slide" key={index}>
              <div className="spotted-card">
                <img src={item.img} alt="Celebrity wearing shoes" />

                <div className="spotted-info">
                  <p>{item.desc}</p>
                  <span>{item.tag}</span>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default SpottedSection;
