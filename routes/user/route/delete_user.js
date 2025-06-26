import express from "express";
const router = express.Router();

import { User } from "../../../models/userModel.js";
import authMW from "../../../middleware/auth.js";

// DELETE /users/:id → Delete a user (self or admin), but never an admin account
router.delete("/:id", authMW, async (req, res) => {
  const userId = req.params.id;

  // Allow only self or admin
  if (req.user._id !== userId && !req.user.isAdmin) {
    return res.status(403).send("Access denied.");
  }

  try {
    const userToDelete = await User.findById(userId);
    if (!userToDelete) {
      return res.status(404).send("User not found.");
    }

    // Prevent deleting admin users
    if (userToDelete.isAdmin) {
      return res.status(403).send("Admin users cannot be deleted.");
    }

    const deletedUser = await User.findByIdAndDelete(userId).select(
      "-password"
    );
    res.send(deletedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong.");
  }
});

export default router;
