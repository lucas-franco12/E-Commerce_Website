const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema(
    {
        userID: { type: String, required: true, maxlength: 9},
        products: [
            {
                SKU: { type: String, required: true, maxlength: 8},
                quantity: { type: Number, required: true, default: 1},
            }
        ],
        amount: { type: Number, required: true},
        address: { type: Object, required: true},
        status: { type: String, default: 'Pending'},
    },
    {timestamps: true}
);

module.exports = mongoose.model('Order', OrderSchema);