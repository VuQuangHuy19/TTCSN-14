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
    citizenID: { // CCCD
        type: String,
        required: true,
        unique: true,
        minlength: 9,
        maxlength: 12 // CCCD thường có 12 số
    },
    passport: { // Passport
        type: String,
        required: false, // Không bắt buộc
        unique: true
    },
    dateOfIssue: { // Ngày cấp CMND
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
    referralCode: { // Mã giới thiệu
        type: String,
        required: false, // Không bắt buộc
        maxlength: 50
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

module.exports = mongoose.model('User', userSchema);
