import express from 'express'
const app = express()
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import adminRoutes from './routes/admin.routes.js'
import sellerRoutes from './routes/seller.routes.js'
import publicRoutes from './routes/public.routes.js'
import ApiError from './utils/api.error.js'
import httpStatus from 'http-status';
import errorHandler from './middlewares/error.handler.middleware.js'

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*', credentials: true }))
app.use(helmet());
app.use(morgan('dev'));
app.use('/api/admin', adminRoutes)
app.use('/api/seller', sellerRoutes)
app.use('/api', publicRoutes)
app.get('/', (req, res) => {
    res.status(200).send('API is running')
});
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'API route not found'));
});
app.use(errorHandler);
export default app