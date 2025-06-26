import express from "express";
const router = express.Router();

import { User } from "../../../models/userModel.js";
import authMW from "../../../middleware/auth.js";

// GET /users → Return all users (admin only)
router.get("/", authMW, async (req, res) => {
  if (!req.user.isAdmin) {
    return res.status(403).send("Access denied. Admins only.");
  }

  try {
    const users = await User.find().select("-password");
    res.send(users);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong.");
  }
});

export default router;
