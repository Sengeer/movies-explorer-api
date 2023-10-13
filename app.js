const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const limiter = require('./middlewares/limiter');
const { requestLogger } = require('./middlewares/logger');
require('dotenv').config();
const errorer = require('./middlewares/errorer');
const CONFIG = require('./config');

const {
  NODE_ENV,
  PORT,
  MONGO_URL,
} = process.env;
const app = express();

mongoose.connect(
  NODE_ENV !== 'production'
    ? CONFIG.MONGO_URL
    : MONGO_URL,
  { useNewUrlParser: true },
);
app.use(cors({
  origin: CONFIG.CORS_ORIGIN,
  credentials: true,
  maxAge: 30,
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);
app.use(helmet());
app.use(limiter);

app.use('/', require('./routes/index'));

app.use(errorer);

app.listen(
  NODE_ENV !== 'production'
    ? CONFIG.PORT
    : PORT,
);
