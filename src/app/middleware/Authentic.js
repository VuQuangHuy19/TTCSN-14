function isAuthenticated(req, res, next) {
    if (req.session.user) { // Kiểm tra xem session có thông tin user không
        return next(); // Tiếp tục xử lý nếu đã đăng nhập
    }
    res.redirect('/login');
}

module.exports = isAuthenticated;
