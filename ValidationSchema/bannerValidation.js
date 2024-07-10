const Joi= require('joi');

const bannerValidationSchema= Joi.object({
    title: Joi.string().required(),
    image: Joi.string().required(),
    position: Joi.number().required(),
    status: Joi.string().required()
    
})

module.exports= bannerValidationSchema;