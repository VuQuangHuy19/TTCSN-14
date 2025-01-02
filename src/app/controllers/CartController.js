const Product = require('../models/Products');
const Cart = require('../models/Cart'); // Thêm Cart model
const { mutipleMongooseToObject } = require('../../until/mongoose');
const User = require('../models/User');
class CartController {

    // Xem giỏ hàng của người dùng
    async xem(req, res) {
        if (!req.session.user) {
            return res.status(401).json({ message: "Vui lòng đăng nhập để xem giỏ hàng" });
        }
    
        try {
            const cart = await Cart.findOne({ userId: req.session.user.id });
            console.log("Cart:", cart); // Kiểm tra dữ liệu
    
            if (!cart || !cart.items) {
                return res.render('cart', { cart: { items: [] }, total: 0 });
            }
    
            const total = cart.items.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0);
            console.log("Rendered Cart:", cart);
            console.log("Total:", total);
            res.render('cart', { cart, total }); // Gửi dữ liệu đến view
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ message: "Đã xảy ra lỗi khi hiển thị giỏ hàng", error: err.message });
        }
    }
    
    


    // Thêm product vào giỏ hàng
    async addCart(req, res) {
        try {
            const { slug } = req.params;
    
            const product = await Product.findOne({ slug });
            if (!product) {
                return res.status(404).json({ message: 'Product không tồn tại' });
            }
    
            let cart = await Cart.findOne({ userId: req.session.user.id });
            if (!cart) {
                cart = new Cart({ userId: req.session.user.id, items: [] });
            }
    
            const existingItem = cart.items.find(item => item.slug === slug);
            if (existingItem) {
                existingItem.quantity += 1; // Tăng số lượng nếu sản phẩm đã tồn tại
            } else {
                cart.items.push({
                    slug: product.slug,
                    name: product.name,
                    price: product.price,
                    image: product.image,
                    quantity: 1, // Thêm số lượng ban đầu là 1
                });
            }
    
            await cart.save();
            res.json({ success: true, message: 'Product đã được thêm vào giỏ hàng', cart });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ success: false, message: "Đã xảy ra lỗi khi thêm vào giỏ hàng", error: err.message });
        }
    }
    


    // Xóa tour khỏi giỏ hàng
    async removeCart(req, res) {
        const { slug } = req.params;
        try {
            const cart = await Cart.findOne({ userId: req.session.user.id });
            if (!cart) {
                return res.status(404).json({ message: "Giỏ hàng không tồn tại" });
            }

            // Tìm và xóa tour khỏi giỏ hàng
            cart.items = cart.items.filter(item => item.slug !== slug);
            await cart.save();
            res.json({ success: true, message: 'Tour đã được xóa khỏi giỏ hàng', cart });
        } catch (err) {
            console.error('Error:', err);
            res.status(500).json({ message: "Đã xảy ra lỗi khi xóa tour khỏi giỏ hàng", error: err.message });
        }
    }
}

module.exports = new CartController();
