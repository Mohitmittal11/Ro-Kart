require("dotenv").config();
require("./Configuration/config");
require("./Cloudinary/config");
const express = require("express");
const router = require("./Routes/allRoutes");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const PORT = 8000;
app.use(express.json());

app.use(cors());
app.use(router.banner_router);
app.use(router.testimonialRoutes);
app.use(router.subscriptionRoutes);
app.use(fileUpload({ useTempFiles: true }));

app.get("/", async (req, res) => {
  res.send("Hello this is a get Request");
});

app.listen(PORT, () => console.log(`Server is Started at port ${PORT}`));
