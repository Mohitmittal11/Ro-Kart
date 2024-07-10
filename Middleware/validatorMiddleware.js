const createHttpError = require("http-errors");
const validators = require("../Validators/validationmiddleware");

module.exports = function (validator) {
  return async function (req, res, next) {
    try {
      const validated = await validators[validator].validateAsync(req.body);
      req.body = validated;
      next();
    } catch (err) {
      if (err) return next(createHttpError(422, { message: err }));
      next(createHttpError(500));
    }
  };
};
