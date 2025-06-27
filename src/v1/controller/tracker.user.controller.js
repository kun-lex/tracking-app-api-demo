"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllTrackingIds = exports.trackPackages = void 0;
const dummyTrackingData_1 = require("../data/dummyTrackingData");
const trackPackages = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { trackingId } = req.body;
        if (!trackingId) {
            res.status(400).json({
                success: false,
                message: "Tracking ID is required"
            });
        }
        // Look up tracking ID from dummy data
        const packageInfo = dummyTrackingData_1.dummyPackages[trackingId];
        if (!packageInfo) {
            res.status(404).json({
                success: false,
                message: "Package not found. Please check your tracking ID."
            });
        }
        // Return package information with tracking steps
        res.status(200).json({
            success: true,
            message: "Package tracking information retrieved successfully",
            data: {
                trackingId: packageInfo.trackingId,
                packageName: packageInfo.packageName,
                sender: packageInfo.sender,
                recipient: packageInfo.recipient,
                estimatedDelivery: packageInfo.estimatedDelivery,
                currentStatus: packageInfo.currentStatus,
                steps: packageInfo.steps,
                completedSteps: packageInfo.steps.filter(step => step.completed).length,
                totalSteps: packageInfo.steps.length
            }
        });
    }
    catch (error) {
        console.error("Error tracking package:", error);
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "An unknown error occurred"
            });
        }
    }
});
exports.trackPackages = trackPackages;
// Additional function to get all available tracking IDs (for testing)
const getAllTrackingIds = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const trackingIds = Object.keys(dummyTrackingData_1.dummyPackages);
        res.status(200).json({
            success: true,
            message: "Available tracking IDs retrieved successfully",
            data: {
                trackingIds,
                count: trackingIds.length
            }
        });
    }
    catch (error) {
        console.error("Error getting tracking IDs:", error);
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: error.message
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "An unknown error occurred"
            });
        }
    }
});
exports.getAllTrackingIds = getAllTrackingIds;
