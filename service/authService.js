const { Unauthorized } = require("http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const { SECRET_KEY } = process.env;
const { User } = require("../models/usersModel");

const registration = async (body) => {
  const user = await User.findOne({ email: body.email });
  if (user) {
    throw new Unauthorized("Email in use");
  }
  return User.create({ ...body });
};

const login = async (body) => {
  const { email, password } = body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Unauthorized(`No user with ${email} found`);
  }

  const inValidPassword = bcrypt.compare(password, user.password);
  if (!inValidPassword) {
    throw new Unauthorized("Password is wrong");
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sing(payload, SECRET_KEY, { expiresIn: "10d" });

  const userWithToken = await User.findByIdAndUpdate(user._id, { token });
  return { token, userWithToken };
};

const logout = async (id) => {
  return User.findByIdAndUpdate({ id: _id }, { token: null });
};

const updateUser = async (id, body) => {
  return User.findByIdAndUpdate({ _id: id }, body);
};

module.exports = {
  registration,
  login,
  logout,
  updateUser,
};
