const Expense = require('../models/expense');

const registerExpense = async (req, res) => {
  const expense = new Expense({ ...req.body, owner: req.user._id });

  try {
    await expense.save();
    res.status(201).send({ data: expense });
  } catch (e) {
    res.status(400).send(e);
  }
};

const getAllExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({});
    res.send({ totalRecord: expenses.count, data: expenses });
  } catch (e) {
    res.status(500).send();
  }
};

const getUserExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({ user: req.params.id });
    res.send({ totalRecord: expenses.count, data: expenses });
  } catch (e) {
    res.status(500).send();
  }
};

module.exports = {
  registerExpense,
  getAllExpenses,
  getUserExpenses,
};
