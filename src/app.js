require('dotenv').config();
const express = require('express');
require('./db/mongoose');
const morgan = require('morgan');
const cors = require('cors');
const rateLimiter = require('express-rate-limit');

const userRouter = require('./routes/user');
const incomeRouter = require('./routes/income');
const expenseRouter = require('./routes/expense');

const app = express();

app.use(express.json());

const environment = process.env.NODE_ENV || 'development';

if (environment === 'development') {
  app.use(morgan('dev'));
}

app.use(cors());
app.use(rateLimiter({ windowMs: 60 * 1000, max: 150 }));

app.use('/api/users', userRouter);
app.use('/api/income', incomeRouter);
app.use('/api/expenses', expenseRouter);

app.all('*', (_, res) => {
  res.status(404).send('<h1>resource not found</h1>');
});

module.exports = app;
