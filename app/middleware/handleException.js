import { Error } from "mongoose";
import { MongoError } from "mongodb";

export default (e, req, res, next) => {
  //Transform mongoose validation errors
  console.log("first", e);
  if (e instanceof Error.ValidationError) {
    e = transformMonooseValidationError(e);
  }
  if (e instanceof MongoError) {
    return res.status(500).json({
      success: false,
      msg: "DB err",
    });
  }

  if (e.code == 422) {
    console.log("catch error from middleware");
    return res.status(e.code).json(e);
  }

  if (e.code == 404) {
    return res.status(e.code).json(e);
  }

  console.log({ e });

  return res.status(500).json({
    success: false,
    msg: "something went wrong",
  });
};

/**
 *
 * @param MongooseValidationError
 * @returns  ValidationError
 */
function transformMonooseValidationError(e) {
  const newError = {
    success: false,
    code: 422,
    name: "validationError",
  };
  const newList = {};
  const keys = Object.keys(e.errors);
  keys.forEach((k) => {
    if (e.errors[k] instanceof Error.CastError) {
      const kind = e.errors[k].kind;
      newList[k] = `${k} must be a ${kind}`;
    } else {
      newList[k] = e.errors[k].properties?.message;
    }
  });

  newError.errors = newList;

  return newError;
}
