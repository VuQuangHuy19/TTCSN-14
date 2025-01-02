const experess = require('express')
const router = experess.Router();

const AboutController = require('../app/controllers/SanphamController');

router.get('/menu', AboutController.menu)
router.get('/best', AboutController.best)
router.get('/kemtra', AboutController.kemtra)
router.get('/dua', AboutController.dua)
router.get('/hoaqua', AboutController.hoaqua)
router.get('/trasua', AboutController.trasua)



module.exports = router;
