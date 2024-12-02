const { engine } = require('express-handlebars');
const path = require('path')
const express = require('express')
const morgan = require('morgan')
const app = express()

const session = require('express-session');

const route = require('./routes')
const db = require('./config/db');
//connect db  
db.connect()

  
app.use(express.urlencoded({ extended: true }));
app.use(express.json());  // nếu gửi JSON data


const port = 3000


app.use(express.static(path.join(__dirname, 'public')));

// session
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));


//http
app.use(morgan('combined'))

//Handlebars
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources', 'views'));

route(app);


app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
