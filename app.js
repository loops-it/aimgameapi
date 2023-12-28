import express, { json } from "express";
import morgan from "morgan";
const app = express();
import { urlencoded, json as _json } from "body-parser";
import cors from "cors";
import router from "./app/routers";
import { readFileSync } from "fs";
import { parse } from "yaml";
import { serve, setup } from "swagger-ui-express";
const file = readFileSync("./doc/swagger.yaml", "utf8");
const swaggerDocument = parse(file);

import { init } from "./app/validation/GlobalValidator";

import { connect } from "./databases";
import s3Service from "./app/services/s3Service";
import { uploadProfilePhoto } from "./app/middleware/image-upload.middleware";
connect();

app.use(urlencoded({ extended: true }));
app.use(_json({ limit: "100mb" }));

app.use(cors());
app.use(morgan("dev"));
app.use(json());

//set global validator
init();
import errorHandler from "./app/middleware/handleException";
//Controllers
import { testUpload } from "./app/controllers/TestController";
import WorkspaceController from "./app/controllers/WorkspaceController";
import IndustryTypeController from "./app/controllers/IndustryTypeController";

app.use("/docs/api", serve, setup(swaggerDocument));

app.get("/", (req, res) => {
  const { version, name, description } = require("./package.json");
  res.json({
    service: {
      name: name,
      version: version,
      description: description,
    },
  });
});

app.post("/uploadTest", testUpload);

app.use("/api-v1", router);
app.use(errorHandler);
export default app;
