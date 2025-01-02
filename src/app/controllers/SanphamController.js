const Product = require('../models/Products');
const { mutipleMongooseToObject } = require('../../until/mongoose')


class SanphamController {
    
    menu(req, res, next) {
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
                res.render('sanpham/menu', {
                    products: mutipleMongooseToObject(products)
                });
            })
            .catch(next);
    }


    best(req, res, next)
    {
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
                res.render('sanpham/best', {
                    products: mutipleMongooseToObject(products)
                });
            })
            .catch(next);
    }

    kemtra(req, res, next)
    {
        const selectedProducts = [
            "Kem Ốc Quế",
            "Kem Ốc Quế Matcha",
            "Kem Sunade Dâu Tây",
            "Kem Sunade Xoài",
            "Kem Sunade Đào",
            "Sinh Tố Kem Tươi Macha",
            "Xoài Lắc Kem",
            "Sinh Tố Kem Tươi Hoa Nhài"
        ];

        // Điều kiện tìm kiếm theo danh sách sản phẩm
        const condition = { name: { $in: selectedProducts } };

        Product.find(condition) // Tìm các sản phẩm khớp với điều kiện
            .then(products => {
                res.render('sanpham/kemtra', {
                    products: mutipleMongooseToObject(products)
                });
            })
            .catch(next);
    }
    
    dua(req, res, next)
    {
        const selectedProducts = [
            "Nước Trái Cây Dừa Đào",
            "Nước Trái Cây Dừa Xoài"
        ];

        // Điều kiện tìm kiếm theo danh sách sản phẩm
        const condition = { name: { $in: selectedProducts } };

        Product.find(condition) // Tìm các sản phẩm khớp với điều kiện
            .then(products => {
                res.render('sanpham/dua', {
                    products: mutipleMongooseToObject(products)
                });
            })
            .catch(next);
    }
    
    hoaqua(req, res, next)
    {
        const selectedProducts = [
            "Hồng Trà Chanh",
            "Trà Nhài Hương Nho",
            "Trà Nhài Hương Dâu",
            "Chanh Leo Bách Hương",
            "Nước Chanh Tươi Lạnh"
        ];

        // Điều kiện tìm kiếm theo danh sách sản phẩm
        const condition = { name: { $in: selectedProducts } };

        Product.find(condition) // Tìm các sản phẩm khớp với điều kiện
            .then(products => {
                res.render('sanpham/hoaqua', {
                    products: mutipleMongooseToObject(products)
                });
            })
            .catch(next);
    }
    
    
    trasua(req, res, next)
    {
        const selectedProducts = [
            "Trà Sữa Dâu Tây",
            "Trà Sữa Chân Trâu Đường Đen",
            "Trà Sữa Khoai Môn",
            "Trà Sữa Thạch Dừa",
            "Trà Sữa Ngưu Ma Vương",
            "Trà Sữa Đào Mật Ong",
            "Trà Sữa Hương Nhài",
            
        ];

        // Điều kiện tìm kiếm theo danh sách sản phẩm
        const condition = { name: { $in: selectedProducts } };

        Product.find(condition) // Tìm các sản phẩm khớp với điều kiện
            .then(products => {
                res.render('sanpham/trasua', {
                    products: mutipleMongooseToObject(products)
                });
            })
            .catch(next);
    }
}

module.exports = new SanphamController();