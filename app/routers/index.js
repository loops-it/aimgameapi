import { Router } from "express";
const router = Router();
import workspaceRouter from "./workspaceRouter";
import industryTypeRouter from "./industryTypeRouter";
import clientRouter from "./clientRouter";
import funnelStatusRouter from "./funnelStatusRouter";

router.use("/workspaces", workspaceRouter);
router.use("/industryTypes", industryTypeRouter);
router.use("/clients", clientRouter);
router.use("/funnelStatuses", funnelStatusRouter);

export default router;
