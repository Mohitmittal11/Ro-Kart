const express = require("express");
const Controller = require("../Controllers/bannercontroller");
const banner_router = express.Router();
const validator = require("../Middleware/validatorMiddleware");

banner_router.post("/insertData", Controller.addData);
banner_router.get("/getData", Controller.getdatabylimit);
banner_router.get("/getDatas/:id", Controller.getDatabyId);
banner_router.patch("/updateData/:id", Controller.updateSpecificData);
banner_router.delete("/deletebannerData/:id", Controller.deleteBannerData);
banner_router.patch("/updateStatus/:id", Controller.updateStatus);

module.exports = banner_router;

// const cloudinary = require("cloudinary").v2;
// const path = require("path");

// const dUri= new Datauri();

// router.get("/", async (req, res) => {
//   res.send("This is a Get request Perform");
// });

// router.post("/insertData", async (req, res) => {
//   const formData = await req.body.data;
//   console.log("ImageData is", formData);

//   try {
//     const fileData = formData.image;

//     const cloudinaryResult = await cloudinary.uploader.upload(fileData, {
//       eager_async: true,
//     });
//     console.log(cloudinaryResult);

//     const result = await bannerModel
//       .create([
//         {
//           title: formData.title,
//           image: cloudinaryResult.url,
//           position: formData.position,
//           status: formData.status,
//         },
//       ])
//       .then((data) => res.json(data))
//       .catch((err) => res.json(err));
//   } catch (err) {
//     console.log("Error is ", err);
//   }
// });

// router.get("/getData", async (req, res) => {
//   const limit = req.query.limit;
//   const pageNumber = req.query.page;
//   const skip = (pageNumber - 1) * limit;
//   const totalDocument = await bannerModel.countDocuments();
//   const data = await bannerModel
//     .find()
//     .sort({ createdAt: -1 })
//     .skip(skip)
//     .limit(limit);
//   res.json({ record: data, totalDocument: totalDocument });
// });

// router.get("/getDatas/:id", async (req, res) => {
//   const parameters = req.params;
//   // console.log("Id is ",parameters.id);
//   await bannerModel
//     .findOne({ _id: parameters.id })
//     .then((data) => res.json({ data: data, statusCode: 200 }))
//     .catch((err) => res.json(err));
// });

// router.patch("/updateData/:id", async (req, res) => {
//   const updateDatavalue = req.body.data;
//   console.log("Editable Data Value is", updateDatavalue);
//   try {
//     const imageData = updateDatavalue.image;
//     const cloudinaryImageResult = await cloudinary.uploader.upload(imageData, {
//       eager_async: true,
//     });
//     console.log("Cloudinary Image Result is ", cloudinaryImageResult);
//     await bannerModel
//       .updateOne(
//         { _id: req.params.id },
//         {
//           title: updateDatavalue.title,
//           status: updateDatavalue.status,
//           position: updateDatavalue.position,
//           image: cloudinaryImageResult.url,
//         }
//       )
//       .then((data) => res.json(data))
//       .catch((err) => console.log("error is ", err));
//   } catch (err) {
//     console.log(err);
//   }
// });

// router.post("/file", async (req, res) => {
//   const file = req.files;
// });

// router.delete("/deletebannerData/:id", async (req, res) => {
//   await bannerModel
//     .deleteOne({ _id: req.params.id })
//     .then((data) => res.json(data))
//     .catch((err) => res.json(err));
// });

// router.patch("/updateStatus/:id", async (req, res) => {
//   const parameters = await req.params;
//   console.log("Parameter is", parameters);
//   const updateData = await req.body;

//   console.log("Body Data is", updateData);
//   const response = await bannerModel
//     .find({ _id: req.params.id })
//     .updateOne({}, { status: req.body.statusData });

//   console.log("Response is", response);
// });
// // API For Testimonials

// router.post("/addtestimonials", async (req, res) => {
//   const bodyData = await req.body.bodyRequest;
//   console.log("Body Info is", bodyData);
//   if (bodyData) {
//     try {
//       const result = await testimonialsModel.create(bodyData);
//       res.json(result);
//     } catch (err) {
//       res.json(err);
//     }
//   }
// });

// // For get the Testimonials Data

// router.get("/getTestimonialsData", async (req, res) => {
//   const limit = req.query.limit;
//   const page = req.query.page;
//   const skip = (page - 1) * limit;
//   console.log(`Limit is ${limit} and Page is ${page}`);
//   const totalDocument = await testimonialsModel.countDocuments({
//     isDelete: false,
//   });
//   console.log("Total Document is ", totalDocument);

//   const result = await testimonialsModel
//     .find({ isDelete: false })
//     .sort({ createdAt: -1 })
//     .skip(skip)
//     .limit(limit);
//   if (result) {
//     res.json({ statusCode: 200, data: result, totalDocuments: totalDocument });
//   } else {
//     res.json({ statusCode: 400, data: null });
//   }
// });

// // For Get the data of Specific Id

// router.get("/getTestimonialsDataatID/:id", async (req, res) => {
//   const idTogetData = await req.params.id;

//   console.log("Id to Get Data", idTogetData);
//   if (idTogetData) {
//     try {
//       const result = await testimonialsModel.findOne({ _id: req.params.id });

//       res.json({ statusCode: 200, data: result });
//     } catch (err) {
//       res.json({ statusCode: 400, data: err.message });
//     }
//   }
// });

// // Update Data At Specific Id

// router.patch("/updateTestimonialsatSpecificId/:id", async (req, res) => {
//   const idtoUpdateData = await req.params.id;

//   console.log("Id to Update Data is", idtoUpdateData);

//   const result = await testimonialsModel.updateOne(
//     { _id: idtoUpdateData },
//     {
//       username: req?.body?.bodyData?.username,
//       address: {
//         place: req.body?.bodyData?.address?.place,
//         city: req.body?.bodyData?.address?.city,
//       },
//       description: req.body?.bodyData?.description,
//       status: req.body?.bodyData?.status,
//     }
//   );
//   if (result) {
//     res.json({
//       statusCode: 200,
//       messsage: "Data Successfully Updated",
//       respone: result,
//     });
//   } else {
//     res.json({ message: "Data Not Updated" });
//   }
// });

// // Delete Testimonials at Frontend

// router.patch("/deleteTestimonialsDataatFronend/:id", async (req, res) => {
//   const idToDeleteData = await req.params.id;

//   console.log("Id to Update Data ", idToDeleteData);
//   const result = await testimonialsModel.updateOne(
//     { _id: idToDeleteData },
//     {
//       isDelete: true,
//     }
//   );
//   if (result) {
//     res.json({
//       statusCode: 200,
//       message: "Field Updated Succefully",
//       response: result,
//     });
//   } else {
//     res.json({ message: "Field Did not Updated" });
//   }
// });

// // Update Status for Testimonials

// router.patch("/updateStatusatTestimonials/:id", async (req, res) => {
//   const id = req.params.id;
//   const value = req.body.value;
//   console.log(`Id for Status Update is ${id} and Status Value is ${value}`);
//   const result = await testimonialsModel.updateOne(
//     { _id: id },
//     { status: value }
//   );
//   if (result) {
//     res.json({
//       statusCode: 200,
//       msg: "Status Updated Successfully",
//       response: result,
//     });
//   } else {
//     res.json({ msg: "Status Does not Updated" });
//   }
// });
