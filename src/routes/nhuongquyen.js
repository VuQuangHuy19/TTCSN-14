const express = require('express');
const router = express.Router();
const NhuongquyenController = require('../app/controllers/NhuongquyenController');

router.get('/', NhuongquyenController.index);

module.exports = router;
