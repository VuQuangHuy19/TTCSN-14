const express = require('express');
const router = express.Router();
const au = require('../app/middleware/Authentic')
const CheckoutController = require('../app/controllers/CheckoutController');

router.get('/', au, CheckoutController.index);

// Route xác nhận thanh toán
router.post('/confirm', au, CheckoutController.confirm);
// Route chỉ đặt hàng
router.post('/place-order', au, CheckoutController.placeOrder);
// Xác nhận thanh toán cho đơn hàng
router.post('/confirm-payment/:id', au, CheckoutController.confirmPayment);
// Route hiển thị trang thanh toán với thông tin đơn hàng
router.get('/payment/:id', au, CheckoutController.showPaymentPage);

router.post('/cancel-order/:id', au, CheckoutController.cancelOrder)


module.exports = router;
