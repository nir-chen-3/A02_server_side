import express from "express";
import Card from "../../../models/cardModel.js";
import auth from "../../../middleware/auth.js";
import cardValidation from "../../../validations/card_validation/cardValidation.js";

const router = express.Router();

// PUT /cards/:id - update a card (protected)
router.put("/:id", auth, async (req, res) => {
  const cardId = req.params.id;

  // Validate input
  const { error } = cardValidation.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const card = await Card.findById(cardId);
    if (!card) return res.status(404).json({ message: "Card not found" });

    if (
      card.user_id.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    // Check if another card (not the current one) has the same email
    const existing = await Card.findOne({ email: req.body.email });
    if (existing && existing._id.toString() !== cardId) {
      return res.status(409).json({ message: "Email must be unique" });
    }

    // Perform update
    const updatedCard = await Card.findByIdAndUpdate(cardId, req.body, {
      new: true,
      runValidators: true,
    });

    res.json(updatedCard);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
