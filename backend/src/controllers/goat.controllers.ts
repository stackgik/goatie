import _ from 'lodash';
import { Goat } from '../models/goat.models.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';

const getAllGoats = asyncHandler(async (req, res, next) => {
  const goats = await Goat.find().select(['-__v', '-_id']);

  res.status(200).json({
    ...new ApiResponse(goats, 'All Goats retrieved successfully'),
    total_results: goats.length,
  });
});

const createGoat = asyncHandler(async (req, res, next) => {
  const newGoatData = _.pick(req.body, [
    'amountBought',
    'status',
    'age',
    'dob',
    'parent',
    'gender',
    'numOfKids',
    'children',
    'healthIssues',
  ]);
  const newGoat = await Goat.create(newGoatData);

  res.status(201).json(new ApiResponse(newGoat, 'Goat created successfully'));
});

// Logic to get a single goat
const getGoat = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const goat = await Goat.findById(id);

  if (!goat) {
    const err = new ApiError(`No goat with id ${id} was found`, 404);
    return next(err);
  }

  res.status(200).json(new ApiResponse(goat, 'Goat retrieved successfully'));
});

const updateGoat = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const goatUpdateData = _.pick(req.body, [
    'amountBought',
    'status',
    'age',
    'dob',
    'parent',
    'gender',
    'numOfKids',
    'children',
    'healthIssues',
  ]);

  const updatedGoat = await Goat.findByIdAndUpdate(id, goatUpdateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedGoat) {
    const err = new ApiError(`No goat with id ${id} was found`, 404);
    return next(err);
  }

  res
    .status(200)
    .json(new ApiResponse(updatedGoat, 'Goat updated successfully'));
});

const deleteGoat = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const goat = await Goat.findByIdAndDelete(id);

  if (!goat) {
    return next(new ApiError(`No goat with id ${id} was found`, 404));
  }

  res.status(204).send(); // No content response for successful deletion
});

export { getAllGoats, createGoat, getGoat, updateGoat, deleteGoat };
