const Joi = require("joi");
const { validationException } = require("../exception");

const validate = async function (rules, req) {
  const schema = Joi.object(rules);

  const data = {};
  const requestBody = req.body ?? [];

  console.log({ body: req.body });
  Object.keys(rules).forEach((key) => {
    if (requestBody.hasOwnProperty(key)) {
      data[key] = requestBody[key];
    } else {
      data[key] = null; // Set to null for fields not present in the request
    }
  });

  try {
    return await schema.validateAsync(data);
  } catch (err) {
    const formatted = {};

    console.log("joi error details", err.details);

    err.details.forEach((row) => {
      formatted[row?.path[0]] = row.message;
    });

    console.log("joi error formatted", formatted);
    throw new validationException(formatted);
  }
};

const init = function () {
  global.validate = validate;
};

module.exports.init = init;
