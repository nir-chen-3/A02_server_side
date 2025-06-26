import express from "express";
const router = express.Router();

import { User } from "../../../models/userModel.js";
import authMW from "../../../middleware/auth.js";

// GET /users/:id → Get a specific user (self or admin)
router.get("/:id", authMW, async (req, res) => {
  const targetUserId = req.params.id;

  // Only allow if requesting own profile or admin
  if (req.user._id !== targetUserId && !req.user.isAdmin) {
    return res.status(403).send("Access denied.");
  }

  try {
    const user = await User.findById(targetUserId).select("-password");
    if (!user) return res.status(404).send("User not found.");

    res.send(user);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

export default router;
