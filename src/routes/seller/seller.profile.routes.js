import express from 'express';
import sellerProfileController from '../../controllers/seller/seller.profile.controller.js';
import { handleValidationErrors } from '../../middlewares/validate.middleware.js';
import { sellerProfileLogoutValidationRules, sellerProfileUpdateValidationRules } from '../../validations/seller/seller.profile.validation.js';
const router = express.Router();
router.post('/:id', sellerProfileUpdateValidationRules, handleValidationErrors, sellerProfileController.getProfile);
router.post('/update:id', sellerProfileUpdateValidationRules, handleValidationErrors, sellerProfileController.update);
router.post('/logout', sellerProfileLogoutValidationRules, handleValidationErrors, sellerProfileController.logout);
export default router;