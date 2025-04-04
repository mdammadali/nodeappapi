import adminProductController from "../../controllers/admin/admin.product.controller";
import { adminProductCreateValidationRules, adminProductUpdateValidationRules } from "../../validations/admin/admin.product.validation";

const router = express.Router();
router.get('/all', adminProductController.all);
router.post('/create', adminProductCreateValidationRules, handleValidationErrors, adminProductController.create);
router.post('/update', adminProductUpdateValidationRules, handleValidationErrors, adminProductController.update);
export default router;