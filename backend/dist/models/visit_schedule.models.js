import { Schema, model } from 'mongoose';
const visitScheduleSchema = new Schema({
    description: {
        type: String,
        required: [true, 'Visit Schedule must have a description'],
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
export const VisitSchedule = model('VisitSchedule', visitScheduleSchema);
//# sourceMappingURL=visit_schedule.models.js.map