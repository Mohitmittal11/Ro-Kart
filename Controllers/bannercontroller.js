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
  const limit = req.query.limit;
  const pageNumber = req.query.page;
  const skip = (pageNumber - 1) * limit;
  const totalDocument = await bannerModel.countDocuments({ isDelete: false });
  try {
    const data = await bannerModel
      .find({ isDelete: false })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    if (data) {
      res.json({ record: data, totalDocument: totalDocument });
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
