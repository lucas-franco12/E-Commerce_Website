const mongoose = require('mongoose');

// can we create a 'view' for the orders page?

const OrderSchema = new mongoose.Schema(
    {
        userId: { type: String, required: true},
        products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
        amount: { type: Number, required: true},
        address: { type: Object, required: true},
        date: { type: Date, default: Date.now }
    },
    {timestamps: true}
);

module.exports = mongoose.model('Order', OrderSchema);