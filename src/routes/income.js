const { Router } = require('express');

const auth = require('../middleware/auth');

const router = Router();

const {
  getAllIncomes,
  registerIncome,
  updateIncome,
  deleteIncome,
} = require('../controllers/income');

router.route('/').get(auth, getAllIncomes).post(auth, registerIncome);
router.route('/:id').put(auth, updateIncome).delete(auth, deleteIncome);

module.exports = router;
