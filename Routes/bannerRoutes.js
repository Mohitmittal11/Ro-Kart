const express = require("express");
const Controller = require("../Controllers/bannercontroller");
const banner_router = express.Router();
const validator = require("../Middleware/validatorMiddleware");
const upload = require("../Multer/multerConfig");

banner_router.post(
  "/insertData",
  upload.single("image"),
  validator("banner"),
  Controller.addData
);
banner_router.get("/getData", Controller.getdatabylimit);
banner_router.get("/getDatas/:id", Controller.getDatabyId);
banner_router.patch("/updateData/:id", Controller.updateSpecificData);
banner_router.delete("/deletebannerData/:id", Controller.deleteBannerData);
banner_router.patch("/updateStatus/:id", Controller.updateStatus);

module.exports = banner_router;
