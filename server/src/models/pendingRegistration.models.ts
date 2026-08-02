import { Schema as schema, Document, model } from "mongoose";
import { UserType } from "./user.models.js";

export interface IPendingRegistration extends Document {
  fullName: string;
  email: string;
  passwordHash: string;
  role: UserType;
  code_verification: string;
  createdAt: Date;
}

const pendingRegistrationSchema = new schema<IPendingRegistration>({
  fullName: { type: String, required: true, maxlength: 100 },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: UserType, default: UserType.USER, required: true },
  code_verification: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 },
});

export const PendingRegistration = model<IPendingRegistration>(
  "PendingRegistration",
  pendingRegistrationSchema,
);
