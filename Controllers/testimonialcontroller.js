const testimonialsModel = require("../Model/Testimonials");

exports.add_Testimonialdata = async (req, res) => {
  const bodyData = await req.body;
  console.log("Body Info is", bodyData);
  if (bodyData) {
    try {
      const result = await testimonialsModel.create(bodyData);
      res.json(result);
    } catch (err) {
      res.json(err);
    }
  }
};

exports.get_Testimonial_databylimit = async (req, res) => {
  const limit = req.query.limit;
  const page = req.query.page;
  const skip = (page - 1) * limit;
  console.log(`Limit is ${limit} and Page is ${page}`);
  const totalDocument = await testimonialsModel.countDocuments({
    isDelete: false,
  });

  const result = await testimonialsModel
    .find({ isDelete: false })
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
  const idTogetData = await req.params.id;

  console.log("Id to Get Data", idTogetData);
  if (idTogetData) {
    try {
      const result = await testimonialsModel.findOne({ _id: req.params.id });

      res.json({ statusCode: 200, data: result });
    } catch (err) {
      res.json({ statusCode: 400, data: err.message });
    }
  }
};

exports.updateTestimonialData = async (req, res) => {
  const idtoUpdateData = await req.params.id;

  console.log("Id to Update Data is", idtoUpdateData);

  const result = await testimonialsModel.updateOne(
    { _id: idtoUpdateData },
    {
      username: req?.body?.bodyData?.username,
      address: {
        place: req.body?.bodyData?.address?.place,
        city: req.body?.bodyData?.address?.city,
      },
      description: req.body?.bodyData?.description,
      status: req.body?.bodyData?.status,
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
  const id = req.params.id;
  const value = req.body.value;
  console.log(`Id for Status Update is ${id} and Status Value is ${value}`);
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
