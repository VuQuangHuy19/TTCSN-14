const express = require('express');
const router = express.Router();

const LienheController = require('../app/controllers/LienheController');

router.get('/', LienheController.index);

module.exports = router;
