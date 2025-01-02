const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    fullName: { // Họ tên
        type: String,
        required: true,
        minlength: 6,
        maxlength: 100
    },
        password: { // Mật khẩu
        type: String,
        required: true,
        minlength: 6
    },
    email: { // Email
        type: String,
        required: true,
        unique: true,
        maxlength: 50
    }
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);
