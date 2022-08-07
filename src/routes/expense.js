const { Router } = require('express');

const auth = require('../middleware/auth');

const router = Router();

const {
  registerExpense,
  getAllExpenses,
  getUserExpenses,
  updateExpense,
  deleteExpense,
} = require('../controllers/expense');

router.route('/').get(auth, getAllExpenses).post(auth, registerExpense);
router
  .route('/:id')
  .get(auth, getUserExpenses)
  .put(auth, updateExpense)
  .delete(auth, deleteExpense);

module.exports = router;
