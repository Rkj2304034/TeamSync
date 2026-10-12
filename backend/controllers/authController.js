import User from "../models/User.js";
import bcrypt from "bcryptjs";
import {generateToken} from "../services/jwt.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({
      success: true,
      user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};



export const login = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        message: "Incorrect Password"
      });
    }

    const token = generateToken(user._id);

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      success: true,
      user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};


export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};


export const getAuthUser = async(req,res) => {

    return res.status(200).json({
      success :  true,
      user : req.user
    })  

}



export const getAllUsers = async(req,res) => {

  try{

    const others = await User.find({_id : { $ne : req.user._id}}).select("-password")

    return res.status(200).json({
      success : true,
      others
    })

  }
  catch(error){
    return res.status(500).json({
      message : error.message
    })
  }

}