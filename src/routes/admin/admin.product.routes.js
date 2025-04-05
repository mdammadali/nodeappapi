import express from "express";
import adminProductController from "../../controllers/admin/admin.product.controller.js";
import { adminProductCreateValidationRules, adminProductUpdateValidationRules } from "../../validations/admin/admin.product.validation.js";
import { handleValidationErrors } from "../../middlewares/validate.middleware.js";
import { authMiddleware, roleMiddleware } from "../../middlewares/auth.middleware.js";

const router = express.Router();
router.get('/all', authMiddleware, roleMiddleware(['admin', 'user']), adminProductController.all);
router.post('/create', adminProductCreateValidationRules, handleValidationErrors, roleMiddleware(['admin', 'user']), adminProductController.create);
router.post('/update', adminProductUpdateValidationRules, handleValidationErrors, adminProductController.update);
export default router;