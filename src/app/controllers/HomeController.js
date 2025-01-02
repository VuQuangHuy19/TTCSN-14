const Product = require('../models/Products');
const { mutipleMongooseToObject } = require('../../until/mongoose')


class HomeController {
    index(req, res, next, successMessage = null) {
        // Danh sách các sản phẩm cần lấy ra
        const selectedProducts = [
            "Kem Ốc Quế",
            "Kem Ốc Quế Matcha",
            "Kem Sunade Dâu Tây",
            "Kem Sunade Xoài",
            "Kem Sunade Đào",
            "Chanh Leo Bách Hương",
            "Trà Sữa Chân Trâu Đường Đen",
            "Nước Trái Cây Dừa Đào",
            "Nước Chanh Tươi Lạnh"
        ];

        // Điều kiện tìm kiếm theo danh sách sản phẩm
        const condition = { name: { $in: selectedProducts } };

        Product.find(condition) // Tìm các sản phẩm khớp với điều kiện
            .then(products => {
                res.render('home', {
                    products: mutipleMongooseToObject(products),
                    successMessage: successMessage // Gửi thông báo vào view
                });
            })
            .catch(next);
    }
}


module.exports = new HomeController();