import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide your title'],
        trim: true,
        maxlength: [165, 'Title cannot be more than 165 characters'],
    },
}, {
    timestamps: true
});
const Product = mongoose.model('Product', productSchema);
export default Product;