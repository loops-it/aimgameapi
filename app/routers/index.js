const express = require("express");
const router = express.Router();
const workspaceRouter = require("./workspaceRouter");
const industryTypeRouter = require("./industryTypeRouter");
const clientRouter = require("./clientRouter");
const funnelStatusRouter = require("./funnelStatusRouter");

router.use("/workspaces", workspaceRouter);
router.use("/industryTypes", industryTypeRouter);
router.use("/clients", clientRouter);
router.use("/funnelStatuses", funnelStatusRouter);

module.exports = router;
