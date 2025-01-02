const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { // Họ tên
        type: String,
        required: true,
        minlength: 6,
        maxlength: 100
    },
    dateOfBirth: { // Ngày sinh
        type: Date,
        required: true
    },
    country: { // Quốc gia
        type: String,
        required: true,
        maxlength: 100
    },
    province: { // Tỉnh/TP
        type: String,
        required: true,
        maxlength: 100
    },
    district: { // Quận/Huyện
        type: String,
        required: true,
        maxlength: 100
    },
    address: { // Địa chỉ chi tiết
        type: String,
        required: true,
        maxlength: 200
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
    },
    phone: { // Họ tên
        type: String,
        required: true,
        minlength: 6,
        maxlength: 100
    }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
