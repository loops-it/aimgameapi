const express = require("express");
const industryTypeController = require("../controllers/IndustryTypeController");
const router = express.Router();

router
  .route("/")
  .post(industryTypeController.createIndustryType)
  .get(industryTypeController.getAllIndustryTypes);

router
  .route("/:id")
  .get(industryTypeController.getIndustryTypeById)
  .put(industryTypeController.updateIndustryType)
  .delete(industryTypeController.deleteIndustryType);

module.exports = router;
