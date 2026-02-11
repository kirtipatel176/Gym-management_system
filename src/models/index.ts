import mongoose, { Schema, Document, Model } from 'mongoose';

// User Schema
export interface IUser extends Document {
    name?: string;
    email: string;
    password?: string;
    role: 'ADMIN' | 'TRAINER' | 'MEMBER';
    phone?: string;
    status: 'ACTIVE' | 'INACTIVE';
    stripeCustomerId?: string;
    subscriptionStatus?: 'active' | 'past_due' | 'canceled' | 'incomplete' | 'inactive';
    subscriptionId?: string;
    currentPeriodEnd?: Date;
    planId?: string;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema: Schema = new Schema({
    name: { type: String },
    email: { type: String, required: true, unique: true },
    password: { type: String },
    phone: { type: String },
    role: { type: String, enum: ['ADMIN', 'TRAINER', 'MEMBER'], default: 'MEMBER' },
    status: { type: String, enum: ['ACTIVE', 'INACTIVE'], default: 'ACTIVE' },
    stripeCustomerId: { type: String },
    subscriptionStatus: { type: String, enum: ['active', 'past_due', 'canceled', 'incomplete', 'inactive'], default: 'inactive' },
    subscriptionId: { type: String },
    currentPeriodEnd: { type: Date },
    planId: { type: String },
}, { timestamps: true });

// Member Profile Schema
export interface IMemberProfile extends Document {
    userId: mongoose.Types.ObjectId;
    phone?: string;
    address?: string;
    joinDate: Date;
}

const MemberProfileSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    phone: { type: String },
    address: { type: String },
    joinDate: { type: Date, default: Date.now },
});

// Trainer Profile Schema
export interface ITrainerProfile extends Document {
    userId: mongoose.Types.ObjectId;
    specialization?: string;
    bio?: string;
}

const TrainerProfileSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    specialization: { type: String },
    bio: { type: String },
});

// Subscription Plan Schema
export interface ISubscriptionPlan extends Document {
    name: string;
    price: number;
    duration: number; // in months
    description?: string;
}

const SubscriptionPlanSchema: Schema = new Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: Number, required: true },
    description: { type: String },
});

// Membership Schema
export interface IMembership extends Document {
    userId: mongoose.Types.ObjectId;
    planId: mongoose.Types.ObjectId;
    startDate: Date;
    endDate: Date;
    status: 'ACTIVE' | 'EXPIRED' | 'CANCELLED';
}

const MembershipSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    planId: { type: Schema.Types.ObjectId, ref: 'SubscriptionPlan', required: true },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date, required: true },
    status: { type: String, enum: ['ACTIVE', 'EXPIRED', 'CANCELLED'], default: 'ACTIVE' },
});

// Payment Schema
export interface IPayment extends Document {
    userId: mongoose.Types.ObjectId;
    amount: number;
    date: Date;
    method?: string;
    status: 'COMPLETED' | 'PENDING' | 'FAILED';
}

const PaymentSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now },
    method: { type: String },
    status: { type: String, enum: ['COMPLETED', 'PENDING', 'FAILED'], default: 'COMPLETED' },
});

// Attendance Schema
export interface IAttendance extends Document {
    userId: mongoose.Types.ObjectId;
    date: Date;
    checkInTime: Date;
    checkOutTime?: Date;
}

const AttendanceSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    checkInTime: { type: Date, default: Date.now },
    checkOutTime: { type: Date },
});

// Models
// Using global to prevent overwriting models during hot reload in dev
const models = (global as any).models || {};

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
export const MemberProfile: Model<IMemberProfile> = mongoose.models.MemberProfile || mongoose.model<IMemberProfile>('MemberProfile', MemberProfileSchema);
export const TrainerProfile: Model<ITrainerProfile> = mongoose.models.TrainerProfile || mongoose.model<ITrainerProfile>('TrainerProfile', TrainerProfileSchema);
export const SubscriptionPlan: Model<ISubscriptionPlan> = mongoose.models.SubscriptionPlan || mongoose.model<ISubscriptionPlan>('SubscriptionPlan', SubscriptionPlanSchema);
export const Membership: Model<IMembership> = mongoose.models.Membership || mongoose.model<IMembership>('Membership', MembershipSchema);
export const Payment: Model<IPayment> = mongoose.models.Payment || mongoose.model<IPayment>('Payment', PaymentSchema);
export const Attendance: Model<IAttendance> = mongoose.models.Attendance || mongoose.model<IAttendance>('Attendance', AttendanceSchema);
