// Підключаю необхідні модулі та створюю екземпляр програми.
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();

// Підключаю парсер JSON і дозволяю кросдоменні запити до програми через проміжне ПЗ cors
// parse application/json
app.use(express.json());
// cors
app.use(cors());

// Підключаю роути для API, а також обробку помилки 404 та помилок сервера 500
const routerApi = require('./api');
app.use('/api', routerApi);

app.use((_, res, __) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: 'Use api on routes: /api/tasks',
    data: 'Not found',
  });
});

app.use((err, _, res, __) => {
  console.log(err.stack);
  res.status(500).json({
    status: 'fail',
    code: 500,
    message: err.message,
    data: 'Internal Server Error',
  });
});

// Підключення до сервера MongoDB за допомогою mongoose.connect.
// Цей метод повертає проміс, і коли він вирішиться йде старт серверу app.listen.
// Якщо ж під час підключення до бази даних сталася помилка, то стартувати сервер немає ніякої причини - в консоль виводиться повідомлення про помилку.
const PORT = process.env.PORT || 3000;
const uriDb = process.env.DB_HOST;

const connection = mongoose.connect(uriDb, {
  promiseLibrary: global.Promise,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

connection
  .then(() => {
    app.listen(PORT, function () {
      console.log(`Server running. Use our API on port: ${PORT}`);
    });
  })
  .catch(err =>
    console.log(`Server not running. Error message: ${err.message}`)
  );
