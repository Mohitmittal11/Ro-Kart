const mongoose = require("mongoose");

const SubscriptionData = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    subscription_type: {
      type: String,
    },
    membership_type: {
      type: String,
    },
    facilities: [{ type: String }],
    refundable: {
      type: String,
    },
    mrp: {
      type: Number,
    },
    discount_percent: {
      type: Number,
    },
    discount: {
      type: Number,
    },
    current_price: {
      type: Number,
    },
    status: {
      type: String,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("subscription", SubscriptionData);
