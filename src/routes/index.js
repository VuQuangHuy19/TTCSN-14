const homeRouter = require('./home')
const authRoute = require('./auth');
const lienheRoute = require('./lienhe');
const aboutRoute = require('./about')
const sanphamRoute = require('./sanpham')
const nhuongquyenRoute = require('./nhuongquyen')
const cartRoute = require('./cart')
const adminRoute = require('./admin')
const proRoute = require('./pro')
const checkoutRoute = require('./checkout')



function route(app)
{
    app.use('/', homeRouter);
    app.use('/', authRoute);
    app.use('/', adminRoute);
    app.use('/lienhe', lienheRoute)
    app.use('/nhuongquyen', nhuongquyenRoute)
    app.use('/about', aboutRoute)
    app.use('/sanpham', sanphamRoute)
    app.use('/cart', cartRoute)
    app.use('/pro', proRoute)
    app.use('/checkout', checkoutRoute)


}

module.exports = route;