const subscriptionModel = require("../Model/subscription");
const cloudinary = require("../Cloudinary/config");
exports.addSubscriptionUser = async (req, res) => {
  try {
    const completeformData = await req.body;

    if (req.file.path) {
      const cloudinaryImageRes = await cloudinary.uploader.upload(
        req.file.path,
        { eager_async: true }
      );

      const formResultData = {
        ...completeformData,
        image: cloudinaryImageRes.secure_url,
      };
      const response = await subscriptionModel.create(formResultData);

      if (response) {
        res.json({ statusCode: 200, data: response });
      }
    }
  } catch (err) {
    res.json(err);
  }
};

exports.getSubscriptionDatabyLimit = async (req, res) => {
  const page = req.query.activePage;
  const limit = req.query.limit;
  const skip = (page - 1) * limit;

  const totalDocument = await subscriptionModel.countDocuments({
    isDelete: false,
  });
  console.log("Tottal document is", totalDocument);

  const result = await subscriptionModel
    .find({ isDelete: false })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  if (result.length > 0) {
    res.json({ statuscode: 200, data: result, totalDocument: totalDocument });
  } else {
    res.json({ statuscode: 400, data: "No Data Found" });
  }
};

exports.getSubscriptionDatabyId = async (req, res) => {
  const getID = req.params.id;
  const response = await subscriptionModel.findOne({ _id: getID });

  if (response) {
    res.json({ statusCode: 200, data: response });
  } else {
    res.json({ statusCode: 400, data: "No Data Found for This ID" });
  }
};

exports.getComplete_Subscription_Data = async (req, res) => {
  const totalDocuments = await subscriptionModel.countDocuments({
    isDelete: false,
  });
  console.log("Total Documents is", totalDocuments);
  const currentPage = req.query.pageNumber;
  const limitData = req.query.limit;
  const skip = (currentPage - 1) * limitData;
  console.log(`Current Page is ${currentPage} and Limit is ${limitData}`);

  const result = await subscriptionModel
    .find({ isDelete: false })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limitData);
  if (result) {
    res.json({ statusCode: 200, data: result, totalDocument: totalDocuments });
  } else {
    res.json({ msg: "No Data Found" });
  }
};

exports.updateSubscriptionData = async (req, res) => {
  const idtoUpdateData = req.params.id;
  console.log("Id to which data to update", idtoUpdateData);
  const imageData = await req.body.data.image;
  console.log("Image Value is", imageData);
  const cloudinaryResult = await cloudinary.uploader.upload(imageData, {
    eager_async: true,
  });

  const response = await subscriptionModel.updateOne(
    { _id: idtoUpdateData },
    {
      image: cloudinaryResult.url,
      subscription_type: req.body.data.subscription_type,
      membership_type: req.body.data.membership_type,
      facilities: req.body.data.facilities,
      refundable: req.body.data.refundable,
      mrp: req.body.data.mrp,
      discount_percent: req.body.data.discount_percent,
      discount: req.body.data.discount,
      current_price: req.body.data.current_price,
      status: req.body.data.status,
    }
  );
  if (response) {
    res.json({ statusCode: 200, data: response });
  } else {
    res.json({ statusCode: 400, msg: "Data not Updated" });
  }
};

exports.delete_SubscriptionData_at_frontend = async (req, res) => {
  const idToDeleteData = req.params.id;
  const result = await subscriptionModel.updateOne(
    { _id: idToDeleteData },
    { isDelete: true }
  );

  res.json(result);
};

exports.subscriptionStatus_Update = async (req, res) => {
  const idToUpdateStatus = req.params.id;

  const result = await subscriptionModel.updateOne(
    { _id: idToUpdateStatus },
    { status: req.body.status }
  );
  res.json(result);
};

// // Subsription API

// //for add the form Data
// router.post(
//   "/addsubscriptiondata",
//   // multerUpload.single("image"),
//   async (req, res) => {
//     try {
//       const result = await req.body.bodyData;
//       console.log("Result is ", result);

//       // console.log("Request",req.body.image);

//       if (result) {
//         // console.log("Request file is", req.file);
//         // const extName = path.extname(req.file.originalname).toString();
//         // const file64 = parser.format(extName, req.file.buffer);

//         // const cloudinaryData = file64.content;
//         // console.log("Base 64 url is", file64.base64);
//         const cloudinaryImageRes = await cloudinary.uploader.upload(
//           result.image,
//           { eager_async: true }
//         );

