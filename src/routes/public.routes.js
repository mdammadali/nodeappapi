import express from 'express';
const router = express.Router();
import publicAuthRoutes from './public/public.auth.routes.js';
import publicProfileRoutes from './public/public.profile.routes.js';
const publicRoutes = [
    { path: '/auth', route: publicAuthRoutes },
    { path: '/profile', route: publicProfileRoutes }
]
publicRoutes.forEach(item => {
    router.use(item.path, item.route);
});
router.get('/health', (req, res) => res.status(200).send('OK'));
export default router;