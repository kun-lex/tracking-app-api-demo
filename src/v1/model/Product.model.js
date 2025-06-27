"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const virtualAccountSchema = new mongoose_1.Schema({
    bank: {
        name: { type: String },
        id: { type: Number },
        bank_code: { type: String },
        prefix: { type: String },
    },
    account_name: { type: String },
    account_number: { type: String },
    currency: { type: String },
    reference: { type: String },
    assignment: { type: String },
    id: { type: Number },
    created_at: { type: String },
    updated_at: { type: String },
}, { _id: false });
// Schemas
const notificationSchema = new mongoose_1.Schema({
    message: { type: String, required: true },
    type: { type: String },
    timestamp: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
});
const budpayCustomerSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    domain: { type: String, required: true },
    customer_code: { type: String, required: true },
    id: { type: String, required: true },
}, { _id: false });
// Schema and model for individual users
const individualSchema = new mongoose_1.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dateOfBirth: { type: Date },
    email: { type: String, unique: true, required: true },
    password: { type: String },
    dateCreated: { type: Date, default: Date.now },
    // GENERAL OTP
    otp: { type: String, default: '' },
    // Email verification fields
    emailVerificationCode: { type: Number },
    emailVerificationCodeExpires: { type: Date },
    isEmailVerified: { type: Boolean, default: false },
    // Reset password fields
    resetPasswordToken: { type: String },
    resetPasswordOtp: { type: Number },
    resetPasswordExpires: { type: Date },
    // Notifications array
    notifications: [notificationSchema],
    role: { type: String, default: "individual" },
    // Profile fields
    address: { type: String },
    phoneNumber: { type: String },
    country: { type: String },
    state: { type: String },
    bvn: { type: String },
    nin: { type: String },
    username: { type: String, unique: true },
    // Savings account details
    savingsAccountNumber: { type: String, unique: true },
    savingsAccountBalance: { type: Number, default: 0 },
    // Benefit account details
    benefitAccountNumber: { type: String, unique: true },
    benefitAccountBalance: { type: Number, default: 0 },
    // Budpay customer details
    budpayCustomer: { type: budpayCustomerSchema },
}, { collection: 'users' });
const Product = mongoose_1.default.model('Individual', individualSchema);
exports.default = Product;
