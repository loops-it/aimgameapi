var jwt = require("jsonwebtoken");
const { key } = require("../config");

module.exports = (req, res, next) => {
  const authHeader = req.get("authorization");

  if (!authHeader || authHeader.split(" ").length != 2) {
    return res
      .status(403)
      .json({ success: false, code: 403, msg: "please provide token" });
  }

  try {
    const token = authHeader.split(" ")[1];
    console.log("Token:", token);
    var decoded = jwt.verify(token, key);
    req.user = {
      ...decoded.data,
      role: ["testRole"],
    };
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ success: false, code: 401, msg: "invalid token" });
  }
};
