const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false },

    // 🔥 Email Verification Fields
    isVerified: { type: Boolean, default: false },
    emailOtp: String,
    emailOtpExpiry: Date,

    // 🔥 Forgot Password Fields
    resetPasswordToken: String,
    resetPasswordExpiry: Date
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
