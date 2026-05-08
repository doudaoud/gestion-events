import mongoose, { Document, Schema as schema, model } from "mongoose";
export enum ActionType {
  inscreption = "INSCRIPTION",
  connexionSucees = "SUCCESS",
  connexionfailed = "FAILED",
  createAccount = "CREATE_ACCOUNT",
  paymentSuccess = "PAYMENT_SUCCESS",
  paymentFailed = "PAYMENT_FAILED",
  updateProfile = "UPDATE_PROFILE",
  createdevent = "CREATED_EVENT",
  updatedevent = "UPDATED_EVENT",
  deletedevent = "DELETED_EVENT",
  close_event = "CLOSE_EVENT",
  demande_organizateur = "DEMANDE_ORGANIZATEUR",
}
export interface IAuditLog extends Document {
  action: ActionType;
  userID: Object;
  ipAddress: string;
  date: Date;
}

export const auditLogmodels = model<IAuditLog>(
  "AuditLog",
  new schema<IAuditLog>(
    {
      action: { type: String, enum: Object.values(ActionType), required: true },
      userID: {type:mongoose.Types.ObjectId, ref:"User", required:true},
      ipAddress: { type: String, required: true },
    },
    {
      timestamps: { createdAt: "date", updatedAt: false },
    },
  ),
);
