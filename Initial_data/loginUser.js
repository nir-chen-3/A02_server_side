import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";
import { signInValidation } from "../validations/user_validation/userValidation.js";

/**
 * Validate and login user, returning JWT token if successful.
 * Throws an error with status and message on failure.
 *
 * @param {Object} credentials - Object containing `email` and `password`
 * @returns {Promise<string>} - JWT token
 */
export async function loginUser(credentials) {
  // Validate input
  const { error } = signInValidation.validate(credentials);
  if (error) {
    const err = new Error(error.details[0].message);
    err.status = 400;
    throw err;
  }

  const { email, password } = credentials;

  // Find user
  const user = await User.findOne({ email });
  if (!user) {
    const err = new Error("Invalid email or password");
    err.status = 400;
    throw err;
  }

  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    const err = new Error("Invalid email or password");
    err.status = 400;
    throw err;
  }

  // Create JWT token
  const token = jwt.sign(
    {
      _id: user._id,
      isBusiness: user.isBusiness,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_KEY
  );

  return token;
}
