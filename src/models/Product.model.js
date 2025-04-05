import mongoose from "mongoose";
const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Please provide your title'],
        trim: true,
        maxlength: [165, 'Title cannot be more than 165 characters'],
    },
    description: {
        type: String,
        required: [true, 'Please provide a description'],
        trim: true,
        maxlength: [500, 'Description cannot be more than 500 characters'],
    },
    price: {
        type: Number,
        required: [true, 'Please provide a price']
    },
    image: {
        type: String,
        required: [false, 'Please provide an image'],
        trim: true,
        maxlength: [165, 'Image cannot be more than 165 characters'],
    },
}, {
    timestamps: true
});
const Product = mongoose.model('Product', productSchema);
export default Product;