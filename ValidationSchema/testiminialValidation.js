const Joi = require("joi");

const testimonialsValidation = Joi.object({
  username: Joi.string().required().messages({
    "string.base": "Username should be a type of text",
    "string.empty": "Username cannot be an empty field",
    "any.required": "Username is a required field",
  }),

  address: Joi.object({
    place: Joi.string().required().messages({
      "string.base": "Place should be a type of text",
      "string.empty": "Place cannot be an empty field",
      "any.required": "Place is a required field",
    }),
    city: Joi.string().required().messages({
      "string.base": "City should be a type of text",
      "string.empty": "City cannot be an empty field",
      "any.required": "City is a required field",
    }),
  }),

  description: Joi.string().required().messages({
    "string.base": "Description should be a type of text",
    "string.empty": "Description cannot be an empty field",
    "any.required": "Description is a required field",
  }),

  status: Joi.string().valid("Active", "InActive").required().messages({
    "string.base": "Status should be a type of text",
    "string.empty": "Status cannot be an empty field",
    "any.required": "Status is a required field",
  }),
});

module.exports = testimonialsValidation;
