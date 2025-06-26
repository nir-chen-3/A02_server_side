import express from "express";
import Card from "../../../models/cardModel.js";
import auth from "../../../middleware/auth.js";

const router = express.Router();

// PATCH /cards/biz-number/:id - update bizNumber (Admin only)
router.patch("/biz-number/:id", auth, async (req, res) => {
  const cardId = req.params.id;
  const { bizNumber } = req.body;

  // Ensure user is admin
  if (!req.user.isAdmin) {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

  // Validate bizNumber
  if (
    typeof bizNumber !== "number" ||
    bizNumber < 1000000 ||
    bizNumber > 9999999
  ) {
    return res.status(400).json({
      message: "bizNumber must be a 7-digit number between 1000000 and 9999999",
    });
  }

  try {
    const card = await Card.findById(cardId);
    if (!card) return res.status(404).json({ message: "Card not found" });

    // Check for uniqueness
    const exists = await Card.findOne({ bizNumber });
    if (exists && exists._id.toString() !== cardId) {
      return res
        .status(409)
        .json({ message: "This bizNumber is already taken" });
    }

    card.bizNumber = bizNumber;
    await card.save();

    res.json(card);
  } catch (err) {
    res.status(400).json({ message: "Invalid card ID" });
  }
});

export default router;
