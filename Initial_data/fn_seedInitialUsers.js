// seed/seedUsers.js
import { User } from "../models/userModel.js";
import { registerUser } from "./fn_registerUser.js";
import { usersData, user_admin_dataFlag } from "./usersData.js";

export async function seedInitialUsers() {
  const existing = await User.find();
  if (existing.length > 0) {
    console.log("Users already exist. Skipping users seeding.");
    return;
  }

  console.log("Seeding initial users...");

  for (let i = 0; i < usersData.length; i++) {
    await registerUser(usersData[i], user_admin_dataFlag[i]);
  }

  console.log("✅ Initial users created.");
}
