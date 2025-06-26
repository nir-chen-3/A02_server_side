import express from "express";
const router = express.Router();

import getAllCards from "./route/get_all_cards.js"; // GET
import getMyCards from "./route/get_my_cards.js";
import getById from "./route/get_card_by_id.js";

import postCard from "./route/post_card.js"; // POST /cards/
import putCard from "./route/put_card.js"; // PUT /cards/:id
import deleteCard from "./route/delete_card.js"; // DELETE /cards/:id

import likeToggle from "./route/patch_like_toggle.js";
import patchBizNumber from "./route/patch_update_biz_number.js";

router.use("/", getAllCards); // GET all cards
router.use("/", getMyCards);
router.use("/", getById);

router.use("/", postCard); // post new card
router.use("/", putCard); // update card
router.use("/", deleteCard); // delete card

router.use("/", likeToggle); // PATCH /cards/:id (like/unlike)
router.use("/", patchBizNumber);

export default router;
