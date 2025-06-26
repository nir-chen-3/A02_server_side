import Joi from "joi";
import cardJoiSchema from "./cardJoiSchema.js";

const cardValidation = Joi.object(cardJoiSchema).required();

export default cardValidation;
