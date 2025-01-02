const mongoose = require('mongoose');

const walletSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    balance: { type: Number, default: 0 }, // Số tiền trong ví
});

module.exports = mongoose.model('Wallet', walletSchema);
