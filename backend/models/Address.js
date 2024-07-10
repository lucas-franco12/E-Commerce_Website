const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema(
    {
        extendedZipCode: { type: String, required: true, unique: true, maxlength: 10},// maxlength simulates char(9)
        street: { type: String, required: true},
        country: { type: String, required: true},
        city: { type: Number, required: true, unique: true},
        state: { type: Number, required: true},
    },
    {timestamps: true}
);

module.exports = mongoose.model('Address', AddressSchema);