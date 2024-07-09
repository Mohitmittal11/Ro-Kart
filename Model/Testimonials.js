const { HostAddress } = require("mongodb");
const mongoose = require("mongoose");

const TestimonialsSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    address: {
      place: {
        type: String,
      },
      city: {
        type: String,
      },
    },
    description: {
      type: String,
    },
    status:{
        type:String
    },
    isDelete:{
        type: Boolean,
        default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("testimonials", TestimonialsSchema);
