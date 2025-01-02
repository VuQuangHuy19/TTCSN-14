const Admin = require("../models/Admin");
const Product = require('../models/Products');
const Order = require('../models/Orders');
const { mutipleMongooseToObject } = require('../../until/mongoose')
const bcrypt = require("bcrypt");
const Orders = require("../models/Orders");

class AdminController {
    // Trang đăng ký
    index(req, res) {
        res.render('register');
    }

    // Trang đăng nhập
    indexlogin(req, res) {
        res.render('admin');
    }

    

    // Xử lý đăng nhập
    async adminlog(req, res) {
        try {
            const { email, password } = req.body;

            // Tìm người dùng theo email
            const admin = await Admin.findOne({ email: email });
            if (!admin) {
                return res.render('admin', { errorMessage: "Email does not exist" });
            }

            // So sánh mật khẩu người dùng với mật khẩu đã mã hóa trong cơ sở dữ liệu
            const validPassword = await bcrypt.compare(password, admin.password);
            if (!validPassword) {
                return res.render('admin', { errorMessage: "Incorrect password" });
            }

            // Lưu thông tin người dùng vào session
            req.session.admin = {
                id: admin._id,
                fullName: admin.fullName,
                email: admin.email,
            };

            req.session.successMessage = "Login successful! Welcome back, " + admin.fullName;
            // Chuyển hướng đến trang home
            return res.redirect('/admin/qlsanpham');

        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server error", error: err });
        }
    }

    // // Route xử lý đăng xuất
    // logout(req, res) {
    //     req.session.destroy((err) => {
    //         if (err) {
    //             console.error(err);
    //             return res.status(500).json({ message: "Logout failed" });
    //         }
    //         res.redirect('/login'); // Chuyển hướng về trang đăng nhập
    //     });
    // }

    // Kiểm tra người dùng đã đăng nhập chưa
    async checkLoginStatus(req, res) {
        try {
            if (req.session && req.session.admin) {
                res.json({
                    loggedIn: true,
                    admin: {
                        fullName: req.session.admin.fullName,
                        email: req.session.admin.email,
                    },
                });
            } else {
                res.json({ loggedIn: false });
            }
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server error", error: err });
        }
    }


    async qlsanpham(req, res, next) {
        Product.find() // Lấy toàn bộ sản phẩm từ cơ sở dữ liệu
        .then(products => {
            res.render('admin/qlsanpham', {
                products: mutipleMongooseToObject(products) // Chuyển đổi dữ liệu để sử dụng trong Handlebars
            });
        })
        .catch(next); // Xử lý lỗi nếu có
    }

    // Thêm sản phẩm mới
async addProduct(req, res) {
    try {
        const { name, img, price, oldPrice, category } = req.body;

        // Tạo sản phẩm mới
        const newProduct = new Product({
            name,
            img,
            price,
            oldPrice,
            category, // Lấy dữ liệu từ form
        });

        await newProduct.save(); // Lưu vào DB
        req.session.successMessage = "Thêm sản phẩm thành công!";
        res.redirect('/admin/qlsanpham'); // Chuyển hướng về trang quản lý sản phẩm
    } catch (err) {
        console.error("Lỗi khi thêm sản phẩm:", err);
        res.status(500).send("Lỗi khi thêm sản phẩm");
    }
}


    // Xóa sản phẩm
    async deleteProduct(req, res) {
        const { id } = req.params;
        try {
            await Product.findByIdAndDelete(id);
            req.session.successMessage = "Xóa sản phẩm thành công!";
            res.redirect('/admin/qlsanpham');
        } catch (err) {
            console.error("Lỗi khi xóa sản phẩm:", err);
            res.status(500).send("Lỗi khi xóa sản phẩm");
        }
    }

    // Cập nhật sản phẩm
async updateProduct(req, res) {
    const { id, name, img, price, oldPrice, category } = req.body;
    try {
        await Product.findByIdAndUpdate(id, { name, img, price, oldPrice, category });
        req.session.successMessage = "Cập nhật sản phẩm thành công!";
        res.redirect('/admin/qlsanpham');
    } catch (err) {
        console.error("Lỗi khi cập nhật sản phẩm:", err);
        res.status(500).send("Lỗi khi cập nhật sản phẩm");
    }
}


    async qldonhang(req, res, next) {
        Order.find() // Lấy toàn bộ sản phẩm từ cơ sở dữ liệu
        .then(orders => {
            res.render('admin/qldonhang', {
                orders: mutipleMongooseToObject(orders) // Chuyển đổi dữ liệu để sử dụng trong Handlebars
            });
        })
        .catch(next); // Xử lý lỗi nếu có
    }

    
    // Thêm đơn hàng mới
// Thêm đơn hàng mới
async addOrder(req, res) {
    try {
        const { customerName, dateOrder, status } = req.body;

        // Tạo đơn hàng mới
        const newOrder = new Order({
            customerName,
            dateOrder,
            status
        });

        await newOrder.save(); // Lưu vào cơ sở dữ liệu
        req.session.successMessage = "Thêm đơn hàng thành công!";
        res.redirect('/admin/qldonhang'); // Chuyển hướng về trang quản lý đơn hàng
    } catch (err) {
        console.error("Lỗi khi thêm đơn hàng:", err);
        res.status(500).send("Lỗi khi thêm đơn hàng");
    }
}


// Sửa thông tin đơn hàng
async updateOrder(req, res) {
    const { id, customerName, dateOrder, status } = req.body;
    try {
        // Cập nhật thông tin đơn hàng
        await Order.findByIdAndUpdate(id, {
            customerName,
            dateOrder,
            status
        });

        req.session.successMessage = "Cập nhật đơn hàng thành công!";
        res.redirect('/admin/qldonhang'); // Quay lại trang danh sách đơn hàng
    } catch (err) {
        console.error("Lỗi khi cập nhật đơn hàng:", err);
        res.status(500).send("Lỗi khi cập nhật đơn hàng");
    }
}

// Xóa đơn hàng
async deleteOrder(req, res) {
    const { id } = req.params; // Lấy ID đơn hàng từ URL
    try {
        await Order.findByIdAndDelete(id); // Xóa đơn hàng
        req.session.successMessage = "Xóa đơn hàng thành công!";
        res.redirect('/admin/qldonhang'); // Chuyển hướng về trang quản lý đơn hàng
    } catch (err) {
        console.error("Lỗi khi xóa đơn hàng:", err);
        res.status(500).send("Lỗi khi xóa đơn hàng");
    }
}



    



}




module.exports = new AdminController();
