import mongoose, { Document, Schema, Model, Types } from 'mongoose';

// Interface for notifications
interface Notification {
  message: string;
  type: string;
  timestamp: Date;
  read: boolean;
}

interface BudPayCustomer {
  email: string;
  domain: string;
  customer_code: string;
  id: string;
}

interface VirtualAccount {
  bank: {
    name: string;
    id: number;
    bank_code: string;
    prefix: string;
  };
  account_name: string;
  account_number: string;
  currency: string;
  reference: string;
  assignment: string;
  id: number;
  created_at: string;
  updated_at: string;
}

const virtualAccountSchema = new Schema<VirtualAccount>({
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


// Interface for individual users
export interface IIndividual extends Document {
  firstName: string;
  lastName: string;
  email: string;
  dateOfBirth: Date;
  password: string;
  dateCreated?: Date;
  // General OTP for various operations
  otp?: string;
  // Email verification
  isEmailVerified?: boolean;
  lastLogin: Date
  loginOtp: number
  emailVerificationCode?: number;
  emailVerificationCodeExpires: Date;
  // Reset password
  resetPasswordOtp?: number;
  resetPasswordToken?: string;
  resetPasswordExpires?: Date;
  role: string;
  notifications: Types.DocumentArray<Notification>;
  // Profile
  address: string;
  phoneNumber: string;
  country: string;
  state: string;
  bvn: string;
  nin: string,
  username: string,
  // Savings account details
  savingsAccountNumber: string;
  savingsAccountBalance: number;
  // Benefit account details
  benefitAccountNumber: string;
  benefitAccountBalance: number;
  // Budpay customer details
  budpayCustomer?: BudPayCustomer;
  virtualAccount: { type: typeof virtualAccountSchema },
}

// Schemas
const notificationSchema = new Schema<Notification>({
  message: { type: String, required: true },
  type: { type: String },
  timestamp: { type: Date, default: Date.now },
  read: { type: Boolean, default: false },
});

const budpayCustomerSchema = new Schema<BudPayCustomer>({
  email: { type: String, required: true },
  domain: { type: String, required: true },
  customer_code: { type: String, required: true },
  id: { type: String, required: true },
}, { _id: false });

// Schema and model for individual users
const individualSchema: Schema<IIndividual> = new Schema(
  {
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
  },
  { collection: 'users' }
);

const Product: Model<IIndividual> = mongoose.model<IIndividual>('Individual', individualSchema);

export default Product;
