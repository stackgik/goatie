import _ from 'lodash';
import { VisitSchedule } from '../models/visit_schedule.models.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
// * Get all existing visit schedule records in the DB
const getAllVisitSchedules = asyncHandler(async (req, res, next) => {
    const visitSchedules = await VisitSchedule.find();
    res.status(200).json({
        ...new ApiResponse(visitSchedules, 'All visit schedules retrieved successfully'),
        total_results: visitSchedules.length,
    });
});
// * Get a specific existing visit schedule record in the DB
const getVisitSchedule = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const visitSchedule = await VisitSchedule.findById(id);
    if (!visitSchedule) {
        const err = new ApiError(`No visit schedule with id ${id} was found`, 404);
        return next(err);
    }
    res
        .status(200)
        .json(new ApiResponse(visitSchedule, 'Visit schedule retrieved successfully'));
});
// * Create a new visit schedule record in the DB
const createVisitSchedule = asyncHandler(async (req, res, next) => {
    const newVisitScheduleData = _.pick(req.body, ['description']);
    const newVisitSchedule = await VisitSchedule.create(newVisitScheduleData);
    res
        .status(201)
        .json(new ApiResponse(newVisitSchedule, 'Visit schedule created successfully'));
});
// * Update existing visit schedule record in the DB
const updateVisitSchedule = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const visitScheduleUpdateData = _.pick(req.body, ['description']);
    const updatedVisitSchedule = await VisitSchedule.findByIdAndUpdate(id, visitScheduleUpdateData, {
        new: true,
        runValidators: true,
    });
    if (!updatedVisitSchedule) {
        const err = new ApiError(`No visit schedule with id ${id} was found`, 404);
        return next(err);
    }
    res
        .status(200)
        .json(new ApiResponse(updatedVisitSchedule, 'Visit schedule updated successfully'));
});
// * Delete existing visit schedule record in the DB
const deleteVisitSchedule = asyncHandler(async (req, res, next) => {
    const { id } = req.params;
    const deletedVisitSchedule = await VisitSchedule.findByIdAndDelete(id);
    if (!deletedVisitSchedule) {
        const err = new ApiError(`No visit schedule with id ${id} was found`, 404);
        return next(err);
    }
    res.status(204).send();
});
//* exporting controllers
export { getAllVisitSchedules, getVisitSchedule, createVisitSchedule, updateVisitSchedule, deleteVisitSchedule, };
//# sourceMappingURL=visit_schedule.controllers.js.map