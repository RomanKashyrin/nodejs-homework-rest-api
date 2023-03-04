const { Schema, model } = require("mongoose");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

const schemaUser = new Schema(
  {
    username: {
      type: String,
      required: [true, "Set name for user"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Set password for user"],
    },
    subscription: {
      type: String,
      enum: ["started", "pro", "business"],
      default: "started",
    },
    avatarURL: {
      type: String,
      default: gravatar.url(this.email, {}, true),
    },
    token: {
      type: String,
      default: null,
    },
    verify: {
      type: Boolean,
      default: false,
    },
    verificationToken: {
      type: String,
      required: [true, "Verify token is required"],
    }
  },
  { versionKey: false, timestamps: true }
);

schemaUser.pre("save", async () => {
  if (this.isNew) {
    this.password = await bcrypt.hash(this.password, 10);
  }
});

const User = model("user", schemaUser);

const schemaRegister = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().min(6).required(),
  subscription: Joi.string(),
});

const schemaLogin = Joi.object({
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  password: Joi.string().min(6).required(),
});

const SchemaVerifyEmail = Joi.object({
  email: Joi.required().messages({
    message: "Missing required field email",
  }),
});

const schemaUpdate = Joi.object({
  username: Joi.string().min(3),
  subscription: Joi.string().valid("started", "pro", "business"),
});

const schemas = { schemaRegister, schemaLogin, SchemaVerifyEmail, schemaUpdate };

module.exports = {
  User,
  schemas,
};
