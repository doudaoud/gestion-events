import { Schema as schema , Document , ObjectId  } from "mongoose";
// reservation de place pour un evenement
export enum BookingStatus  {
    pending = "pending",
    accepted = "accepted",
    rejected = "rejected",

}

export interface IBooking extends Document { 
    userId: ObjectId;
    eventId: ObjectId;
    status: BookingStatus;

}