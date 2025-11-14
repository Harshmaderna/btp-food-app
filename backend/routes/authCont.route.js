import express from "express";
import authController from "../controllers/authController.js";
import isAuth from "../middleware/isAuth.js";

const userRouter = express.Router();

userRouter.get("/current", isAuth, authController.getCurrentUser);

export default userRouter;
