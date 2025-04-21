import express from 'express';
import sellerAuthController from '../../controllers/seller/auth/seller.auth.controller.js';
import { handleValidationErrors } from '../../middlewares/validate.middleware.js';
import { sellerLoginValidationRules, sellerRegisterValidationRules } from '../../validations/seller/seller.auth.validation.js';
const router = express.Router();
router.post('/register', sellerRegisterValidationRules, handleValidationErrors, sellerAuthController.register);
router.post('/login', sellerLoginValidationRules, handleValidationErrors, sellerAuthController.login);
export default router;