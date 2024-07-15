const mongoose = require('mongoose');
//this was order relation

const CartSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true},
        products: [
            {
                SKU: { type: String, required: true, maxlength: 8},
                quantity: { type: Number, required: true, default: 1},
            }
        ]
    },
    {timestamps: true}
);

module.exports = mongoose.model('Cart', CartSchema);