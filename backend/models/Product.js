const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        name: { type: String, required: true},
        desc: { type: String, required: true},
        price: { type: Number, required: true},
        src: { type: String, required: true},
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    },
    {timestamps: true}
);

module.exports = mongoose.model('Product', ProductSchema);