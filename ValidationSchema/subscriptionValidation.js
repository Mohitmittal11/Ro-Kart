const Joi = require("joi");

const SubscriptionValidation = Joi.object({
  image: Joi.string().required(),
  subscription_type: Joi.string().required(),
  membership_type: Joi.string().required(),
  facilities: Joi.array().items(Joi.string()).min(1).required(),
  refundable: Joi.string().required(),
  mrp: Joi.number().required(),
  discount_percent: Joi.number().min(0).max(100).required(),
  discount: Joi.number().required(),
  current_price: Joi.number().required(),
  status: Joi.string().required(),
});

module.exports = SubscriptionValidation;
