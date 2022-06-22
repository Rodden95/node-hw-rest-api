const { Schema, model } = require("mongoose");
const Joi = require("joi");
const gravatar = require("gravatar");
const schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "employee"], default: "employee" },
  token: {
    type: String,
    default: null,
  },
  avatarUrl: {
    type: String,
    default: function () {
      return gravatar.url(this.email, {}, true);
    },
  },
  // createdBy: { ref: "user", type: Schema.Types.ObjectId, required: true },
});

const schemaRegistr = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  role: Joi.string(),

  // code: Joi.string().pattern(codeRegex).required(),
});
const schemaLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
const User = model("user", schema);

module.exports = { User, schemaRegistr, schemaLogin };
