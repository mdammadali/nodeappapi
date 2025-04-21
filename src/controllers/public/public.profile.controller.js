import asyncHandler from "../../utils/async.handler.js";

class PublicProfileController {
    getProfile = asyncHandler(async (req, res) => {

    });
    update = asyncHandler(async (req, res) => {

    });
    logout(req, res) {
        // Implement logout logic
        res.json({ message: 'Logout successful' });
    }
}
export default new PublicProfileController;