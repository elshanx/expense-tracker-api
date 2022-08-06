const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema(
  {
    income: {
      type: Number,
      required: true,
      validate(value) {
        if (value <= 0) {
          throw new Error('Income must be greater than 0');
        }
      },
    },
    needs: {
      type: Number,
    },
    wants: {
      type: Number,
    },
    savings: {
      type: Number,
    },
    debt: {
      type: Number,
      validate(value) {
        if (value < 0) {
          throw new Error('Debt must be greater than 0');
        }
      },
    },
    surplus: {
      type: Number,
      validate(value) {
        if (value < 0) {
          throw new Error('Surplus must be greater than 0');
        }
      },
    },
    balance: {
      type: Number,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

const Income = mongoose.model('Income', incomeSchema);

module.exports = Income;
