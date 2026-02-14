const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  verifyEmailOtp,
  resendOtp,
  forgotPassword,
  resetPassword
} = require("../controllers/authController");

// Register
router.post("/register", registerUser);

// Verify Email OTP
router.post("/verify-email", verifyEmailOtp);

// Login
router.post("/login", loginUser);

//resend-otp
router.post("/resend-otp", resendOtp);

//forgot-password
router.post("/forgot-password", forgotPassword);

//reset-password
router.post("/reset-password/:token", resetPassword);


module.exports = router;
