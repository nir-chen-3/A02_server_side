import Joi from "joi";
import _ from "lodash";
import validation from "./userJoiSchema.js";

export const userValidation = Joi.object(validation).required();
export const signInValidation = Joi.object(
  _.pick(validation, ["email", "password"])
).required();
