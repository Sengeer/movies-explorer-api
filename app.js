const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { requestLogger } = require('./middlewares/logger');
require('dotenv').config();
const errorer = require('./middlewares/errorer');
const helmet = require('helmet');

const {
  PORT = 3000,
  URL = 'mongodb://127.0.0.1:27017/bitfilmsdb',
} = process.env;
const app = express();

mongoose.connect(URL, {
  useNewUrlParser: true,
});
app.use(cors({
  origin: [
    'http://localhost:3000',
  ],
  credentials: true,
  maxAge: 30,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);
app.use(helmet());

app.use('/', require('./routes/index'));

app.use(errorer);

app.listen(PORT);
