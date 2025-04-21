import express from 'express';
import publicProfileController from '../../controllers/public/public.profile.controller.js';
import { handleValidationErrors } from '../../middlewares/validate.middleware.js';
import { publicProfileUpdateValidationRules, publicProfileLogoutValidationRules } from '../../validations/public/public.profile.validation.js';
const router = express.Router();
router.post('/:id', publicProfileUpdateValidationRules, handleValidationErrors, publicProfileController.getProfile);
router.post('/update:id', publicProfileUpdateValidationRules, handleValidationErrors, publicProfileController.update);
router.post('/logout', publicProfileLogoutValidationRules, handleValidationErrors, publicProfileController.logout);
export default router;