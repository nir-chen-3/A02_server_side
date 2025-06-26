import express from "express";
import Card from "../../../models/cardModel.js";

const router = express.Router();

// GET /cards/:id - get card by ID (public)
router.get("/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    if (!card) return res.status(404).json({ message: "Card not found" });
    res.json(card);
  } catch (err) {
    res.status(400).json({ message: "Invalid card ID" });
  }
});

export default router;
