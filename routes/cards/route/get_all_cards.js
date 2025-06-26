import express from "express";
import Card from "../../../models/cardModel.js";

const router = express.Router();

// GET /cards - get all cards (public)
router.get("/", async (req, res) => {
  try {
    const cards = await Card.find().sort({ createdAt: -1 });
    res.json(cards);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
