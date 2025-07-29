import { Router } from 'express';
import { createGoat, deleteGoat, getAllGoats, getGoat, updateGoat, } from '../controllers/goat.controllers.js';
import { verifyRole } from '../controllers/verifyRole.controllers.js';
import { authenticateUser } from '../controllers/auth.controllers.js';
const router = Router();
// This route is protected and only accessible to authenticated users
router.use(authenticateUser);
router.route('/').get(getAllGoats).post(verifyRole('admin'), createGoat);
router
    .route('/:id')
    .get(getGoat)
    .delete(verifyRole('admin'), deleteGoat)
    .put(verifyRole('admin'), updateGoat);
export default router;
//# sourceMappingURL=goat.routes.js.map