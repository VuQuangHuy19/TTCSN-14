const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid'); // Dùng thư viện uuid để tạo mã đơn hàng duy nhất

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    codeOrder: { // Mã đơn hàng tự động tạo
        type: String,
        required: true,
        unique: true,
        default: () => uuidv4(), // Tạo mã đơn hàng tự động bằng uuid
    },
    items: [{
        slug: { type: String, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },
        quantity: { type: Number, default: 1 },
      }],
    dateOrder: { // Ngày đặt hàng
        type: Date,
        required: true,
        default: Date.now // Mặc định là ngày hiện tại
    },
  totalAmount: { type: Number, required: true },
    status: { // Trạng thái đơn hàng
        type: String,
        required: true,
        enum: ['Chờ thanh toán', 'Đã thanh toán và chờ xác nhận', 'Hoàn tất'],
        default: 'Chờ thanh toán'
    },
    paymentMethod: { type: String, required: true, default: 'Giả lập' }
}, 
{ timestamps: true }); // Tự động thêm createdAt và updatedAt

module.exports = mongoose.model('Order', orderSchema);
