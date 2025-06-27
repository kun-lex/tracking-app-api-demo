import express from "express";
import * as trackerController from "../controller/tracker.user.controller";

const router = express.Router();

// Track package by tracking ID
router.post("/track-package", trackerController.trackPackages)

// Get all available tracking IDs (for testing)
router.get("/tracking-ids", trackerController.getAllTrackingIds)

export default router;