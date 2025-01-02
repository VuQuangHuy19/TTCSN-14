const express = require('express');
const router = express.Router();
const au = require('../app/middleware/Authentic')
const CartController = require('../app/controllers/CartController');

router.get('/xem', au, CartController.xem);

router.post('/them/:slug',au , CartController.addCart)

router.delete('/remove/:slug', au, CartController.removeCart)


module.exports = router;
