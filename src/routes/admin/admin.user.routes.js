import adminUserController from "../../controllers/admin/admin.user.controller.js";
import { authMiddleware, roleMiddleware } from "../../middlewares/auth.middleware.js";
import { handleValidationErrors } from "../../middlewares/validate.middleware.js";
import express from "express";
import { adminUserCreateValidationRules, adminUserUpdateValidationRules } from "../../validations/admin/admin.user.validation.js";
const router = express.Router();
router.get('/all', authMiddleware, roleMiddleware(['admin', 'user']), adminUserController.all);
router.post('/create', adminUserCreateValidationRules, handleValidationErrors, roleMiddleware(['admin', 'user']), adminUserController.create);
router.post('/update', adminUserUpdateValidationRules, handleValidationErrors, adminUserController.update);
export default router;