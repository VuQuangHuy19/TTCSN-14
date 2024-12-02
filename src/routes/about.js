const experess = require('express')
const router = experess.Router();

const AboutController = require('../app/controllers/AboutController');

router.get('/', AboutController.index)


module.exports = router;
