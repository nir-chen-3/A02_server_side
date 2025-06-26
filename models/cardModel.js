import mongoose from "mongoose";
import {
  phoneRegex,
  emailRegex,
  imageUrlRegex,
} from "../validations/regexPatterns.js";

const cardSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  subtitle: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 256,
  },
  description: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 1024,
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
  web: {
    type: String,
    minlength: 14,
  },
  image: {
    url: {
      type: String,
      minlength: 14,
      default: "",
      validate: {
        validator: function (value) {
          return value === "" || imageUrlRegex.test(value);
        },
        message: "URL must be a valid image address (jpg, png, etc.) or empty.",
      },
    },
    alt: {
      type: String,
      default: "",
      validate: {
        validator: function (value) {
          return value === "" || (value.length >= 2 && value.length <= 256);
        },
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
    },
  },
  bizNumber: {
    type: Number,
    required: true,
    min: 100,
    max: 9999999999,
    unique: true,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "User",
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Card = mongoose.model("Card", cardSchema, "cards");

export default Card;
