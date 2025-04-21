import ApiError from "../../utils/api.error.js";
import httpStatus from 'http-status';
import User from '../../models/User.model.js';
class AdminProfileService {
    constructor(userModel) {
        this.User = userModel;
    }

}
export default new AdminProfileService(User);
