const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ObjectId = Schema.ObjectId;

const Products = new Schema({
  id: ObjectId,
  name: String,
  image: String,
  price: { type: Number, default: 0 },
  oldPrice: { type: Number, default: 0 },
  category: {
    type: String,
    enum: ['Kem', 'Trà Sữa', 'Nước Hoa Quả', 'Nước Dừa'], // Giá trị giới hạn
    required: true, // Bắt buộc phải có
  },
  slug: { type: String, unique: true }  
 
});

// Thêm hàm tạo slug trước khi lưu


module.exports = mongoose.model('Products', Products);
