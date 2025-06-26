import mongoose from "mongoose";
import {
  phoneRegex,
  emailRegex,
  imageUrlRegex,
} from "../validations/regexPatterns.js";

const userSchema = new mongoose.Schema({
  name: {
    first: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 256,
    },
    middle: {
      type: String,
      minlength: 2,
      maxlength: 256,
      default: "",
    },
    last: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 256,
    },
  },
  phone: {
    type: String,
    required: true,
    minlength: 9,
    maxlength: 11,
    match: phoneRegex,
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    unique: true,
    match: emailRegex,
  },
  password: {
    type: String,
    required: true,
    // minlength: very long - typical bcrypt hash length min 60
  },
  image: {
    url: {
      type: String,
      minlength: 14,
      default: "",
      validate: {
        validator: (value) => value === "" || imageUrlRegex.test(value),
        message: "URL must be a valid image address (jpg, png, etc.) or empty.",
      },
    },
    alt: {
      type: String,
      default: "",
      validate: {
        validator: (value) =>
          value === "" || (value.length >= 2 && value.length <= 256),
        message: "Alt text must be empty or between 2 and 256 characters.",
      },
    },
  },
  address: {
    state: {
      type: String,
      default: "",
    },
    country: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 256,
    },
    city: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 256,
    },
    street: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 256,
    },
    houseNumber: {
      type: Number,
      required: true,
      min: 1,
    },
    zip: {
      type: Number,
      required: true,
    },
  },
  isBusiness: { type: Boolean, required: true },
  isAdmin: { type: Boolean, required: true, default: false },
  createdAt: { type: Date, default: Date.now },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema, "users");

export { User };
