import express from "express";
import {
  register,
  login,
  logout,
  getAuthUser,getAllUsers
} from "../controllers/authController.js";
import authenticateUser from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.post("/logout",authenticateUser,logout)
authRouter.get("/me",authenticateUser,getAuthUser )
authRouter.get("/allUsers", authenticateUser, getAllUsers)

export default authRouter;