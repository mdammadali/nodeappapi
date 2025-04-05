import httpStatus from 'http-status';
import asyncHandler from '../../utils/async.handler.js';
import ApiResponse from '../../utils/api.response.js';
import adminUserService from '../../services/admin.user.service.js';

class AdminUserController {
    all = asyncHandler(async (req, res) => {
        const result = await adminUserService.all();
        res.status(httpStatus.OK).json(
            new ApiResponse(httpStatus.OK, result, 'Data List Fetched Successfully')
        );
    });

    create = asyncHandler(async (req, res) => {
        const { name, email, password, role } = req.body;
        if (!name || !email || !password || !role) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'All fields are required');
        }
        const product = await adminUserService.create(req.body);
        res.status(httpStatus.CREATED).json(
            new ApiResponse(httpStatus.CREATED, product.toJSON(), 'Product Create Successfully')
        );
    });

    update = asyncHandler(async (req, res) => {
        const { title, description, price } = req.body;
        if (!title || !description || !price) {
            throw new ApiError(httpStatus.BAD_REQUEST, 'All fields are required');
        }
        const product = await adminUserService.create(req.body);
        res.status(httpStatus.CREATED).json(
            new ApiResponse(httpStatus.CREATED, product.toJSON(), 'Product Create Successfully')
        );
    });

}
export default new AdminUserController();