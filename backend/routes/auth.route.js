import express from "express";
import userController from "../controllers/user_controller.js";

const authRouter = express.Router()

authRouter.post("/signup", userController.signupUser)
authRouter.post("/signin", userController.signInUser)
authRouter.get("/signout", userController.signOutUser)

authRouter.post("/send-otp", userController.sendOtp)
authRouter.post("/verify-otp", userController.verifyOtp)
authRouter.post("/reset-password", userController.resetPassword)
authRouter.post("/reset-password", userController.resetPassword)

authRouter.post("/google-auth", userController.googleAuth)


export default authRouter;
 