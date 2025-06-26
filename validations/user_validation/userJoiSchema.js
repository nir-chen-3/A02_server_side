import Joi from "joi";
import {
  phoneRegex,
  emailRegex,
  imageUrlRegex,
  passwordRegex,
} from "../regexPatterns.js";

const validation = {
  name: Joi.object({
    first: Joi.string()
      .min(2)
      .max(256)
      .required()
      .label("First Name")
      .messages({
        "string.empty": "{#label} is required",
        "string.min": "{#label} must be at least {#limit} characters",
        "string.max": "{#label} must be at most {#limit} characters",
      }),
    middle: Joi.string()
      .min(2)
      .max(256)
      .optional()
      .allow("")
      .label("Middle Name")
      .messages({
        "string.min": "{#label} must be at least {#limit} characters",
        "string.max": "{#label} must be at most {#limit} characters",
      }),
    last: Joi.string().min(2).max(256).required().label("Last Name").messages({
      "string.empty": "{#label} is required",
      "string.min": "{#label} must be at least {#limit} characters",
      "string.max": "{#label} must be at most {#limit} characters",
    }),
  }).required(),

  phone: Joi.string()
    .min(9)
    .max(11)
    .regex(phoneRegex)
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
    .regex(emailRegex)
    .min(5)
    .required()
    .label("Email")
    .messages({
      "string.empty": "{#label} is required",
      "string.min": "{#label} must be at least {#limit} characters",
      "string.pattern.base": "{#label} must be a valid email address",
    }),

  password: Joi.string()
    .regex(passwordRegex)
    .min(9)
    .max(20)
    .required()
    .label("Password")
    .messages({
      "string.empty": "{#label} is required",
      "string.min": "{#label} must be at least {#limit} characters",
      "string.max": "{#label} must be at most {#limit} characters",
      "string.pattern.base":
        "{#label} must contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*-)",
    }),

  image: Joi.object({
    url: Joi.string()
      .regex(imageUrlRegex)
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
    state: Joi.string()
      .min(2)
      .max(256)
      .optional()
      .allow("")
      .label("State")
      .messages({
        "string.min": "{#label} must be at least {#limit} characters",
        "string.max": "{#label} must be at most {#limit} characters",
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
    houseNumber: Joi.number()
      .min(1)
      .max(9999999)
      .required()
      .label("House Number")
      .messages({
        "number.base": "{#label} must be a number",
        "number.min": "{#label} must be at least {#limit}",
        "number.max": "{#label} must be at most {#limit}",
        "any.required": "{#label} is required",
      }),
    zip: Joi.number().min(1).max(9999999).required().label("ZIP").messages({
      "number.base": "{#label} must be a number",
      "number.min": "{#label} must be at least {#limit}",
      "number.max": "{#label} must be at most {#limit}",
      "any.required": "{#label} is required",
    }),
  }).required(),

  isBusiness: Joi.boolean().required().label("Is Business").messages({
    "boolean.base": "{#label} must be true or false",
    "any.required": "{#label} is required",
  }),
};

export default validation;
