import { Schema as schema, Document, model, Types } from "mongoose";
export enum NotificationType {
  info = "INFO",
  error = "ERROR",
  success = "SUCCESS",
  warning = "WARNING",
}

export interface INotification extends Document {
  type: NotificationType;
  message: string;
  read: boolean;
  userId: Types.ObjectId; // pour savoir a qui appartient la notification
  actionurl?: string; // pour la redection de l'utilisateur vers une page specifique quand il clique sur la notification
}

export const NotificationModel = model(
  "Notification",
  new schema<INotification>({
    type: { type: String, enum: NotificationType, required: true },
    message: { type: String, required: true },
    read: { type: Boolean, default: false },
    userId: { type: Types.ObjectId, ref: "User", required: true },
    actionurl: { type: String, trim: true },
  }),
);
