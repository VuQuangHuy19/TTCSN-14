

class LienheController {
    // [GET] /
    index(req, res) {
        res.render('lienhe');
    }
}

module.exports = new LienheController();
