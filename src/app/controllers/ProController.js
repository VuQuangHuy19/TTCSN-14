
const User = require('../models/User');
const Order = require('../models/Orders');
const Tour = require('../models/Products');
const bcrypt = require('bcrypt');
const Wallet = require('../models/Wallet');

class Pro
{

    
    //hienthitrangnaptien
    async hienthiWallet(req, res) {
        try {
            if (!req.session.user) {
                return res.redirect('/login');
            }

            const userId = req.session.user.id;
            const wallet = await Wallet.findOne({ userId });
            if (!wallet) {
                wallet = await Wallet.create({ userId, balance: 0 }); // Tạo ví mới với số dư 0
            }
            res.render('user/naptien', { wallet });
        } catch (err) {
            console.error(err);
            res.redirect('/pro/naptien');
        }
    }

    // Xử lý nạp tiền vào ví
    async napWallet(req, res) {
        try {
            if (!req.session.user) {
                return res.redirect('/login');
            }

            const userId = req.session.user.id;
            const { amount } = req.body;
            // Kiểm tra tính hợp lệ của số tiền
            if (!amount || isNaN(amount) || amount <= 0) {
                return res.status(400).json({ message: "Invalid amount" });
            }

            const wallet = await Wallet.findOneAndUpdate(
                { userId },
                { $inc: { balance: Number(amount) } },
                { new: true, upsert: true } // Tạo ví mới nếu chưa tồn tại
            );

            res.render('user/naptien', { wallet, successMessage: 'Nạp tiền thành công!' });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server error", error: err });
        }
    }

    // Hiển thị trang cập nhật thông tin cá nhân
    async thongtin(req, res) {
        try {
            if (!req.session.user) {
                return res.redirect('/login');
            }
            const userId = req.session.user.id;
            const user = await User.findById(userId);
            res.render('user/thongtin', { user });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server error", error: err });
        }
    }

    async capnhat(req, res) {
        try {
            if (!req.session.user) {
                return res.redirect('/login');
            }
            const userId = req.session.user.id;
            const { fullName, email, phone, address, password } = req.body;            
            await User.findByIdAndUpdate(userId, { fullName, email, phone, address });

            // Kiểm tra trùng lặp email, fullname, phoneNumber
            const existingUser = await User.findOne({ $or: [{ fullName }, { email }, { phone }] });
            if (existingUser && existingUser.id !== userId) {
                return res.render('user/thongtin', {
                    user: req.body,
                    errorMessage: 'fullName, email, or phone number already in use.'
                });
            }

            // Nếu có thay đổi mật khẩu, mã hóa mật khẩu
            let hashedPassword = password;
            if (password) {
                const salt = await bcrypt.genSalt(10);
                hashedPassword = await bcrypt.hash(password, salt);
            }

            // Cập nhật thông tin người dùng
            await User.findByIdAndUpdate(userId, {
                fullName,
                email,
                phone,
                address,
                password: hashedPassword !== password ? hashedPassword : undefined // Chỉ cập nhật password nếu có thay đổi
            });

            // Cập nhật lại session sau khi thay đổi thông tin
            req.session.user = await User.findById(userId);
            res.redirect('/login');
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server error", error: err });
        }
    }

    // Hiển thị danh sách đơn hàng
    async donhang(req, res) {
        try {
            if (!req.session.user) {
                return res.redirect('/login');
            }
            const userId = req.session.user.id;
            console.log(`User ID: ${userId}`); // Log để kiểm tra user ID

            const orders = await Order.find({ userId }).sort({ createdAt: -1 });
            console.log(`Orders: ${JSON.stringify(orders)}`); // Kiểm tra dữ liệu đơn hàng

            res.render('user/donhang', { orders });
        } catch (err) {
            console.error(err); // Kiểm tra chi tiết lỗi
            res.status(500).json({ message: "Server error", error: err });
        }
    }

    // Hiển thị chi tiết đơn hàng
    async orderDetail(req, res) {
        try {
            if (!req.session.user) {
                return res.redirect('/login');
            }
            const { orderId } = req.params;
            const order = await Order.findById(orderId).populate('items.slug');

            if (!order) {
                return res.status(404).render('404', { message: "Order not found" });
            }

            res.render('users/order-detail', { order });
        } catch (err) {
            console.error(err);
            res.status(500).json({ message: "Server error", error: err });
        }
    }

}

module.exports = new Pro();