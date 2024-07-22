const createHttpError = require("http-errors");
const validators = require("../Validators/validationmiddleware");

module.exports = function (validator) {
  return async function (req, res, next) {
    try {
      let completeFilePath = req.body;
      console.log("Complete file data ois ", completeFilePath);
      if (req?.file?.path) {
        console.log("File path that is saved on the server is", req.file.path);
        completeFilePath = { ...completeFilePath, image: req.file.path };
      }
      console.log("Request Body data is", req.body);
      const validated = await validators[validator].validateAsync(
        completeFilePath
      );
      completeFilePath = validated;
      next();
    } catch (err) {
      if (err)
        return next(
          createHttpError(
            422,
            res.status(422).json({ errorMessage: err.message })
          )
        );
      next(createHttpError(500));
    }
  };
};
