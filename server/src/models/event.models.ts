import { Schema as schema, Document, Types, model } from "mongoose";
import Joi from "joi";

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
  image?: string;
  organizer: Types.ObjectId;
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
    image: { type: String },
    organizer: { type: Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true },
);

export const Event = model<IEvent>("Event", eventSchema);

export const eventValidationSchema = Joi.object({
  title: Joi.string().required().min(4).max(100),
  description: Joi.string().required().min(10).max(1000),
  date_Begin: Joi.date().required(),
  date_End: Joi.date().required().min(Joi.ref("date_Begin")),
  location: Joi.string().required(),
  type: Joi.string()
    .required()
    .valid(...Object.values(EventType)),
  image: Joi.string().uri().allow("").optional(),
});

export function validateEvent(data: unknown) {
  return eventValidationSchema.validate(data);
}
