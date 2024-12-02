const Products = require('../models/Products');
const { mutipleMongooseToObject } = require('../../until/mongoose')

class HomeController {
    index(req, res, next) {
        Products.find({})
            .then(Products => {
                res.render('home', 
                    {
                        Products: mutipleMongooseToObject(Products)
                    });
            })
            .catch(next);
    }
}

module.exports = new HomeController();