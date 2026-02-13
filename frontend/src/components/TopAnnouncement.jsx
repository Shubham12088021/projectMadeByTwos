import { useEffect, useState } from "react";
import "./TopAnnouncement.css";

function TopAnnouncement() {
  const messages = [
    "✨ Discover Our Premium Shoe Collection",
    "🚚 Free Shipping On Orders Above ₹1999",
    "🔥 Exclusive Styles – Limited Stock Available"
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="top-strip">
      <div key={index} className="top-text">
        {messages[index]}
      </div>
    </div>
  );
}

export default TopAnnouncement;
