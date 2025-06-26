import Joi from "joi";
import { phoneRegex, emailRegex, imageUrlRegex } from "../regexPatterns.js";

const cardJoiSchema = {
  title: Joi.string().min(2).max(256).required().label("Title").messages({
    "string.empty": "{#label} is required",
    "string.min": "{#label} must be at least {#limit} characters",
    "string.max": "{#label} must be at most {#limit} characters",
  }),

  subtitle: Joi.string().min(2).max(256).required().label("Subtitle").messages({
    "string.empty": "{#label} is required",
    "string.min": "{#label} must be at least {#limit} characters",
    "string.max": "{#label} must be at most {#limit} characters",
  }),

  description: Joi.string()
    .min(2)
    .max(1024)
    .required()
    .label("Description")
    .messages({
      "string.empty": "{#label} is required",
      "string.min": "{#label} must be at least {#limit} characters",
      "string.max": "{#label} must be at most {#limit} characters",
    }),

  phone: Joi.string()
    .pattern(phoneRegex)
    .min(9)
    .max(11)
    .required()
    .label("Phone")
    .messages({
      "string.empty": "{#label} is required",
      "string.pattern.base":
        "{#label} must be a valid phone number (starting with 05 followed by 7 to 9 digits)",
      "string.min": "{#label} must be at least {#limit} characters",
      "string.max": "{#label} must be at most {#limit} characters",
    }),

  email: Joi.string()
    .pattern(emailRegex)
    .min(5)
    .required()
    .label("Email")
    .messages({
      "string.empty": "{#label} is required",
      "string.min": "{#label} must be at least {#limit} characters",
      "string.pattern.base": "{#label} must be a valid email address",
    }),

  web: Joi.string().min(14).optional().allow("").label("Website").messages({
    "string.min": "{#label} must be at least {#limit} characters",
  }),

  image: Joi.object({
    url: Joi.string()
      .pattern(imageUrlRegex)
      .min(14)
      .optional()
      .allow("")
      .label("Image URL")
      .messages({
        "string.pattern.base": "{#label} must be a valid URL",
        "string.min": "{#label} must be at least {#limit} characters long",
      }),

    alt: Joi.string()
      .min(2)
      .max(256)
      .optional()
      .allow("")
      .label("Image Alt")
      .messages({
        "string.min": "{#label} must be at least {#limit} characters",
        "string.max": "{#label} must be at most {#limit} characters",
      }),
  }),

  address: Joi.object({
    state: Joi.string().optional().allow("").label("State").messages({
      "string.base": "{#label} must be a string",
    }),

    country: Joi.string().min(2).max(256).required().label("Country").messages({
      "string.empty": "{#label} is required",
      "string.min": "{#label} must be at least {#limit} characters",
      "string.max": "{#label} must be at most {#limit} characters",
    }),

    city: Joi.string().min(2).max(256).required().label("City").messages({
      "string.empty": "{#label} is required",
      "string.min": "{#label} must be at least {#limit} characters",
      "string.max": "{#label} must be at most {#limit} characters",
    }),

    street: Joi.string().min(2).max(256).required().label("Street").messages({
      "string.empty": "{#label} is required",
      "string.min": "{#label} must be at least {#limit} characters",
      "string.max": "{#label} must be at most {#limit} characters",
    }),

    houseNumber: Joi.number().min(1).required().label("House Number").messages({
      "number.base": "{#label} must be a number",
      "number.min": "{#label} must be at least {#limit}",
      "any.required": "{#label} is required",
    }),

    zip: Joi.number().optional().allow("").label("ZIP").messages({
      "number.base": "{#label} must be a number",
    }),
  }),
};

export default cardJoiSchema;
