const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        SKU: { type: String, required: true, unique: true, maxlength: 8},
        productName: { type: String, required: true},
        description: { type: String, required: true},
        categories: { type: Array},
        price: { type: Number, required: true},
        countInStock: { type: Number, required: true},
        imageUrl: { type: String, required: true},
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    },
    {timestamps: true}
);

module.exports = mongoose.model('Product', ProductSchema);