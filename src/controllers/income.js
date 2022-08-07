const Income = require('../models/income');
const { paginate, filterByDate } = require('../utils/api-features');

const { calculateIncome } = require('../utils/calculateIncome');

const getAllIncomes = async (req, res) => {
  let incomes;

  const { limit, skip, page } = paginate(req.query);
  const { from, to } = filterByDate(req.query);

  try {
    if (from || to) {
      incomes = await Income.find({
        createdAt: {
          $gte: from,
          $lte: to,
        },
      })
        .skip(skip)
        .limit(limit);
    } else {
      incomes = await Income.find({}).skip(skip).limit(limit);
    }

    res.send({ results: incomes.length, data: incomes });
  } catch (e) {
    res.status(500).send({ e: e.message });
  }
};

const registerIncome = async (req, res) => {
  try {
    const newIncome = calculateIncome({ ...req.body, owner: req.user._id });
    await newIncome.save();

    res.status(201).send({ data: newIncome });
  } catch (error) {
    res.status(400).send({ error });
  }
};

const updateIncome = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['income', 'debt', 'surplus'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    const income = await Income.findById(req.params.id);
    res.send({ data: income });
  } catch (e) {
    res.status(500).send();
  }
};

const deleteIncome = async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

module.exports = { getAllIncomes, registerIncome, updateIncome, deleteIncome };
