import express from "express";
import bcrypt from "bcrypt";
import { User } from "../../../models/userModel.js";
import { userValidation } from "../../../validations/user_validation/userValidation.js";

const router = express.Router();

router.post("/", async (req, res) => {
  // 1. Validate input
  const { error } = userValidation.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // 2. Check for existing user
  const existingUser = await User.findOne({ email: req.body.email });
  if (existingUser)
    return res.status(409).send("User with this email already exists");

  try {
    // 3. Hash password and create user
    const hashedPassword = await bcrypt.hash(req.body.password, 14);

    const user = await User.create({
      ...req.body,
      password: hashedPassword,
      isAdmin: false,
    });

    // 4. Send plain object without password
    const { password, ...userWithoutPassword } = user.toObject();
    res.status(201).send(userWithoutPassword);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

export default router;
