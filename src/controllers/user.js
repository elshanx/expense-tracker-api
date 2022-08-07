const User = require('../models/user');
const ApiFeatures = require('../utils/api-features');

const getAllUsers = async (req, res) => {
  try {
    const features = new ApiFeatures(User.find(), req.query).paginate();
    const users = await features.query;

    res.send({ data: users, results: users.length });
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
};

const registerUser = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ data: { user, token } });
  } catch (e) {
    res.status(400).send(e);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ data: { user, token } });
  } catch (e) {
    res.status(400).send();
  }
};

const logoutUser = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter(token => token.token !== req.token);
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

const logoutAllSessions = async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send();
  }
};

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate(['incomes', 'expenses']);
    res.send({ data: user });
  } catch (e) {
    res.status(500).send();
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).send({ error: 'User not found!' });
    }

    res.send({ data: user });
  } catch (e) {
    res.status(500);
  }
};

const updateUser = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
    return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
    updates.forEach(update => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send({ data: req.user });
  } catch (e) {
    res.status(400).send(e);
  }
};

const deleteCurrentUser = async (req, res) => {
  try {
    await req.user.remove();
    res.send({ data: req.user });
  } catch (e) {
    res.status(500).send();
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndRemove(req.params.id);
    res.send();
  } catch (e) {
    res.status(500);
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  logoutAllSessions,
  getMe,
  getAllUsers,
  getUser,
  updateUser,
  deleteCurrentUser,
  deleteUser,
};
