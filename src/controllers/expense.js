const Expense = require('../models/expense');
const { paginate } = require('../utils/api-features');

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
    const { limit, skip } = paginate(req.query);

    const expenses = await Expense.find({}).skip(skip).limit(limit);
    res.send({ results: expenses.count, data: expenses });
  } catch (e) {
    res.status(500).send();
  }
};

const getUserExpenses = async (req, res) => {
  try {
    const { limit, skip } = paginate(req.query);
    const expenses = await Expense.find({ user: req.params.id }).skip(skip).limit(limit);
    res.send({ results: expenses.count, data: expenses });
  } catch (e) {
    res.status(500).send();
  }
};

const updateExpense = async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    res.send({ data: expense });
  } catch (e) {
    res.status(500).send();
  }
};

const deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (e) {
    res.status(500).send();
  }
};

module.exports = {
  registerExpense,
  getAllExpenses,
  getUserExpenses,
  updateExpense,
  deleteExpense,
};
