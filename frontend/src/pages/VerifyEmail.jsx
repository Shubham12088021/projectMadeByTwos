import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

function VerifyEmail() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [loading, setLoading] = useState(false);

  // 🔥 TIMER STATES
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // 🔥 Countdown Logic
  useEffect(() => {
    if (timer === 0) {
      setCanResend(true);
      return;
    }

    const interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer]);

  // 🔥 Handle OTP Change
  const handleOtpChange = (e, index) => {
    const value = e.target.value;
    if (!/^[0-9]?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && e.target.nextSibling) {
      e.target.nextSibling.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      e.target.previousSibling.focus();
    }
  };

  const handlePaste = (e) => {
    const pastedData = e.clipboardData.getData("Text").trim();
    if (!/^[0-9]{6}$/.test(pastedData)) return;

    setOtp(pastedData.split(""));
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    if (loading) return;

    const finalOtp = otp.join("");

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/users/verify-email", {
        email,
        otp: finalOtp,
      });

      toast.success("Email verified successfully!");
      navigate("/login");

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Verification failed"
      );
    } finally {
      setLoading(false);
    }
  };

  // 🔥 RESEND OTP FUNCTION
  const handleResend = async () => {
    if (!canResend) {
      toast.info(`Please wait ${timer}s before resending OTP`);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/users/resend-otp", {
        email,
      });

      toast.success("New OTP sent successfully!");

      setTimer(30);
      setCanResend(false);

    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to resend OTP"
      );
    }
  };


  return (
    <div className="auth-page">
      <div className="auth-card">
        <h2 className="title">Verify Your Email</h2>

        <form onSubmit={handleVerify}>
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="field">
            <label>Enter OTP</label>

            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOtpChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  onPaste={handlePaste}
                  style={{
                    width: "45px",
                    height: "50px",
                    fontSize: "20px",
                    textAlign: "center",
                    borderRadius: "6px",
                    border: "1px solid #ccc"
                  }}
                />
              ))}
            </div>
          </div>

          <button className="login-btn" disabled={loading}>
            {loading ? "Verifying..." : "Verify Email"}
          </button>

          {/* 🔥 RESEND SECTION */}
          <p
            style={{
              marginTop: "15px",
              textAlign: "center",
              color: canResend ? "#111" : "#999",
              cursor: canResend ? "pointer" : "not-allowed",
              transition: "0.3s"
            }}
            onClick={handleResend}
          >
            {canResend
              ? "Resend OTP"
              : `Resend OTP in ${timer}s`}
          </p>

        </form>
      </div>
    </div>
  );
}

export default VerifyEmail;
