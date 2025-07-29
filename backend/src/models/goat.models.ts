import { intervalToDuration } from 'date-fns';
import { Schema, Document, model } from 'mongoose';
import { nanoid } from 'nanoid'; // Import nanoid

interface GoatDocument extends Document {
  goatId: string;
  goatName: string;
  image: string;
  amountBought: number;
  status: string;
  dob: Date;
  parent: Schema.Types.ObjectId;
  gender: string;
  numOfKids: number;
  children: string[];
  healthIssues: string[];
}

const goatSchema = new Schema<GoatDocument>(
  {
    goatId: {
      type: String,
      unique: true, // Ensure the ID is unique
      default: () => nanoid(8), // Generate an 8-character alphanumeric ID
    },
    goatName: {
      type: String,
      required: [true, 'Goat must have a name'],
      trim: true,
    },
    image: String,
    amountBought: {
      type: Number,
      default: 0,
    },
    status: {
      type: String,
      enum: {
        values: ['alive', 'dead', 'sold', 'missing', 'stolen', 'consumed'],
        message: '{VALUE} is not a valid status',
      },
      default: 'alive',
      trim: true,
    },
    dob: {
      type: Date,
      required: [true, 'Goat must have a date of birth'],
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: 'Goat',
    },
    gender: {
      type: String,
      enum: {
        values: ['doe', 'buck'],
        message: '{VALUE} is not a valid gender',
      },
      required: [true, 'Goat must have a gender'],
    },
    numOfKids: {
      type: Number,
      default: 0,
    },
    children: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Goat',
      },
    ],
    healthIssues: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

goatSchema.virtual('age').set(function () {
  // This is a date-fns utility function that returns an object of paths e.g., {years, months, days, hours}
  const duration = intervalToDuration({
    start: this.dob,
    end: new Date(),
  });

  const path: string[] = [];

  if (duration.years && duration.years > 0) path.push(`${duration.years}y`);

  if (duration.months && duration.months > 0) path.push(`${duration.months}mo`);

  if (duration.days && duration.days > 0) path.push(`${duration.days}d`);

  if (path.length === 0) {
    return 'newborn';
  }

  return path.join('');
});

export const Goat = model<GoatDocument>('Goat', goatSchema);
