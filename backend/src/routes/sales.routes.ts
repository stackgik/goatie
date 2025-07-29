import { Router } from 'express';
import {
  createSale,
  deleteSale,
  getAllSales,
  getSale,
  updateSale,
} from '../controllers/sales.controllers.js';
import { verifyRole } from '../controllers/verifyRole.controllers.js';
import { authenticateUser } from '../controllers/auth.controllers.js';

const router = Router();
router.use(authenticateUser);

router.route('/').get(getAllSales).post(verifyRole('admin'), createSale);
router
  .route('/:id')
  .get(getSale)
  .delete(verifyRole('admin'), deleteSale)
  .put(verifyRole('admin'), updateSale)
  .patch(verifyRole('admin'), updateSale);

export default router;
