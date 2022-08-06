const { Router } = require('express');
const auth = require('../middleware/auth');

const router = Router();

const {
  registerUser,
  loginUser,
  logoutUser,
  logoutAllSessions,
  getMe,
  updateUser,
  deleteCurrentUser,
  getAllUsers,
  getUser,
  deleteUser,
} = require('../controllers/user');

router.route('/').get(auth, getAllUsers);
router.route('/me').get(auth, getMe).put(auth, updateUser).delete(auth, deleteCurrentUser);
router.route('/:id').get(auth, getUser).delete(auth, deleteUser);
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').post(auth, logoutUser);
router.route('/logoutAll').post(auth, logoutAllSessions);

module.exports = router;
