const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      validate(value) {
        if (value <= 0) {
          throw new Error('Price must be greater than 0');
        }
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },

  { timestamps: true },
);

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;
