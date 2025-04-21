import express from 'express';
const router = express.Router();
import sellerAuthRoutes from './seller/seller.auth.routes.js';
import sellerProfileRoutes from './seller/seller.profile.routes.js';
const sellerRoutes = [
    { path: '/auth', route: sellerAuthRoutes },
    { path: '/profile', route: sellerProfileRoutes }
]
sellerRoutes.forEach(item => {
    router.use(item.path, item.route);
});
router.get('/health', (req, res) => res.status(200).send('OK'));
export default router;