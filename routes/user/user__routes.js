import express from "express";
const router = express.Router();

import loginRoute from "./route/post_login.js";
import registerRoute from "./route/post_register.js";

import getAllUsers from "./route/get_all_users.js";

import deleteUser from "./route/delete_user.js";
import getUserById from "./route/get_user_by_id.js";
import putUpdate from "./route/put_update.js";

import patchToggleBusiness from "./route/patch_toggle_business.js";

router.use("/login", loginRoute); // POST /users/login
router.use("/", registerRoute); // POST /users/register

router.use("/", getAllUsers);

router.use("/", deleteUser);
router.use("/", getUserById);
router.use("/", putUpdate);

router.use("/", patchToggleBusiness);

export default router;
