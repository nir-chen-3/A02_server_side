import express from "express";
import Card from "../../../models/cardModel.js";
import auth from "../../../middleware/auth.js";

const router = express.Router();

// PATCH /cards/:id - like/unlike a card (toggle)
router.patch("/:id", auth, async (req, res) => {
  try {
    const cardId = req.params.id;
    const userId = req.user._id;

    const card = await Card.findById(cardId);
    if (!card) return res.status(404).json({ message: "Card not found" });

    const index = card.likes.findIndex(
      (id) => id.toString() === userId.toString()
    );

    if (index === -1) {
      // Not liked yet → like it
      card.likes.push(userId);
    } else {
      // Already liked → unlike it
      card.likes.splice(index, 1);
    }

    await card.save();
    res.json(card);
  } catch (err) {
    res.status(400).json({ message: "Invalid card ID" });
  }
});

export default router;
