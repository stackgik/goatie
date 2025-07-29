import { Schema, model } from 'mongoose';
const expenseSchema = new Schema({
    type: {
        type: String,
        required: [true, 'Expense must have a type'],
        trim: true,
    },
    amount: {
        type: Number,
        required: [true, 'Expense must have an amount'],
    },
}, {
    timestamps: true,
});
export const Expense = model('Expense', expenseSchema);
//# sourceMappingURL=expense.models.js.map