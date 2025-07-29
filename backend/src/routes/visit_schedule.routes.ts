import { Router } from 'express';
import {
  createVisitSchedule,
  deleteVisitSchedule,
  getAllVisitSchedules,
  getVisitSchedule,
  updateVisitSchedule,
} from '../controllers/visit_schedule.controllers.js';
import { verifyRole } from '../controllers/verifyRole.controllers.js';
import { authenticateUser } from '../controllers/auth.controllers.js';

const router = Router();
// This is basically protecting a route. It ensures that only authenticated users can access the route
router.use(authenticateUser);

router
  .route('/')
  .get(getAllVisitSchedules)
  .post(verifyRole('admin'), createVisitSchedule);
router
  .route('/:id')
  .get(getVisitSchedule)
  .delete(verifyRole('admin'), deleteVisitSchedule)
  .put(verifyRole('admin'), updateVisitSchedule)
  .patch(verifyRole('admin'), updateVisitSchedule);

export default router;
