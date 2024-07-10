require("dotenv").config();
const connectedDatabase = require("./Configuration/config");
const cloudinary = require("./Cloudinary/config");
const express = require("express");
const banner_router = require("./Routes/bannerRoutes");
const testimonialRoutes = require("./Routes/testimonialsRouters");
const subscriptionRoutes = require("./Routes/subscriptionRouters");
const app = express();
const cors = require("cors");
const PORT = 8000;
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: false, limit: "50mb" }));

app.use(cors());
app.use(banner_router);
app.use(testimonialRoutes);
app.use(subscriptionRoutes);
app.listen(PORT, () => console.log(`Server is Started at port ${PORT}`));
