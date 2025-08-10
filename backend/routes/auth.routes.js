import express from "express";
import {
  signInUser,
  signUpNewUser,
  
} from "../controllers/auth.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";
import User from "../models/User.js";
// import User from "../models/User.js";
const router = express.Router();

router.post("/signin", signInUser);
router.post("/signup", signUpNewUser);

router.get("/signout", (req, res) => {
  res.send("the signout page");
});


router.get("/dash", protectedRoute, async (req, res) => {
  console.log("USERDETAILS: ", req.user);
  res.status(200).send(req.user);
});

export default router;
