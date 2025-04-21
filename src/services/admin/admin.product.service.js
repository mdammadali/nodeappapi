import Product from '../../models/Product.model.js';
class AdminProductService {
    constructor(productModel) {
        this.Product = productModel;
    }
    async all() {
        const modelData = await this.Product.find({});
        return modelData;
    }
    
    async update(reqData) {
        const product = await this.Product.findById(reqData.id);
        if (!product) {
            throw new Error('Product not found');
        }
        product.title = reqData.title;
        product.description = reqData.description;
        product.price = reqData.price;
        if (reqData.image) {
            product.image = reqData.image;
        }
        await product.save();
        return product;
    }

    async create(reqData) {
        const modelData = new this.Product(reqData);
        await modelData.save();
        return modelData;
    }
}
export default new AdminProductService(Product);
