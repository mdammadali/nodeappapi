import express from 'express';
import adminAuthController from '../../controllers/admin/auth/admin.auth.controller.js';
import { handleValidationErrors } from '../../middlewares/validate.middleware.js';
import { adminRegisterValidationRules, adminLoginValidationRules } from '../../validations/admin/admin.auth.validation.js';
const router = express.Router();
router.post('/register', adminRegisterValidationRules, handleValidationErrors, adminAuthController.register);
router.post('/login', adminLoginValidationRules, handleValidationErrors, adminAuthController.login);
export default router;