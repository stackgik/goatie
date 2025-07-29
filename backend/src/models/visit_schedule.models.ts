import { Schema, Document, model } from 'mongoose';

interface VisitScheduleDocument extends Document {
  description: string;
  completed: boolean;
}

const visitScheduleSchema = new Schema<VisitScheduleDocument>(
  {
    description: {
      type: String,
      required: [true, 'Visit Schedule must have a description'],
      trim: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const VisitSchedule = model<VisitScheduleDocument>(
  'VisitSchedule',
  visitScheduleSchema
);
