import { Router } from "express";
import { createIndustryType, getAllIndustryTypes, getIndustryTypeById, updateIndustryType, deleteIndustryType } from "../controllers/IndustryTypeController";
const router = Router();

router
  .route("/")
  .post(createIndustryType)
  .get(getAllIndustryTypes);

router
  .route("/:id")
  .get(getIndustryTypeById)
  .put(updateIndustryType)
  .delete(deleteIndustryType);

export default router;
