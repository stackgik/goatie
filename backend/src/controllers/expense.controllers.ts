import _ from 'lodash';
import { Expense } from '../models/expense.models.js';
import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { asyncHandler } from '../utils/asyncHandler.js';

const getAllExpenses = asyncHandler(async (req, res, next) => {
  const expenses = await Expense.find();

  res.status(200).json({
    ...new ApiResponse(expenses, 'All expenses retrieved successfully'),
    total_results: expenses.length,
  });
});

const getExpense = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const expense = await Expense.findById(id);

  if (!expense) {
    const err = new ApiError(`No expense with id ${id} was found`, 404);
    return next(err);
  }

  res
    .status(200)
    .json(new ApiResponse(expense, 'Expense retrieved successfully'));
});

const createExpense = asyncHandler(async (req, res, next) => {
  const newExpenseData = _.pick(req.body, ['type', 'amount']);
  const newExpense = await Expense.create(newExpenseData);

  res
    .status(201)
    .json(new ApiResponse(newExpense, 'Expense created successfully'));
});

const updateExpense = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const expenseUpdateData = _.pick(req.body, ['type', 'amount']);

  const updatedExpense = await Expense.findByIdAndUpdate(
    id,
    expenseUpdateData,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedExpense) {
    const err = new ApiError(`No expense with id ${id} was found`, 404);
    return next(err);
  }

  res
    .status(200)
    .json(new ApiResponse(updatedExpense, 'Expense updated successfully'));
});

const deleteExpense = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const deletedExpense = await Expense.findByIdAndDelete(id);

  if (!deletedExpense) {
    const err = new ApiError(`No expense with id ${id} was found`, 404);
    return next(err);
  }

  res.status(204).send();
});

export {
  getAllExpenses,
  getExpense,
  createExpense,
  updateExpense,
  deleteExpense,
};
