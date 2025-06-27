// types/tracking.types.ts
export interface TrackingStep {
    id: number;
    status: string;
    description: string;
    timestamp: Date;
    location?: string;
    completed: boolean;
}
  
export interface PackageInfo {
trackingId: string;
packageName: string;
sender: string;
recipient: string;
estimatedDelivery: Date;
currentStatus: string;
steps: TrackingStep[];
}