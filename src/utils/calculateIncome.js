const Income = require('../models/income');

const calculateIncome = ({ income, debt, surplus, owner }) => {
  let balance;
  let needs = income * 0.5;
  let wants = income * 0.3;
  let savings = income * 0.2;

  if (debt) balance = income - debt;
  else if (surplus) balance = income + surplus;
  else balance = income;

  const newIncome = new Income({
    income,
    debt,
    surplus,
    needs,
    wants,
    savings,
    balance,
    owner,
  });

  return newIncome;
};

module.exports = { calculateIncome };
