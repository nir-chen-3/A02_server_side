// helpers/registerUser.js
import bcrypt from "bcrypt";
import { User } from "../models/userModel.js";
import { userValidation } from "../validations/user_validation/userValidation.js";

export async function registerUser(userData, user_admin_dataFlag = false) {
  // 1. Validate
  const { error } = userValidation.validate(userData);
  if (error) throw new Error(error.details[0].message);

  // 2. Check if email exists
  const existing = await User.findOne({ email: userData.email });
  if (existing) throw new Error("User with this email already exists");

  // 3. Hash password and save
  const hashed = await bcrypt.hash(userData.password, 14);
  const user = await User.create({
    ...userData,
    password: hashed,
    isAdmin: user_admin_dataFlag || false,
  });

  // 4. Return user without password
  const { password, ...userWithoutPassword } = user.toObject();
  return userWithoutPassword;
}
