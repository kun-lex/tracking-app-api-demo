  // controller/tracker.user.controller.ts
  import { Request, Response } from "express";
  import { dummyPackages } from "../data/dummyTrackingData";
import { PackageInfo } from "../types/tracking.types";
  
export const trackPackages = async (req: Request, res: Response): Promise<void> => {
    try {
      const { trackingId } = req.body;
  
      if (!trackingId) {
        res.status(400).json({ 
          success: false,
          message: "Tracking ID is required" 
        });
      }
  
      // Look up tracking ID from dummy data
      const packageInfo: PackageInfo | undefined = dummyPackages[trackingId];
  
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
  
    } catch (error) {
      console.error("Error tracking package:", error);
      if (error instanceof Error) {
        res.status(500).json({ 
          success: false,
          message: error.message 
        });
      } else {
        res.status(500).json({ 
          success: false,
          message: "An unknown error occurred" 
        });
      }
    }
  }
  
  // Additional function to get all available tracking IDs (for testing)
  export const getAllTrackingIds = async (req: Request, res: Response): Promise<void> => {
    try {
      const trackingIds = Object.keys(dummyPackages);
      
       res.status(200).json({
        success: true,
        message: "Available tracking IDs retrieved successfully",
        data: {
          trackingIds,
          count: trackingIds.length
        }
      });
  
    } catch (error) {
      console.error("Error getting tracking IDs:", error);
      if (error instanceof Error) {
        res.status(500).json({ 
          success: false,
          message: error.message 
        });
      } else {
        res.status(500).json({ 
          success: false,
          message: "An unknown error occurred" 
        });
      }
    }
  }