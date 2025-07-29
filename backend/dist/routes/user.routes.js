import { Router } from 'express';
import { authenticateUser } from '../controllers/auth.controllers.js';
import { updateMyPersonalDetails } from '../controllers/user.controllers.js';
const router = Router();
router
    .route('/personal-details')
    .patch(authenticateUser, updateMyPersonalDetails);
export default router;
//# sourceMappingURL=user.routes.js.map