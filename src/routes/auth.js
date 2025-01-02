const express = require("express");
const router = express.Router();
const AuthController = require("../app/controllers/AuthControllers");

// Route đăng ký
router.get("/register", AuthController.index);
router.post("/register", AuthController.register);

// Route đăng nhập
router.get("/login", AuthController.indexlogin);
router.post("/login", AuthController.login);

// Route đăng xuất
router.get("/logout", AuthController.logout);

router.get("/check", AuthController.check);


// Route hiển thị thông tin người dùng
router.get("/user", AuthController.userProfile);

module.exports = router;
