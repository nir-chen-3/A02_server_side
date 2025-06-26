import jwt from "jsonwebtoken";
import Card from "../models/cardModel.js";

import { usersData } from "./usersData.js";
import { cardData } from "./cardData.js";
import { loginUser } from "./loginUser.js";
import { createCard } from "./createCard.js";

export async function seedInitialCards() {
  const existing = await Card.find();
  if (existing.length > 0) {
    console.log("Cards already exist. Skipping cards seeding.");
    return;
  }

  console.log("Seeding initial cards...");

  try {
    const token = await loginUser({
      email: usersData[2].email,
      password: usersData[2].password,
    });
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    for (const card of cardData) {
      try {
        await createCard(card, decoded);
        console.log(`Created card: ${card.title}`);
      } catch (err) {
        console.error(
          `Failed to create card "${card.title}":`,
          err.message || err
        );
      }
    }

    console.log("✅ Initial cards created.");
  } catch (err) {
    console.error("Failed to seed cards:", err.message || err);
  }
}
