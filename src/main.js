const { engine } = require('express-handlebars');
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const Handlebars = require('handlebars');
const session = require('express-session');
const route = require('./routes');
const db = require('./config/db');

// Kết nối cơ sở dữ liệu
db.connect();

const app = express();
const port = 3333;

// Middleware để xử lý dữ liệu từ form và JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Cấu hình session
app.use(session({
  secret: 'abc123',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

// HTTP logging
app.use(morgan('combined'));

// Định nghĩa helpers toàn cục
Handlebars.registerHelper('ifEquals', function(arg1, arg2, options) {
  return (arg1 === arg2) ? options.fn(this) : options.inverse(this);
});

Handlebars.registerHelper('increment', function(value) {
  return parseInt(value, 10) + 1;
});

Handlebars.registerHelper('formatPrice', function(value) {
  if (typeof value === 'number') {
    return value.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
  }
  return value; // Trả về giá trị ban đầu nếu không phải là số
});

Handlebars.registerHelper('compare', function(value1, value2, options) {
  if (value1 >= value2) {
    return options.fn(this); // Nếu điều kiện đúng, trả về nội dung block
  } else {
    return options.inverse(this); // Nếu điều kiện sai, trả về nội dung block ngược lại
  }
});

// Cấu hình Handlebars làm view engine
app.engine('handlebars', engine({
  runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
  }
}));

app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources', 'views'));

// Định tuyến
route(app);

// Khởi động server
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
