import { FaStar } from "react-icons/fa";
import "./TrustSection.css";

const TrustSection = () => {
  return (
    <div className="trust-section">
      <div className="trust-content">

        <div className="trust-heading">
          <FaStar className="trust-star" />
          <h2>
            TRUSTED BY 50,000+ COLLECTORS ACROSS EUROPE
          </h2>
        </div>

        <p className="trust-subtext">
          Featured in private collections, not mass retailers.
        </p>

      </div>
    </div>
  );
};

export default TrustSection;
