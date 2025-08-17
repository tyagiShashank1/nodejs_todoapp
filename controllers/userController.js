import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ErrorHandler from "../middlewares/error.js";

export const isAuthenticated = async (req, res, next) => {
  const { Access_Token } = req.cookies; //getting the cookie from client side
  if (Access_Token) {
    const decodedToken = jwt.verify(Access_Token, process.env.JWT_SECRET);
    req.user = await User.findById(decodedToken.id);
    if (!req.user) res.json({ message: "Invalid-Login!" });
    next();
  } else {
    res.json({ message: "Please Login!" });
  }
};

export const home = (req, res) => {
  res.json({ message: "Register or Login Successfull" });
};

//Register
export const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    let user = await User.findOne({
      email: email,
    });
    if (user) {
      return next(new ErrorHandler("User already exists, Please login.", 404));
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await User.create({
        name: name,
        email: email,
        password: hashedPassword,
      });
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.cookie("Access_Token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      });
      res.status(201).json({
        success: true,
        message: "New User created and sending for authentication check.",
        user,
        redirectTo: "/",
      });
    }
  } catch (error) {
    next(error);
  }
};

//login
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email }).select("+password");
    if (!user) return next(new ErrorHandler("Please Login First", 404));
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.cookie("Access_Token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      });
      res.json({
        success: true,
        message: "Post Login route passed",
        redirectTo: "/",
      });
    } else {
      res.json({
        message: "User does not exist. Please Sign Up.",
      });
    }
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res,next) => {
  try {
    const { Access_Token } = req.cookies;
    if (!Access_Token) res.json({ message: "Already Logged Out" });
    else {
      res.clearCookie("Access_Token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
      });
      res.json({ message: "Logged Out Successfully" });
    }
  } catch (error) {
    next(error);
  }
};

export const getMydetail = async (req, res) => {
  try {
    res.json({
      message: "User found successfully.",
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};