//         console.log("Cloudinary result is ", cloudinaryImageRes);

//         const formResultData = { ...result, image: cloudinaryImageRes.url };

//         const response = await subscriptionModel.create(
//           formResultData

//           // {
//           //   image: cloudinaryImageRes.url,
//           //   subscription_type: result.subscription_type,
//           //   membership_type: result.membership_type,
//           //   facilities: result.facilities,
//           //   refundable: result.refundable,
//           //   mrp: result.mrp,
//           //   discount_percent: result.discount_percent,
//           //   discount: result.discount,
//           //   current_price: result.current_price,
//           //   status: result.status,
//           // }
//         );

//         res.json(response);
//       }
//     } catch (err) {
//       res.json(err);
//     }
//   }
// );

// // For get Complete SubscriptionData

// router.get("/getCompleteSubscriptionData", async (req, res) => {
//   const totalDocuments = await subscriptionModel.countDocuments({
//     isDelete: false,
//   });
//   console.log("Total Documents is", totalDocuments);
//   const currentPage = req.query.pageNumber;
//   const limitData = req.query.limit;
//   const skip = (currentPage - 1) * limitData;
//   console.log(`Current Page is ${currentPage} and Limit is ${limitData}`);

//   const result = await subscriptionModel
//     .find({ isDelete: false })
//     .sort({ createdAt: -1 })
//     .skip(skip)
//     .limit(limitData);
//   if (result) {
//     res.json({ statusCode: 200, data: result, totalDocument: totalDocuments });
//   } else {
//     res.json({ msg: "No Data Found" });
//   }
// });

// // For get the Data

// router.get("/getSubscriptionData", async (req, res) => {
//   const page = req.query.activePage;
//   const limit = req.query.limit;
//   const skip = (page - 1) * limit;

//   const totalDocument = await subscriptionModel.countDocuments({
//     isDelete: false,
//   });
//   console.log("Tottal document is", totalDocument);

//   const result = await subscriptionModel
//     .find({ isDelete: false })
//     .sort({ createdAt: -1 })
//     .skip(skip)
//     .limit(limit);

//   if (result.length > 0) {
//     res.json({ statuscode: 200, data: result, totalDocument: totalDocument });
//   } else {
//     res.json({ statuscode: 400, data: "No Data Found" });
//   }
// });

// router.get("/getSubscriptiondataforUpdate/:id", async (req, res) => {
//   const getID = req.params.id;
//   const response = await subscriptionModel.findOne({ _id: getID });

//   if (response) {
//     res.json({ statusCode: 200, data: response });
//   } else {
//     res.json({ statusCode: 400, data: "No Data Found for This ID" });
//   }
// });

// //for Edit The Data

// router.patch("/updatesubscriptionData/:id", async (req, res) => {
//   const idtoUpdateData = req.params.id;
//   console.log("Id to which data to update", idtoUpdateData);
//   const imageData = await req.body.data.image;
//   console.log("Image Value is", imageData);
//   const cloudinaryResult = await cloudinary.uploader.upload(imageData, {
//     eager_async: true,
//   });

//   const response = await subscriptionModel.updateOne(
//     { _id: idtoUpdateData },
//     {
//       image: cloudinaryResult.url,
//       subscription_type: req.body.data.subscription_type,
//       membership_type: req.body.data.membership_type,
//       facilities: req.body.data.facilities,
//       refundable: req.body.data.refundable,
//       mrp: req.body.data.mrp,
//       discount_percent: req.body.data.discount_percent,
//       discount: req.body.data.discount,
//       current_price: req.body.data.current_price,
//       status: req.body.data.status,
//     }
//   );
//   if (response) {
//     res.json({ statusCode: 200, data: response });
//   } else {
//     res.json({ statusCode: 400, msg: "Data not Updated" });
//   }
// });

// // for Delete The Data at frontend

// router.patch("/deletesubscriptionData/:id", async (req, res) => {
//   const idToDeleteData = req.params.id;
//   const result = await subscriptionModel.updateOne(
//     { _id: idToDeleteData },
//     { isDelete: true }
//   );

//   res.json(result);
// });

// // API for Status Updated

// router.patch("/updateStatusData/:id", async (req, res) => {
//   const idToUpdateStatus = req.params.id;

//   // console.log("Id for Status Update", idToUpdateStatus, req.body.status);
//   const result = await subscriptionModel.updateOne(
//     { _id: idToUpdateStatus },
//     { status: req.body.status }
//   );
//   res.json(result);
// });
