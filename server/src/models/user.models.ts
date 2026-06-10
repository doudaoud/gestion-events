import Joi from "joi";
import { Schema as schema, model, Document } from "mongoose";

export enum UserType {
  ADMIN = "admin",
  USER = "user",
  ORGANIZER = "organizer",
}

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  role: UserType;
  avatar: string | null;
  carteNationale: string | null;
  verified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new schema<IUser>(
  {
    firstName: { type: String, required: true, maxlength: 50 },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true, select: false },
    role: {
      type: String,
      enum: UserType,
      default: UserType.USER,
      required: true,
    },
    avatar: { type: String },
    carteNationale: { type: String },
    verified: { type: Boolean, default: false },
    // createdAt: { type: Date, default: Date.now },
    // updatedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  },
);
export const User = model<IUser>("User", userSchema);
// TODO: ajouter les champs de verification et de role pour les users et les organisateurs   REGLER LE MEME SCHEMA
export const userValidationSchemaRegister = Joi.object({
  firstName: Joi.string().required().max(50),
  lastName: Joi.string().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
  role: Joi.string()
    .valid(...Object.values(UserType))
    .default(UserType.USER)
    .required(),
});
export const userValidationSchemaLogin = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().min(6),
});

export function validateUserLogin(data: any) {
  return userValidationSchemaLogin.validate(data);
}

export function validateUserRegister(data: any) {
  return userValidationSchemaRegister.validate(data);
}
