const { Schema, model } = require("mongoose");
const Joi = require("joi");

const schemaCreate = Joi.object({
  name: Joi.string().min(3).required(),
  phone: Joi.number().min(0.1).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  favorite: Joi.bool(),
});
const schemaPatch = Joi.object({
  favorite: Joi.bool().required(),
});
const schema = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

const Contact = model("contact", schema);

module.exports = { Contact, schemaCreate, schemaPatch };
