

class AboutController {
    // [GET] /
    index(req, res) {
        res.render('about');
    }
}

module.exports = new AboutController();
