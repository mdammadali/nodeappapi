import httpStatus from 'http-status';
import asyncHandler from '../../utils/async.handler.js';
import ApiResponse from '../../utils/api.response.js';
import adminProfileService from '../../services/admin/admin.profile.service.js';

class AdminProfileController {
    getProfile = asyncHandler(async (req, res) => {

    });

    update = asyncHandler(async (req, res) => {

    });
    logout(req, res) {
        // Implement logout logic
        res.json({ message: 'Logout successful' });
    }
}
export default new AdminProfileController();