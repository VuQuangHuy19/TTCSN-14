const homeRouter = require('./home')
const authRoute = require('./auth');
const lienheRoute = require('./lienhe');
const aboutRoute = require('./about')

function route(app)
{
    app.use('/', homeRouter);
    app.use('/', authRoute);
    app.use('/lienhe', lienheRoute);
    app.use('/about', aboutRoute)
}

module.exports = route;