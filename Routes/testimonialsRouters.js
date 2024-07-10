const express = require("express");
const testimonialrouter = express.Router();
const validator = require("../Middleware/validatorMiddleware");

const TestimonialController = require("../Controllers/testimonialcontroller");

testimonialrouter.post(
  "/addtestimonials",
  validator("testimonial"),
  TestimonialController.add_Testimonialdata
);

testimonialrouter.get(
  "/getTestimonialsData",
  TestimonialController.get_Testimonial_databylimit
);

testimonialrouter.get(
  "/getTestimonialsDataatID/:id",
  TestimonialController.get_Testimonial_Data_byId
);

testimonialrouter.patch(
  "/updateTestimonialsatSpecificId/:id",
  TestimonialController.updateTestimonialData
);

testimonialrouter.patch(
  "/deleteTestimonialsDataatFronend/:id",
  TestimonialController.delete_Testimonial_Data
);

testimonialrouter.patch(
  "/updateStatusatTestimonials/:id",
  TestimonialController.update_Testimonial_Status
);

module.exports = testimonialrouter;
