import { Schema, Document, model, Types } from 'mongoose';

interface ISale extends Document {
  goat: Types.ObjectId;
  saleDate: Date;
  amount: number;
  paymentMethod: 'cash' | 'mobile_money' | 'bank_transfer' | 'credit';
  paymentStatus: 'pending' | 'partial' | 'complete';
  deliveryMethod: 'pickup' | 'delivery';
  notes?: string;
  createdBy: Types.ObjectId; // Staff member who recorded the sale
}

const saleSchema = new Schema<ISale>(
  {
    goat: {
      type: Schema.Types.ObjectId,
      ref: 'Goat',
      required: [true, 'Sale must be associated with a goat'],
    },
    saleDate: {
      type: Date,
      default: Date.now,
      required: true,
    },
    amount: {
      type: Number,
      required: [true, 'Sale must have an amount'],
      min: [0, 'Amount cannot be negative'],
    },
    paymentMethod: {
      type: String,
      enum: {
        values: ['cash', 'bank transfer'],
        message: '{VALUE} is not a valid payment method',
      },
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: {
        values: ['pending', 'partial', 'complete'],
        message: '{VALUE} is not a valid payment status',
      },
      required: true,
      default: 'pending',
    },
    deliveryMethod: {
      type: String,
      enum: {
        values: ['pickup', 'delivery'],
        message: '{VALUE} is not a valid delivery method',
      },
      required: true,
    },
    notes: String,
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

export const Sale = model<ISale>('Sale', saleSchema);
