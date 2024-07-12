const mongoose = require('mongoose');

// can we create a 'view' for the orders page?

const OrderSchema = new mongoose.Schema(
    {
        userID: { type: String, required: true},
        products: [
            {
                SKU: { type: String, required: true, maxlength: 8},
                quantity: { type: Number, required: true, default: 1},
            }
        ],
        amount: { type: Number, required: true},
        address: { type: Object, required: true},
    },
    {timestamps: true}
);

module.exports = mongoose.model('Order', OrderSchema);