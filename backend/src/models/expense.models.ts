import { Schema, model, Document } from 'mongoose';

interface ExpenseDocument extends Document {
  type: string;
  amount: number;
}

const expenseSchema = new Schema<ExpenseDocument>(
  {
    type: {
      type: String,
      required: [true, 'Expense must have a type'],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, 'Expense must have an amount'],
    },
  },
  {
    timestamps: true,
  }
);

export const Expense = model<ExpenseDocument>('Expense', expenseSchema);
