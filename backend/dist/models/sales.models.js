import { Schema, model } from 'mongoose';
const saleSchema = new Schema({
    amount: {
        type: Number,
        required: [true, 'Sale must have an amount'],
    },
    buyer: {
        type: String,
        required: [true, 'Sale must have a buyer'],
        trim: true,
    },
    goat: {
        type: Schema.Types.ObjectId,
        ref: 'Goat',
    },
}, {
    timestamps: true,
});
export const Sale = model('Sale', saleSchema);
//# sourceMappingURL=sales.models.js.map