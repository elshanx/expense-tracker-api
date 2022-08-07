const Income = require('../models/income');

const { calculateIncome } = require('../utils/calculateIncome');

const getAllIncomes = async (req, res) => {
  try {
    let from;
    let to;

    if (req.query.from) {
      from = new Date(req.query.from);
      from.setHours(0, 0, 0, 0);
      to = new Date();
      to.setHours(23, 59, 59, 999);
    }

    if (req.query.to) {
      to = new Date(req.query.to);
      to.setHours(23, 59, 59, 999);
    }

    if (from || to) {
      const incomes = await Income.find({
        createdAt: {
          $gte: from,
          $lte: to,
        },
      });

      res.send({ results: incomes.length, data: incomes });
    }

    const incomes = await Income.find({});

    res.send({ results: incomes.length, data: incomes });
  } catch (e) {
    res.status(500).send();
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
