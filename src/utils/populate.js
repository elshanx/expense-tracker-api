require('dotenv').config();

const Expense = require('../models/expense');
const DATA = [{}];

!(async () => {
  try {
    await require('../db/connect');
    await Expense.deleteMany();
    console.log('Successfully deleted all documents!');
    await Expense.create(DATA);
    console.log('Successfully added data and exiting current process!');
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
})();
