const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema(
    {
<<<<<<< Updated upstream
        userId: { type: String, required: true},
=======
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
>>>>>>> Stashed changes
        products: [
            {
                product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true }
            }
        ]
    },
    { timestamps: true }
);

module.exports = mongoose.model('Cart', CartSchema);