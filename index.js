require("dotenv").config();
const express = require("express");
const app = express();
const databaseConnected = require("./Configuration/config");
const bannerModel = require("./Model/banner_data");
const BodyParser = require("body-parser");
const fileUploader = require("express-fileupload");
const cloudinary = require("cloudinary").v2;
const cors = require("cors");

const PORT = 8000;

app.use(BodyParser.urlencoded({ extended: true }));
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));
app.use(cors());

app.use(
  fileUploader({
    useTempFiles: true,
  })
);

cloudinary.config({
  cloud_name: process.env.cloud_name,
  api_key: process.env.api_key,
  api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

app.get("/", async (req, res) => {
  res.send("This is a Get request Perform");
});

app.post("/insertData", async (req, res) => {
  const formData = await req.body.data;
  console.log("ImageData is", formData);

  try {
    const fileData = formData.image;
    // console.log(fileData);

    const cloudinaryResult = await cloudinary.uploader.upload(fileData, {
      eager_async: true,
    });
    console.log(cloudinaryResult);

    const result = await bannerModel
      .insertMany([
        {
          title: formData.title,
          image: cloudinaryResult.url,
          position: formData.position,
          status: formData.status,
        },
      ])
      .then((data) => res.json(data))
      .catch((err) => res.json(err));
  } catch (err) {
    console.log("Error is ", err);
  }
});

app.get("/getData", async (req, res) => {
  const limit = req.query.limit;
  const pageNumber = req.query.page;
  const skip = (pageNumber - 1) * limit;
  const totalDocument = await bannerModel.countDocuments();
  const data = await bannerModel
    .find()
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  res.json({ record: data, totalDocument: totalDocument });
});

app.get("/getDatas/:id", async (req, res) => {
  const parameters = req.params;
  // console.log("Id is ",parameters.id);
  await bannerModel
    .findOne({ _id: parameters.id })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

app.patch("/updateData/:id", async (req, res) => {
  const updateDatavalue = req.body.data;
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
});

app.post("/file", async (req, res) => {
  const file = req.files;
});

app.delete("/deletebannerData/:id", async (req, res) => {
  await bannerModel
    .deleteOne({ _id: req.params.id })
    .then((data) => res.json(data))
    .catch((err) => res.json(err));
});

app.patch("/updateStatus/:id", async (req, res) => {
  const parameters = await req.params;
  console.log("Parameter is", parameters);
  const updateData = await req.body;

  console.log("Body Data is", updateData);
  const response = await bannerModel
    .find({ _id: req.params.id })
    .updateOne({ },{status: req.body.statusData});

    console.log("Response is", response);
});

// app.get("/readData", async (req, res) => {
//   await bannerModel
//     .find()
//     .then((data) => res.json(data))
//     .catch((err) => res.json(err));
// });

app.listen(PORT, () => console.log(`Server is Started at port ${PORT}`));
