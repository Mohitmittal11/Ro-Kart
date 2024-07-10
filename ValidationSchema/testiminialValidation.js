const Joi = require("joi");

const testimonialsValidation = Joi.object({
  username: Joi.string().required(),
  address: {
    place: Joi.string().required(),
    city: Joi.string().required(),
  },
  description: Joi.string().required(),
  status: Joi.string().required(),
});

module.exports = testimonialsValidation;
