require("dotenv").config();
const connectedDatabase = require("./Configuration/config");
const cloudinary = require("./Cloudinary/config");
const upload = require("./Multer/multerConfig");
const express = require("express");
const banner_router = require("./Routes/bannerRoutes");
const testimonialRoutes = require("./Routes/testimonialsRouters");
const subscriptionRoutes = require("./Routes/subscriptionRouters");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const PORT = 8000;
app.use(express.json());
// app.use(express.urlencoded({ extended: true, limit: "50mb" }));

app.use(cors());
app.use(banner_router);
app.use(testimonialRoutes);
app.use(subscriptionRoutes);
app.use(fileUpload({ useTempFiles: true }));

app.get("/", async (req, res) => {
  res.send("Hello this is a get Request");
});

app.listen(PORT, () => console.log(`Server is Started at port ${PORT}`));
