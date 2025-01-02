const experess = require('express')
const router = experess.Router();
const au = require('../app/middleware/Authentic')
const ProController = require('../app/controllers/ProController');

router.get('/naptien', au, ProController.hienthiWallet);
router.post('/naptien', au, ProController.napWallet);
router.get('/thongtin', au, ProController.thongtin);
router.post('/capnhat', au, ProController.capnhat);
router.get('/donhang', au, ProController.donhang);


module.exports = router;