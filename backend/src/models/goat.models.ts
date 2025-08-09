import { intervalToDuration } from "date-fns";
import { Schema, Document, Types, model } from "mongoose";
import { nanoid } from "nanoid"; // Import nanoid

interface Treatment {
  treatmentId: string;
  injectionName: string;
  note: string;
  date: Date;
  veterinarian: string;
  cost: number;
}

interface GoatDocument extends Document {
  goatId: string;
  goatName: string;
  goatAge: string;
  image: string;
  weight: string;
  purchasePrice: number;
  purchaseDate: Date;
  condition: string;
  healthStatus: string;
  lastHealthCheck: Date;
  notes: string;
  birthDate: Date;
  parent: Types.ObjectId;
  gender: string;
  children: Types.ObjectId[];
  healthIssues: string[];
  healthTreatments: Treatment[];
}

const treatmentSchema = new Schema<Treatment>({
  treatmentId: {
    type: String,
    unique: true,
    default: () => nanoid(8),
  },
  injectionName: {
    type: String,
    required: true,
  },
  note: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  veterinarian: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
});

const goatSchema = new Schema<GoatDocument>(
  {
    goatId: {
      type: String,
      unique: true,
      default: () => nanoid(8),
    },
    goatName: {
      type: String,
      required: [true, "Goat must have a name"],
      trim: true,
    },
    image: String,
    weight: {
      type: String,
      default: "undetermined",
    },
    purchasePrice: {
      type: Number,
      default: 0,
    },
    purchaseDate: Date,
    condition: {
      type: String,
      enum: {
        values: ["alive", "dead", "missing", "sold", "consumed", "stolen"],
        message: "{VALUE} is not a valid goat condition",
      },
      default: "alive",
    },
    healthStatus: {
      type: String,
      enum: {
        values: ["healthy", "sick", "pregnant", "needs attention"],
        message: "{VALUE} is not a valid goat health status",
      },
    },
    lastHealthCheck: Date,
    notes: String,
    birthDate: {
      type: Date,
      required: [true, "Goat must have a date of birth"],
    },
    parent: {
      type: Schema.Types.ObjectId,
      ref: "Goat",
    },
    gender: {
      type: String,
      enum: {
        values: ["doe", "buck"],
        message: "{VALUE} is not a valid gender",
      },
      required: [true, "Goat must have a gender"],
    },

    children: [
      {
        type: Schema.Types.ObjectId,
        ref: "Goat",
      },
    ],
    healthIssues: {
      type: [String],
      default: [],
    },
    healthTreatments: [treatmentSchema],
  },
  {
    timestamps: true,
  }
);

goatSchema.virtual("goatAge").set(function () {
  // This is a date-fns utility function that returns an object of paths e.g., {years, months, days, hours}
  const duration = intervalToDuration({
    start: this.birthDate,
    end: new Date(),
  });

  const path: string[] = [];

  if (duration.years && duration.years > 0) path.push(`${duration.years}y`);

  if (duration.months && duration.months > 0) path.push(`${duration.months}mo`);

  if (duration.days && duration.days > 0) path.push(`${duration.days}d`);

  if (path.length === 0) {
    return "newborn";
  }

  return path.join("");
});

export const Goat = model<GoatDocument>("Goat", goatSchema);
