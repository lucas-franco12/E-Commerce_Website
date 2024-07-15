const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
<<<<<<< Updated upstream
        SKU: { type: String, required: true, unique: true, maxlength: 8},
        productName: { type: String, required: true},
        description: { type: String, required: true},
        price: { type: Number, required: true},
        countInStock: { type: Number, required: true},
        imageUrl: { type: String, required: true},
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'Seller', required: true },
=======
        name: { type: String, required: true},
        desc: { type: String, required: true},
        price: { type: Number, required: true},
        src: { type: String, required: true},
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
>>>>>>> Stashed changes
    },
    {timestamps: true}
);

module.exports = mongoose.model('Product', ProductSchema);