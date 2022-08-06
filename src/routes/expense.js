const { Router } = require('express');

const auth = require('../middleware/auth');

const router = Router();

const { registerExpense, getAllExpenses, getUserExpenses } = require('../controllers/expense');

router.route('/').get(auth, getAllExpenses).post(auth, registerExpense);
router.route('/:id').get(auth, getUserExpenses);

module.exports = router;
