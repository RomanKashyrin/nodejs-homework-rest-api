const { Schema, model, SchemaTypes } = require("mongoose");
const Joi = require("joi");

const schemaContact = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for contact"],
    },
    email: {
      type: String,
      required: [true, "Set email for contact"],
    },
    phone: {
      type: String,
      required: [true, "Set phone for contact"],
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: SchemaTypes.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { versionKey: false, timestamps: true }
);

const Contact = model("contact", schemaContact);

const schemaAddContact = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().min(5).required(),
  favorite: Joi.boolean().required(),
});

const schemaUpdateContact = Joi.object({
  name: Joi.string().min(3),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.string().min(5),
  favorite: Joi.boolean(),
});

const schemaUpdateStatus = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  schemaAddContact,
  schemaUpdateContact,
  schemaUpdateStatus,
};

module.exports = {
  Contact,
  schemas,
};
