import express from 'express';
const router = express.Router();
import adminAuthRoutes from './admin/admin.auth.routes.js';
const adminRoutes = [
    { path: '/auth', route: adminAuthRoutes },
]

adminRoutes.forEach(adminRoutes => {
    router.use(adminRoutes.path, adminRoutes.route);
});
router.get('/health', (req, res) => res.status(200).send('OK'));
export default router;