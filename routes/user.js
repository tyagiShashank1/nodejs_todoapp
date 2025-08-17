import express from "express";
import {
  createUser,
  getMydetail,
  home,
  isAuthenticated,
  loginUser,
  logoutUser,
} from "../controllers/userController.js";
const router = express.Router();

//ROUTES

//DEFAULT ROUTE
router.get("/", isAuthenticated, home);

//REGISTER
router.post("/register", createUser);

//LOGIN
router.post("/login", loginUser);

//LOGOUT
router.get("/logout", logoutUser);

//GetMyDetail

router.get("/me", isAuthenticated, getMydetail);

//Always try to keep dynamic routes at the last

export default router;
