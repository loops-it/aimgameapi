const express = require("express");
const morgan = require("morgan");
const app = express();
var bodyParser = require("body-parser");
var cors = require("cors");
const router = require("./app/routers");
const fs = require("fs");
const YAML = require("yaml");
const swaggerUi = require("swagger-ui-express");
const file = fs.readFileSync("./doc/swagger.yaml", "utf8");
const swaggerDocument = YAML.parse(file);

const GlobalValidator = require("./app/validation/GlobalValidator");

const db = require("./databases");
const s3Service = require("./app/services/s3Service");
const {
  uploadProfilePhoto,
} = require("./app/middleware/image-upload.middleware");
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: "100mb" }));

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

//set global validator
GlobalValidator.init();
const errorHandler = require("./app/middleware/handleException");
//Controllers
const TestController = require("./app/controllers/TestController");
const WorkspaceController = require("./app/controllers/WorkspaceController");
const IndustryTypeController = require("./app/controllers/IndustryTypeController");

app.use("/docs/api", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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

app.post("/uploadTest", TestController.testUpload);

app.use("/api-v1", router);
app.use(errorHandler);
module.exports = app;
