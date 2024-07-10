const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        firstName: { type: String, required: true},
        lastName: { type: String, required: true},
        username: { type: String, required: true, unique: true},
        password: { type: String, required: true},
        email: { type: String, required: true, unique: true},
        DOB: { type: Date, required: true},
        isAdmin: { type: Boolean, default: false},
        isSeller: { type: Boolean, default: false},
    },
    {timestamps: true}
);

module.exports = mongoose.model('User', UserSchema);