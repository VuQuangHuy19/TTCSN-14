const Cart = require('../models/Cart');
const Order = require('../models/Orders'); // Import model Order
const Wallet = require('../models/Wallet');
class CheckoutController {
    // [GET] /checkout
    async index(req, res) {
        try {
            const userId = req.session.user.id; // Truy cập thông tin người dùng từ session
            const cart = await Cart.findOne({ userId });

            if (!cart || cart.items.length === 0) {
                return res.redirect('/cart/xem'); // Nếu giỏ hàng rỗng, quay lại trang giỏ hàng
            }

            const total = cart.items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
            res.render('user/checkout', { cart, total });

        } catch (error) {
            console.error(error);
            res.redirect('/cart/xem');
        }
    }

    async confirm(req, res) {
        try {
            const userId = req.session.user?.id;
            const cart = await Cart.findOne({ userId });
            if (!cart || cart.items.length === 0) {
                return res.redirect('/cart');
            }

            const totalAmount = cart.items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);
            req.session.paymentStatus = 'Đã thanh toán và chờ xác nhận';
            res.status(200).end();
        } catch (error) {
            res.redirect('/checkout');
        }
    }

    // [POST] /checkout/place-order (Đặt hàng)
    async placeOrder(req, res) {
        try {
            const userId = req.session.user.id;  // ID người dùng
            const cart = await Cart.findOne({ userId });

            if (!cart || cart.items.length === 0) {
                return res.redirect('/cart/xem');
            }

            // Tính tổng tiền
            const totalAmount = cart.items.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0);

            const newOrder = new Order({
                userId,
                items: cart.items,
                totalAmount,
                status: 'Chờ thanh toán', 
                paymentMethod: 'My wallet', 
            });

            // Lưu đơn hàng
            await newOrder.save();

            // Xóa giỏ hàng sau khi tạo đơn hàng
            await Cart.deleteOne({ userId });

            // Chuyển hướng người dùng tới trang thanh toán
            res.redirect(`/checkout/payment/${newOrder._id}`);

        } catch (error) {
            console.error(error);
            res.redirect('/checkout');
        }
    }

    async confirmPayment(req, res) {
        try {
            const orderId = req.params.id;  // Lấy ID đơn hàng từ URL
            const order = await Order.findById(orderId);  // Tìm đơn hàng trong cơ sở dữ liệu

            if (!order || order.status !== 'Chờ thanh toán') {
                return res.status(400).json({ message: 'Đơn hàng không hợp lệ hoặc đã thanh toán' });
            }

            // Kiểm tra số dư trong ví
            const userId = req.session.user.id;
            const wallet = await Wallet.findOne({ userId });

            if (!wallet || wallet.balance < order.totalAmount) {
                return res.redirect('/pro/naptien');
            }

            // Trừ số tiền thanh toán từ ví
            wallet.balance -= order.totalAmount;
            await wallet.save();

            // Cập nhật trạng thái đơn hàng
            order.status = 'Đã thanh toán và chờ xác nhận';  // Cập nhật trạng thái
            await order.save();  // Lưu thay đổi đơn hàng

            // Trả về thông báo thành công
            res.render('user/payment-success', { message: 'Xác nhận thanh toán thành công!' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Có lỗi xảy ra. Vui lòng thử lại.' });
        }
    }
    async showPaymentPage(req, res) {
        try {
            const orderId = req.params.id;  // Lấy orderId từ URL
            const order = await Order.findById(orderId).populate('items');  // Lấy thông tin đơn hàng từ database

            if (!order) {
                return res.status(404).send('Đơn hàng không tồn tại');
            }

            // Lấy ví của người dùng để kiểm tra số dư
            const userId = req.session.user.id;
            const wallet = await Wallet.findOne({ userId });

            // Render trang thanh toán với thông tin đơn hàng và ví
            res.render('user/payment', { order, wallet });  // Giả sử bạn có view 'payment'
        } catch (error) {
            console.error(error);
            res.status(500).send('Lỗi hệ thống');
        }
    }

    async cancelOrder(req, res) {
        try {
            const orderId = req.params.id; // Lấy ID đơn hàng từ URL
            const userId = req.session.user.id; // Lấy ID người dùng từ session
    
            // Tìm đơn hàng
            const order = await Order.findOne({ _id: orderId, userId });
    
            if (!order) {
                return res.status(404).json({ message: 'Đơn hàng không tồn tại' });
            }
    
            // Chỉ cho hphép hủy đơn hàng ở trạng thái "Chờ xác nận" hoặc "Chờ thanh toán"
            if (order.status !== 'Chờ thanh toán' && order.status !== 'Đã thanh toán và chờ xác nhận') {
                return res.status(400).json({ message: 'Không thể hủy đơn hàng ở trạng thái hiện tại' });
            }
    
            // Hoàn tiền vào ví nếu đơn hàng đã thanh toán
            if (order.status === 'Đã thanh toán và chờ xác nhận') {
                const wallet = await Wallet.findOne({ userId });
    
                if (!wallet) {
                    return res.status(404).json({ message: 'Không tìm thấy ví của người dùng' });
                }
    
                wallet.balance += order.totalAmount; // Hoàn lại số tiền
                await wallet.save();
            }
    
            // Xóa đơn hàng
            await Order.deleteOne({ _id: orderId });
    
            res.render('user/thongtin')
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Có lỗi xảy ra. Vui lòng thử lại.' });
        }
    }
    
}

module.exports = new CheckoutController();
