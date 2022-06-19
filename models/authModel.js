const { Schema, model } = require("mongoose");
const Joi = require("joi");

const schema = new Schema({
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  subscription: {
    type: String,
    enum: ["starter", "pro", "business"],
    default: "starter",
  },
  token: {
    type: String,
    default: null,
  },
  // createdBy: { ref: "user", type: Schema.Types.ObjectId, required: true },
});

const schemaSignup = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  subscription: Joi.string(),

  // code: Joi.string().pattern(codeRegex).required(),
});
const schemaLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
const User = model("user", schema);

module.exports = { User, schemaSignup, schemaLogin };
