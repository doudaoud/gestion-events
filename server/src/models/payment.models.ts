import { Schema as schema, Document, Types, model, Schema } from "mongoose";

export enum PaymentStatus {
  pending = "PENDING",
  completed = "COMPLETED",
  failed = "FAILED",
}

export interface Ipayment extends Document {
  bookingId: Types.ObjectId; // pour toujours faire un lien avec la reservation et le event psq la reservation
  userId: Types.ObjectId; // pour savoir qui a fait le paiement
  amount: number; // le montant du paiement
  currency: string; // la devise du paiement
  status: PaymentStatus;
}

export const PaymentModel = model(
  "Payment",
  new schema<Ipayment>({
    bookingId: { type: Types.ObjectId, ref: "Booking", required: true },
    userId: { type: Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true },
    currency: { type: String, required: true },
    status: {
      type: String,
      enum: PaymentStatus,
      default: PaymentStatus.pending,
    },
  }),
);
