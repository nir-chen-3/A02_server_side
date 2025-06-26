import express from "express";
const router = express.Router();

import { User } from "../../../models/userModel.js";
import authMW from "../../../middleware/auth.js";

// PATCH /users/:id → toggle isBusiness field automatically
router.patch("/:id", authMW, async (req, res) => {
  const userId = req.params.id;

  // Only user themselves or admin can toggle
  if (req.user._id !== userId && !req.user.isAdmin) {
    return res.status(403).send("Access denied.");
  }

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).send("User not found.");

    // Flip isBusiness
    user.isBusiness = !user.isBusiness;

    await user.save();

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;

    res.send(userWithoutPassword);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong.");
  }
});

export default router;
