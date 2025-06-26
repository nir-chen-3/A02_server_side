import Card from "../models/cardModel.js";
import cardValidation from "../validations/card_validation/cardValidation.js";
import generateBizNumber from "../models/generateBizNumber.js";

export async function createCard(cardData, user) {
  if (!user.isBusiness) {
    const error = new Error("Access denied");
    error.status = 403;
    throw error;
  }

  const { error } = cardValidation.validate(cardData);
  if (error) {
    const err = new Error(error.details[0].message);
    err.status = 400;
    throw err;
  }

  // Check for unique email in cards collection
  const emailExists = await Card.findOne({ email: cardData.email });
  if (emailExists) {
    const err = new Error("Email must be unique");
    err.status = 409;
    throw err;
  }

  // Generate unique bizNumber
  const bizNumber = await generateBizNumber();

  const card = new Card({
    ...cardData,
    bizNumber,
    user_id: user._id,
  });

  await card.save();
  return card;
}
