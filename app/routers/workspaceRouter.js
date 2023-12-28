import { Router } from "express";
import { createWorkspace, getAllWorkspaces, getWorkspaceById, updateWorkspace, deleteWorkspace, getWorkspaceByIndustryType, getWorkspaceBySubscription } from "../controllers/WorkspaceController";
const router = Router();

router
  .route("/")
  .post(createWorkspace)
  .get(getAllWorkspaces);

router
  .route("/:id")
  .get(getWorkspaceById)
  .put(updateWorkspace)
  .delete(deleteWorkspace);

router
  .route("/industryType/:industryTypeId")
  .get(getWorkspaceByIndustryType);

router
  .route("/subscription/:subscription")
  .get(getWorkspaceBySubscription);

export default router;
