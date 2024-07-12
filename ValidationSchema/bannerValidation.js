const Joi = require("joi");

const bannerValidationSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.base": "Title should be a type of text",
    "string.empty": "Title cannot be an empty field",
    "any.required": "Title is a required field",
  }),

  image: Joi.string().required().messages({
    "string.base": "Image should be a type of text",
    "string.empty": "Image cannot be an empty field",
    "any.required": "Image is a required field",
  }),

  position: Joi.number().required().messages({
    "number.base": "Position should be a type of number",
    "number.empty": "Position cannot be an empty field",
    "any.required": "Position is a required field",
  }),

  status: Joi.string().valid("Active", "InActive").required().messages({
    "string.base": "Status should be a type of text",
    "string.empty": "Status cannot be an empty field",
    "any.required": "Status is a required field",
  }),
});

module.exports = bannerValidationSchema;
