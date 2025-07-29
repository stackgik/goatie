import { Router } from 'express';
import {
  createExpense,
  deleteExpense,
  getAllExpenses,
  getExpense,
  updateExpense,
} from '../controllers/expense.controllers.js';
import { verifyRole } from '../controllers/verifyRole.controllers.js';
import { authenticateUser } from '../controllers/auth.controllers.js';

const router = Router();

router.use(authenticateUser);

router.route('/').get(getAllExpenses).post(verifyRole('admin'), createExpense);
router
  .route('/:id')
  .get(getExpense)
  .delete(verifyRole('admin'), deleteExpense)
  .put(verifyRole('admin'), updateExpense)
  .patch(verifyRole('admin'), updateExpense);

export default router;
