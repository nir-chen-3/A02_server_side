import express from "express";
import Card from "../../../models/cardModel.js";
import auth from "../../../middleware/auth.js";

const router = express.Router();

// DELETE /cards/:id - delete card (owner or admin only)
router.delete("/:id", auth, async (req, res) => {
  const cardId = req.params.id;

  try {
    const card = await Card.findById(cardId);
    if (!card) return res.status(404).json({ message: "Card not found" });

    // Only owner or admin can delete
    if (
      card.user_id.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    const deletedCard = await Card.findByIdAndDelete(cardId);
    res.json(deletedCard);
  } catch (err) {
    res.status(400).json({ message: "Invalid card ID" });
  }
});

export default router;
