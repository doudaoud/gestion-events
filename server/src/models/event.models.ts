import { Schema as schema, Document, Types } from "mongoose";
export enum EventType {
  CONFERENCE = "conference",
  WORKSHOP = "workshop",
  HACKATHON = "hackathon",
}
//  cest un objet qui va faire reference a l'id de l'organisateur de user direct pour lie l'event a son organisateur sans faire tout ca dans le schema
export type Organizateur = {
  type: Types.ObjectId;
  ref: "User";
  required: true;
};
export interface IEvent extends Document {
  title: string;
  description: string;
  date_Begin: Date;
  date_End: Date;
  location: string;
  type: EventType;
  // organizer: string; // pour lie l"organizateur de l'event
  organizer: Organizateur;
  createdAt: Date;
  updatedAt: Date;
}
export const eventSchema = new schema<IEvent>(
  {
    title: { type: String, required: true, minlength: 4, maxLength: 100 },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxLength: 1000,
    },
    date_Begin: { type: Date, required: true },
    date_End: { type: Date, required: true },
    location: { type: String, required: true },
    type: {
      type: String,
      enum: EventType,
      required: true,
    },
    organizer: { type: Types.ObjectId, ref: "Organizer", required: true },
  },
  { timestamps: true },
);
