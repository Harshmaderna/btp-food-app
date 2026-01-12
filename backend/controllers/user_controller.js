import user from "../models/user.model.js";
import bcrypt from "bcryptjs";
import genToken from "../utils/token.js";
import sendOtpMail from "../utils/mail.js";

const userController = {
  signupUser: async (req, res) => {
    try {
      const { fullName, email, password, mobile, role } = req.body;

      if (!fullName || !email || !password || !mobile || !role) {
        return res.status(400).json({ message: "All fields are required" });
      }
      if (password.length < 6) {
        return res
          .status(400)
          .json({ message: "Password must be at least 6 characters" });
      }
      if (mobile.length < 10) {
        return res
          .status(400)
          .json({ message: "mobile number must be at least 10 digits" });
      }

      const existingUser = await user.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ message: "User already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await user.create({
        fullName,
        email,
        password: hashedPassword,
        mobile,
        role,
      });
      const token = await genToken(newUser.id);
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.status(201).json({
        message: "User registered successfully",
        data: newUser,
      });
    } catch (error) {
      console.log("Error", error.mesage);  
      return res
        .status(500)
        .json({ message: "internal server error", error: error.message });
    }
  },

  signInUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
      const existingUser = await user.findOne({ where: { email } });
      if (!existingUser) {
        return res.status(400).json({ message: "User does not exists" });
      }

      const isPasswordMatch = await bcrypt.compare(
        password, 
        existingUser.password 
      );
      if (!isPasswordMatch) {
        return res
          .status(401)
          .json({ message: "Invalid credential email or password" });
      }

      const token = await genToken(existingUser.id);
      res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.status(200).json({
        message: "User loggedIn successfully",
        data: existingUser,
      });
    } catch (error) {
      console.log("Error", error.message);
      return res
        .status(500)
        .json({ message: "internal server error", error: error.message });
    }
  },

  signOutUser: async (req, res) => {
    try {
      // 🔒 Clear the JWT cookie
      res.clearCookie("token", {
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });

      return res.status(200).json({
        message: "User logged out successfully",
      });
    } catch (error) {
      console.log("Logout Error:", error.message);
      return res.status(500).json({
        message: "Internal server error",
        error: error.message,
      });
    }
  },

  sendOtp: async (req, res) => {
    try {
      const { email } = req.body;
      const users = await user.findOne({ where: { email } });
      if (!users) {
        return res.status(404).json({ message: "User not found" });
      }
      const otp = Math.floor(100000 + Math.random() * 900000).toString();
      const otpExpire = new Date(Date.now() + 5 * 60 * 1000);

      users.resetOtp = otp;
      users.otpExpire = otpExpire;
      users.isOTPVerified = false;
      await users.save();
      await sendOtpMail(email, otp);
      return res.status(200).json({
        success: true,
        message: "OTP sent successfully to your email",
      });
    } catch (error) {
      console.error("OTP Send Error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error while sending OTP",
        error: error.mesage,
      });
    }
  },

  verifyOtp: async (req, res) => {
    try {
      const { email, otp } = req.body;
      const users = await user.findOne({ where: { email } });
      if (!users) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }
      if (users.resetOtp !== otp) {
        return res.status(400).json({ success: false, message: "Invalid OTP" });
      }
      if (users.otpExpire < new Date()) {
        return res
          .status(400)
          .json({ success: false, message: "OTP has expired" });
      }
      users.isOTPVerified = true;
      users.resetOtp = null;
      users.otpExpire = null;
      await users.save();
      return res.status(200).json({
        success: true,
        message: "OTP verified successfully",
      });
    } catch (error) {
      console.error("OTP Verify Error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error while verifying OTP",
      });
    }
  },
  resetPassword: async (req, res) => {
    try {
      const { email, newPassword } = req.body;
      console.log("Reset password body:", req.body);

      const users = await user.findOne({ where: { email } });
      if (!users) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      if (!users.isOTPVerified) {
        return res
          .status(403)
          .json({ success: false, message: "OTP not verified" });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      users.password = hashedPassword;
      users.isOTPVerified = false;
      users.resetOtp = null;
      users.otpExpire = null;

      await users.save();
      return res.status(200).json({
        success: true,
        message: "Password reset successfully",
      });
    } catch (error) {
      console.error("Reset Password Error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error while resetting password",
        error: error.message,
      });
    }
  },
  googleAuth: async (req, res) => {
    try {
      const { fullName, email, mobile, role } = req.body;

      if (!email) {
        return res
          .status(400)
          .json({ success: false, message: "Email is required" });
      }

      let users = await user.findOne({ where: { email } });

      if (!users) {
        const hashedPassword = await bcrypt.hash("google_auth_user", 10);

        users = await user.create({
          fullName,
          email,
          mobile,
          role: role || "user",
          password: hashedPassword,
          isGoogleUser: true,
        });
      }

      const token = genToken(users.id);

      res.cookie("token", token, {
        secure: false,
        sameSite: "strict",
        httpOnly: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
 
      
      return res.status(200).json({
        success: true,
        message: "Google login/signup successful",
        user: {
          id: users.id,
          fullName: users.fullName,
          email: users.email,
        },
        token,
      }); 
    } catch (error) {
      console.error("Google Auth Error:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error during Google Auth",
        error: error.message,
      });
    }
  },
};

export default userController;
