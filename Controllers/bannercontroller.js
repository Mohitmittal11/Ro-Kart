const bannerModel = require("../Model/banner_data");
const cloudinary = require("cloudinary").v2;
exports.addData = async (req, res) => {
  const bodyReqest = await req.body;

  try {
    const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
      eager_async: true,
    });
    console.log(cloudinaryResult);

    const formdatatoUpdate = {
      ...bodyReqest,
      image: cloudinaryResult.secure_url,
    };

    const result = await bannerModel.create(formdatatoUpdate);
    if (result) {
      res.json({ statusCode: 200, data: result });
    }
  } catch (err) {
    res.json({ error: err });
  }
};

exports.getdatabylimit = async (req, res) => {
  const limit = req.query.limit ? req.query.limit : 5;
  const pageNumber = req.query.page ? req.query.page : 1;
  const title = req?.query?.title;
  const status = req?.query?.status;
  const skip = (pageNumber - 1) * limit;
  try {
    let conditions = {
      isDelete: false,
    };
    if (title && title !== null && title !== undefined) {
      conditions = {
        ...conditions,
        title: { $regex: `${title}`, $options: "i" },
      };
    }
    if (status && status !== null && status !== undefined) {
      conditions = {
        ...conditions,
        status: status,
      };
    }

    console.log(conditions, "conditions");
    const data = await bannerModel
      .find(conditions)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    const totalDocument = await bannerModel.countDocuments(conditions);
    if (data && data.length > 0) {
      res.json({
        totalDocument: totalDocument,
        message: "Data found successfuly",
        record: data,
      });
    } else {
      res.json({
        totalDocument: totalDocument,
        message: "No data found",
        record: data,
      });
    }
  } catch (err) {
    res.json({ errorMessage: err });
  }
};

exports.getDatabyId = async (req, res) => {
  const parameters = req.params;
  await bannerModel
    .findOne({ _id: parameters.id, isDelete: false })
    .then((data) => res.json({ data: data, statusCode: 200 }))
    .catch((err) => res.json(err));
};

exports.updateSpecificData = async (req, res) => {
  const updateDatavalue = req.body;
  console.log("Editable Data Value is", updateDatavalue);
  try {
    const imageData = updateDatavalue.image;
    const cloudinaryImageResult = await cloudinary.uploader.upload(imageData, {
      eager_async: true,
    });
    console.log("Cloudinary Image Result is ", cloudinaryImageResult);
    await bannerModel
      .updateOne(
        { _id: req.params.id },
        {
          title: updateDatavalue.title,
          status: updateDatavalue.status,
          position: updateDatavalue.position,
          image: cloudinaryImageResult.url,
        }
      )
      .then((data) => res.json(data))
      .catch((err) => console.log("error is ", err));
  } catch (err) {
    console.log(err);
  }
};

exports.deleteBannerData = async (req, res) => {
  await bannerModel
    .updateOne({ _id: req.params.id }, { isDelete: true })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
};

exports.updateStatus = async (req, res) => {
  const parameters = await req.params.id;
  console.log("Parameter is", parameters);
  const updateData = await req.body.data;
  console.log("Update Data is ", updateData);

  const response = await bannerModel
    .find({ _id: parameters })
    .updateOne({ isDelete: false }, { status: updateData });

  if (response) {
    res.json({ updatemessage: response });
  }
};

// exports.getNamedmatchData = async (req, res) => {
//   const titleMatched = await req?.body?.title;
//   const statusMatched = await req?.body?.status;
//   const limit = req?.query?.limit;
//   const page = req?.query?.page;
//   const skipDocument = (page - 1) * limit;
//   console.log("Name Match Data is ", titleMatched);
//   console.log("Status Matched Data is ", statusMatched);

//   try {
//     if (titleMatched) {
//       const totalMatchedDocument = await bannerModel.countDocuments({
//         $text: { $search: `${titleMatched}` },
//         isDelete: false,
//       });

//       console.log("Total Document is ", totalMatchedDocument);
//       const result = await bannerModel
//         .find({
//           $text: { $search: `${titleMatched}` },
//           isDelete: false,
//         })
//         .sort({ createdAt: -1 })
//         .skip(skipDocument)
//         .limit(limit);
//       if (result) {
//         res.json({
//           statusCode: 200,
//           data: result,
//           totalMatchedDocument: totalMatchedDocument,
//         });
//       } else {
//         res.json({ errorMessage: "Data Does not Match" });
//       }
//     } else if (statusMatched) {
//       const totalMatchedDocument = await bannerModel.countDocuments({
//         status: statusMatched,
//         isDelete: false,
//       });
//       const matchedStatusResult = await bannerModel
//         .find({
//           status: statusMatched,
//           isDelete: false,
//         })
//         .sort({ createdAt: -1 })
//         .skip(skipDocument)
//         .limit(limit);

//       if (matchedStatusResult) {
//         res.json({
//           statusCode: 200,
//           data: matchedStatusResult,
//           totalMatchedDocument: totalMatchedDocument,
//         });
//       }
//     }
//     // else if (statusMatched && titleMatched) {
//     //   const totalDocuments = bannerModel.countDocuments({
//     //     status: statusMatched,
//     //     $search: { $text: `${titleMatched}`, isDelete: false },
//     //   });

//     //   console.log("Total Document that data contain is", totalDocuments);
//     // }
//   } catch (err) {
//     res.json({ errorMessage: err });
//   }
// };
