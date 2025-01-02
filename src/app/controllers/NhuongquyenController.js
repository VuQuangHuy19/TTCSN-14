

class NhuongQuyenController {
    // [GET] /
    index(req, res) {
        res.render('nhuongquyen');
    }
}

module.exports = new NhuongQuyenController();
