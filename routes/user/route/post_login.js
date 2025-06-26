import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import { User } from "../../../models/userModel.js";
import { signInValidation } from "../../../validations/user_validation/userValidation.js";

const router = express.Router();

// POST /users/login
router.post("/", async (req, res) => {
  // 1. Validate user input
  const { error } = signInValidation.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const { email, password } = req.body;

  // 2. Find user by email
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send("Invalid email or password");

  // 3. Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send("Invalid email or password");

  // 4. Create token
  const token = jwt.sign(
    {
      _id: user._id,
      isBusiness: user.isBusiness,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_KEY
  );

  // 5. Return token
  res.send({ token });
});

export default router;
