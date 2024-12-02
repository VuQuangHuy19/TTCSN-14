const experess = require('express')
const router = experess.Router();

const HomeController = require('../app/controllers/HomeController');


router.get('/', HomeController.index)


module.exports = router;
