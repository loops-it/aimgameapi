import { verify } from "jsonwebtoken";
import { key } from "../config";

export default (req, res, next) => {
  const authHeader = req.get("authorization");

  if (!authHeader || authHeader.split(" ").length != 2) {
    return res
      .status(403)
      .json({ success: false, code: 403, msg: "please provide token" });
  }

  try {
    const token = authHeader.split(" ")[1];
    console.log("Token:", token);
    var decoded = verify(token, key);
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
