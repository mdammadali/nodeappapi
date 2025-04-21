import express from 'express';
import adminProfileController from '../../controllers/admin/admin.profile.controller.js';
import { handleValidationErrors } from '../../middlewares/validate.middleware.js';
import { adminProfileUpdateValidationRules, adminProfileLogoutValidationRules} from '../../validations/admin/admin.profile.validation.js';
const router = express.Router();
router.post('/:id', adminProfileUpdateValidationRules, handleValidationErrors, adminProfileController.getProfile);
router.post('/update:id', adminProfileUpdateValidationRules, handleValidationErrors, adminProfileController.update);
router.post('/logout', adminProfileLogoutValidationRules, handleValidationErrors, adminProfileController.logout);
export default router;