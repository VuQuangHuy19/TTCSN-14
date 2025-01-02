const experess = require('express')
const router = experess.Router();

const HomeController = require('../app/controllers/HomeController');


router.get('/', (req, res, next) => {
    if (req.session && req.session.successMessage) {
        const successMessage = req.session.successMessage;
        req.session.successMessage = null; // Xóa thông báo sau khi hiển thị
        HomeController.index(req, res, next, successMessage);
    } else {
        HomeController.index(req, res, next);
    }
});

module.exports = router;
