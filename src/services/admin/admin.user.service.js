import User from '../../models/User.model.js';
class AdminUserService {
    constructor(userModel) {
        this.User = userModel;
    }
    async all() {
        const modelData = await this.User.find({});
        return modelData;
    }
    async findById(id) {
        const modelData = await this.User.findById(id);
        return modelData;
    }
    async create(reqData) {
        const modelData = new this.User(reqData);
        await modelData.save();
        return modelData;
    }
}
export default new AdminUserService(User);
