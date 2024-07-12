const express = require("express");
const subscriptionRouter = express.Router();
const SubscriptionController = require("../Controllers/subscriptioncontroller");
const validator = require("../Middleware/validatorMiddleware");
const upload = require("../Multer/multerConfig");

subscriptionRouter.post(
  "/addsubscriptiondata",
  upload.single("image"),
  validator("subscription"),

  SubscriptionController.addSubscriptionUser
);

subscriptionRouter.get(
  "/getCompleteSubscriptionData",
  SubscriptionController.getComplete_Subscription_Data
);

subscriptionRouter.get(
  "/getSubscriptionData",
  SubscriptionController.getSubscriptionDatabyLimit
);

subscriptionRouter.get(
  "/getSubscriptiondataforUpdate/:id",
  SubscriptionController.getSubscriptionDatabyId
);

subscriptionRouter.patch(
  "/updatesubscriptionData/:id",
  SubscriptionController.updateSubscriptionData
);

subscriptionRouter.patch(
  "/deletesubscriptionData/:id",
  SubscriptionController.delete_SubscriptionData_at_frontend
);

subscriptionRouter.patch(
  "/updateStatusData/:id",
  SubscriptionController.subscriptionStatus_Update
);

module.exports = subscriptionRouter;
