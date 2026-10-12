import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { getUser } from "../services/jwt.js";

const authenticateUser = async (req, res, next) => {
  try {

    const token = req.cookies.token;

    const decoded = getUser(token);

const user = await User.findById(decoded.userId)
  .select("-password");

if (!user) {
  return res.status(401).json({
    message: "User not found"
  });
}

    req.user = user;

    next();

  } catch (error) {
    return res.status(401).json({
      message: "Invalid token"
    });
  }
};

export default authenticateUser;