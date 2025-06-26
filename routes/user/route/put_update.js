import express from "express";
import bcrypt from "bcrypt";

import { User } from "../../../models/userModel.js";
import authMW from "../../../middleware/auth.js";
import { userUpdateValidation } from "../../../validations/user_validation/userUpdateValidation.js";

const router = express.Router();

// PUT /users/:id → Update profile (but not email, _id, isAdmin, isBusiness)
router.put("/:id", authMW, async (req, res) => {
  const userId = req.params.id;

  if (req.user._id !== userId && !req.user.isAdmin) {
    return res.status(403).send("Access denied.");
  }

  // Strip protected fields before validation to avoid validation errors or updates
  const protectedFields = ["_id", "email", "isAdmin", "isBusiness"];
  protectedFields.forEach((field) => delete req.body[field]);

  // Validate update data
  const { error } = userUpdateValidation.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // Normalize name fields (optional)
  if (req.body.name) {
    if (req.body.name.first)
      req.body.name.first = req.body.name.first.toLowerCase();
    if (req.body.name.last)
      req.body.name.last = req.body.name.last.toLowerCase();
    if (req.body.name.middle)
      req.body.name.middle = req.body.name.middle.toLowerCase();
  }

  // Hash password if provided
  if (req.body.password) {
    req.body.password = await bcrypt.hash(req.body.password, 14);
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) return res.status(404).send("User not found.");

    res.send(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong.");
  }
});

export default router;
