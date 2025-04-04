import express from 'express';
import adminAuthController from '../../controllers/admin/auth/admin.auth.controller.js';
import { handleValidationErrors } from '../../middlewares/validate.middleware.js';
import { loginValidationRules, registerValidationRules } from '../../validations/admin/admin.auth.validation.js';
const router = express.Router();
router.post('/register', registerValidationRules, handleValidationErrors, adminAuthController.register);
router.post('/login', loginValidationRules, handleValidationErrors, adminAuthController.login);
export default router;