import express from "express";
import Card from "../../../models/cardModel.js";
import auth from "../../../middleware/auth.js";
import cardValidation from "../../../validations/card_validation/cardValidation.js";
import generateBizNumber from "../../../models/generateBizNumber.js"; // ✅ import helper

const router = express.Router();

// POST /cards - create card (Business only)
router.post("/", auth, async (req, res) => {
  if (!req.user.isBusiness)
    return res.status(403).json({ message: "Access denied" });

  const { error } = cardValidation.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    // Check if email already exists (safe pre-check)
    const emailExists = await Card.findOne({ email: req.body.email });
    if (emailExists) {
      return res.status(409).json({ message: "Email must be unique" });
    }

    // generate unique bizNumber
    const bizNumber = await generateBizNumber();

    const card = new Card({ ...req.body, bizNumber, user_id: req.user._id });
    await card.save();

    res.status(201).json(card);
  } catch (err) {
    if (err.code === 11000 && err.keyPattern?.email) {
      return res.status(409).json({ message: "Email must be unique" });
    }
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
