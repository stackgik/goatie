import { Schema, model } from 'mongoose';
import { nanoid } from 'nanoid'; // Import nanoid
const goatSchema = new Schema({
    goatId: {
        type: String,
        unique: true, // Ensure the ID is unique
        default: () => nanoid(8), // Generate an 8-character alphanumeric ID
    },
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
}, {
    timestamps: true,
});
export const Goat = model('Goat', goatSchema);
//# sourceMappingURL=goat.models.js.map