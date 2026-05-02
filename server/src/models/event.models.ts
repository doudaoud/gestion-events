import { Schema as schema, model, Document } from "mongoose";

export enum EventType {
  CONFERENCE = "conference",
  WORKSHOP = "workshop",
  HACKATHON = "hackathon",
}

export interface IEvent extends Document {
  title: string;
  description: string;
  date_Begin: Date;
  date_End: Date;
  location: string;
  type: EventType;
  organizer: string; // pour lie l"organizateur de l'event
  createdAt: Date;
  updatedAt: Date;
}