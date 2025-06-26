import Joi from "joi";
import validation from "./userJoiSchema.js";

// Safe update schema (excludes: _id, email, isAdmin, isBusiness)
export const userUpdateValidation = Joi.object({
  name: validation.name.optional(),
  phone: validation.phone.optional(),
  password: validation.password.optional(),
  image: validation.image.optional(),
  address: validation.address.optional(),
});
