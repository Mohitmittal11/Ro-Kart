const Joi = require("joi");

const SubscriptionValidation = Joi.object({
  image: Joi.string().required().messages({
    "string.base": "Image should be a type of text",
    "string.empty": "Image cannot be an empty field",
    "any.required": "Image is a required field",
  }),

  subscription_type: Joi.string()
    .valid("Day", "Month", "Year")
    .required()
    .messages({
      "string.base": "Subscription type should be a type of text",
      "string.empty": "Subscription type cannot be an empty field",
      "any.required": "Subscription type is a required field",
    }),

  membership_type: Joi.string().valid("Silver", "Gold").required().messages({
    "string.base": "Membership type should be a type of text",
    "string.empty": "Membership type cannot be an empty field",
    "any.required": "Membership type is a required field",
  }),

  facilities: Joi.array().items(Joi.string()).min(1).required().messages({
    "array.base": "Facilities should be an array of strings",
    "array.min": "Facilities must contain at least one item",
    "any.required": "Facilities is a required field",
  }),

  refundable: Joi.string().valid("Yes", "No").required().messages({
    "string.base": "Refundable should be a type of text",
    "string.empty": "Refundable cannot be an empty field",
    "any.required": "Refundable is a required field",
  }),

  mrp: Joi.number().required().messages({
    "number.base": "MRP should be a type of number",
    "number.empty": "MRP cannot be an empty field",
    "any.required": "MRP is a required field",
  }),

  discount_percent: Joi.number().min(0).max(100).required().messages({
    "number.base": "Discount percent should be a type of number",
    "number.min": "Discount percent cannot be less than 0",
    "number.max": "Discount percent cannot be more than 100",
    "number.empty": "Discount percent cannot be an empty field",
    "any.required": "Discount percent is a required field",
  }),

  discount: Joi.number().required().messages({
    "number.base": "Discount should be a type of number",
    "number.empty": "Discount cannot be an empty field",
    "any.required": "Discount is a required field",
  }),

  current_price: Joi.number().required().messages({
    "number.base": "Current price should be a type of number",
    "number.empty": "Current price cannot be an empty field",
    "any.required": "Current price is a required field",
  }),

  status: Joi.string().valid("Available", "Unavailable").required().messages({
    "string.base": "Status should be a type of text",
    "string.empty": "Status cannot be an empty field",
    "any.required": "Status is a required field",
  }),
});

module.exports = SubscriptionValidation;
