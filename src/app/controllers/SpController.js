const Tour = require('../models/Products');
const { mutipleMongooseToObject } = require('../../until/mongoose')


class SpController {
    index(req, res, next) {
        Tour.find({}, function(err, tours)
        {
            if(!err) res.json(tours);
            res.status(400).json({error: 'Error'})
        });
    }

    best(req, res)
    {
        res.render('sanpham/best')
    }

    dua(req, res)
    {
        res.render('sanpham/dua')
    }
    
    hoaqua(req, res)
    {
        res.render('sanpham/hoaqua')
    }
    
    kemtra(req, res)
    {
        res.render('sanpham/kemtra')
    }
    
    trasua(req, res)
    {
        res.render('sanpham/trasua')
    }
}

module.exports = new SpController();