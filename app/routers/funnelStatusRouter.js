import { Router } from "express";
import { createFunnelStatus, getAllFunnelStatuses, getFunnelStatusById, updateFunnelStatus, deleteFunnelStatus } from "../controllers/FunnelStatusController";
const router = Router();

router
  .route("/")
  .post(createFunnelStatus)
  .get(getAllFunnelStatuses);

router
  .route("/:id")
  .get(getFunnelStatusById)
  .put(updateFunnelStatus)
  .delete(deleteFunnelStatus);

export default router;
