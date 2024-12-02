const express = require('express');
const router = express.Router();
const AuthController = require('../app/controllers/AuthControllers');

// Trang đăng ký
router.get('/register', AuthController.index);

// Trang đăng nhập
router.get('/login', AuthController.indexlogin);

// Xử lý đăng ký người dùng
router.post('/register', AuthController.register);

// Xử lý đăng nhập
router.post('/login', AuthController.login);

// Xử lý đăng xuất
router.get('/logout', AuthController.logout);

module.exports = router;
