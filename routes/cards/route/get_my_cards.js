import express from "express";
import Card from "../../../models/cardModel.js";
import auth from "../../../middleware/auth.js";

const router = express.Router();

// GET /cards/my-cards - get cards of logged-in user (protected)
router.get("/my-cards", auth, async (req, res) => {
  try {
    const userId = req.user._id;
    const cards = await Card.find({ user_id: userId }).sort({ createdAt: -1 });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
