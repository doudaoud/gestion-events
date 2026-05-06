import mongoose, { Schema as schema, Document, ObjectId, Types, model } from "mongoose";
// reservation de place pour un evenement
export enum BookingStatus {
  pending = "pending",
  accepted = "accepted",
  rejected = "rejected",
}

export interface IBooking extends Document {
  userId: ObjectId;
  eventId: ObjectId;
  status: BookingStatus;
  qrCode?: string; // apres la verification de la reservation , on genere un qr code pour le participant
  checked: boolean; // pour savoir si le codebar et snne deja pour voir esq le ticket et valide ou pas
}

const bokkingschema = new schema<IBooking>({
    userId: { type: Types.ObjectId, ref: "User", required: true },
    eventId: { type: Types.ObjectId, ref: "Event", required: true },
    status: { type: String, enum: BookingStatus, default: BookingStatus.pending },
    qrCode: { type: String },
    checked: { type: Boolean, default: false }
});

export const Bookingmodels = mongoose.model<IBooking>("Booking", bokkingschema);