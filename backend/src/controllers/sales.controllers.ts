import _ from 'lodash';
import { Sale } from '../models/sales.models.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

// * Get all existing sale records in the DB
const getAllSales = asyncHandler(async (req, res, next) => {
  const sales = await Sale.find();

  res.status(200).json({
    ...new ApiResponse(sales, 'All sales retrieved successfully'),
    total_results: sales.length,
  });
});

// * Create a new sale record in the DB
const createSale = asyncHandler(async (req, res, next) => {
  const newSaleData = _.pick(req.body, ['amount', 'buyer', 'goat']);
  const newSale = await Sale.create(newSaleData);

  res.status(201).json(new ApiResponse(newSale, 'Sale created successfully'));
});

//*  Get a specific existing sale record in the DB
const getSale = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const sale = await Sale.findById(id);

  if (!sale) {
    const err = new ApiError(`No sale with id ${id} was found`, 404);
    return next(err);
  }

  res.status(200).json(new ApiResponse(sale, 'Sale retrieved successfully'));
});

//* Update existing sale record in the DB
const updateSale = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const saleUpdateData = _.pick(req.body, ['amount', 'buyer', 'goat']);

  const updatedSale = await Sale.findByIdAndUpdate(id, saleUpdateData, {
    new: true,
    runValidators: true,
  });

  if (!updatedSale) {
    const err = new ApiError(`No sale with id ${id} was found`, 404);
    return next(err);
  }

  res
    .status(200)
    .json(new ApiResponse(updatedSale, 'Sale updated successfully'));
});

// * Delete existing sale record in the DB
const deleteSale = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const deletedSale = await Sale.findByIdAndDelete(id);

  if (!deletedSale) {
    const err = new ApiError(`No sale with id ${id} was found`, 404);
    return next(err);
  }

  res.status(204).send();
});

//* Exporting all the middleware route handlers
export { getAllSales, createSale, getSale, updateSale, deleteSale };
