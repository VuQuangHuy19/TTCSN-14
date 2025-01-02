const experess = require('express')
const router = experess.Router();

const AdminController = require('../app/controllers/AdminController');

// Trang đăng nhập
router.get('/admin', AdminController.indexlogin);

// Xử lý đăng nhập
router.post('/admin', AdminController.adminlog);


router.get('/admin/qlsanpham', AdminController.qlsanpham)
router.post('/admin/qlsanpham/add', AdminController.addProduct); 
router.post('/admin/qlsanpham/delete/:id', AdminController.deleteProduct);
router.post('/admin/qlsanpham/edit', AdminController.updateProduct);



router.get('/admin/qldonhang', AdminController.qldonhang)
router.post('/admin/qldonhang/add', AdminController.addOrder);
router.post('/admin/qldonhang/delete/:id', AdminController.deleteOrder);




module.exports = router;
