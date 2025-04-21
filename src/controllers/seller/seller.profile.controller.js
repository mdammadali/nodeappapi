import asyncHandler from "../../utils/async.handler.js";

class sellerProfileController {
    getProfile = asyncHandler(async (req, res) => {

    })
    update = asyncHandler(async (req, res) => {

    });
    logout = asyncHandler(async (req, res) => {
        res.json({ message: 'Logout successful' });
    });
}
export default new sellerProfileController;