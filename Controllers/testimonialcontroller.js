const testimonialsModel = require("../Model/Testimonials");
const { message } = require("../ValidationSchema/bannerValidation");

exports.add_Testimonialdata = async (req, res) => {
  const bodyData = await req.body;
  console.log("Body Info is", bodyData);
  if (bodyData) {
    try {
      const result = await testimonialsModel.create(bodyData);
      res.json({ statusCode: 200, record: result });
    } catch (err) {
      res.json(err);
    }
  }
};

exports.get_Testimonial_databylimit = async (req, res) => {
  const limit = req.query.limit ? req.query.limit : 5;
  const page = req.query.page ? req.query.page : 1;
  const skip = (page - 1) * limit;
  const status = req?.query?.status;
  const username = req?.query?.username;
  let testimonialsConditions = { isDelete: false };

  if (username && username !== null && username !== undefined) {
    testimonialsConditions = {
      ...testimonialsConditions,
      username: { $regex: `${username}`, $options: "i" },
    };
  }
  if (status && status !== null && status !== undefined) {
    testimonialsConditions = { ...testimonialsConditions, status: status };
  }

  const totalDocument = await testimonialsModel.countDocuments(
    testimonialsConditions
  );

  console.log(testimonialsConditions, "Testimonial get Data condition is");
  const result = await testimonialsModel
    .find(testimonialsConditions)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);
  if (result) {
    res.json({ statusCode: 200, data: result, totalDocuments: totalDocument });
  } else {
    res.json({ statusCode: 400, data: null });
  }
};

exports.get_Testimonial_Data_byId = async (req, res) => {
  const idTogetData = await req?.params?.id;

  if (idTogetData && idTogetData !== null && idTogetData !== undefined) {
    try {
      const result = await testimonialsModel.findOne({ _id: req.params.id });

      res.json({
        statusCode: 200,
        data: result,
        message: "Data Found Successfully",
      });
    } catch (err) {
      res.json({ statusCode: 400, data: err.message });
    }
  }
};

exports.updateTestimonialData = async (req, res) => {
  const idtoUpdateData = await req?.params?.id;

  const result = await testimonialsModel.updateOne(
    { _id: idtoUpdateData },
    {
      username: req?.body?.username,
      address: {
        place: req.body?.address?.place,
        city: req.body?.address?.city,
      },
      description: req.body?.description,
      status: req.body?.status,
    }
  );
  if (result) {
    res.json({
      statusCode: 200,
      messsage: "Data Successfully Updated",
      respone: result,
    });
  } else {
    res.json({ message: "Data Not Updated" });
  }
};

exports.delete_Testimonial_Data = async (req, res) => {
  const idToDeleteData = await req.params.id;

  console.log("Id to Update Data ", idToDeleteData);
  const result = await testimonialsModel.updateOne(
    { _id: idToDeleteData },
    {
      isDelete: true,
    }
  );
  if (result) {
    res.json({
      statusCode: 200,
      message: "Field Updated Succefully",
      response: result,
    });
  } else {
    res.json({ message: "Field Did not Updated" });
  }
};

exports.update_Testimonial_Status = async (req, res) => {
  const id = req?.params?.id;
  const value = req?.body?.value;
  const result = await testimonialsModel.updateOne(
    { _id: id },
    { status: value }
  );
  if (result) {
    res.json({
      statusCode: 200,
      msg: "Status Updated Successfully",
      response: result,
    });
  } else {
    res.json({ msg: "Status Does not Updated" });
  }
};
