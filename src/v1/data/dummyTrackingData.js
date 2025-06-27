"use strict";
// data/dummyTrackingData.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.dummyPackages = void 0;
exports.dummyPackages = {
    "TRK001234567": {
        trackingId: "TRK001234567",
        packageName: "Electronics Package",
        sender: "Tech Store Lagos",
        recipient: "John Doe",
        estimatedDelivery: new Date("2025-06-30"),
        currentStatus: "In Transit",
        steps: [
            {
                id: 1,
                status: "Order Placed",
                description: "Package has been ordered and is being prepared",
                timestamp: new Date("2025-06-25T10:00:00Z"),
                location: "Tech Store Lagos",
                completed: true
            },
            {
                id: 2,
                status: "Package Picked Up",
                description: "Package has been picked up by courier",
                timestamp: new Date("2025-06-25T14:30:00Z"),
                location: "Lagos Warehouse",
                completed: true
            },
            {
                id: 3,
                status: "In Transit",
                description: "Package is on its way to destination",
                timestamp: new Date("2025-06-26T08:15:00Z"),
                location: "Abuja Sorting Center",
                completed: true
            },
            {
                id: 4,
                status: "Out for Delivery",
                description: "Package is out for delivery",
                timestamp: new Date(),
                location: "Local Delivery Hub",
                completed: false
            },
            {
                id: 5,
                status: "Delivered",
                description: "Package has been delivered successfully",
                timestamp: new Date("2025-06-30T16:00:00Z"),
                location: "Recipient Address",
                completed: false
            }
        ]
    },
    "TRK001234568": {
        trackingId: "TRK001234568",
        packageName: "Fashion Items",
        sender: "Fashion Hub",
        recipient: "Jane Smith",
        estimatedDelivery: new Date("2025-07-02"),
        currentStatus: "Package Picked Up",
        steps: [
            {
                id: 1,
                status: "Order Placed",
                description: "Package has been ordered and is being prepared",
                timestamp: new Date("2025-06-26T09:00:00Z"),
                location: "Fashion Hub Lagos",
                completed: true
            },
            {
                id: 2,
                status: "Package Picked Up",
                description: "Package has been picked up by courier",
                timestamp: new Date("2025-06-27T11:00:00Z"),
                location: "Lagos Warehouse",
                completed: true
            },
            {
                id: 3,
                status: "In Transit",
                description: "Package is on its way to destination",
                timestamp: new Date(),
                location: "En Route",
                completed: false
            },
            {
                id: 4,
                status: "Out for Delivery",
                description: "Package is out for delivery",
                timestamp: new Date(),
                location: "Local Delivery Hub",
                completed: false
            },
            {
                id: 5,
                status: "Delivered",
                description: "Package has been delivered successfully",
                timestamp: new Date(),
                location: "Recipient Address",
                completed: false
            }
        ]
    },
    "TRK001234569": {
        trackingId: "TRK001234569",
        packageName: "Books Collection",
        sender: "BookStore Nigeria",
        recipient: "Michael Johnson",
        estimatedDelivery: new Date("2025-06-28"),
        currentStatus: "Delivered",
        steps: [
            {
                id: 1,
                status: "Order Placed",
                description: "Package has been ordered and is being prepared",
                timestamp: new Date("2025-06-24T08:00:00Z"),
                location: "BookStore Nigeria",
                completed: true
            },
            {
                id: 2,
                status: "Package Picked Up",
                description: "Package has been picked up by courier",
                timestamp: new Date("2025-06-24T15:00:00Z"),
                location: "Lagos Warehouse",
                completed: true
            },
            {
                id: 3,
                status: "In Transit",
                description: "Package is on its way to destination",
                timestamp: new Date("2025-06-25T09:00:00Z"),
                location: "Port Harcourt Hub",
                completed: true
            },
            {
                id: 4,
                status: "Out for Delivery",
                description: "Package is out for delivery",
                timestamp: new Date("2025-06-26T10:00:00Z"),
                location: "Local Delivery Hub",
                completed: true
            },
            {
                id: 5,
                status: "Delivered",
                description: "Package has been delivered successfully",
                timestamp: new Date("2025-06-26T17:30:00Z"),
                location: "Recipient Address",
                completed: true
            }
        ]
    }
};
