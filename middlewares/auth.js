const { Unauthorized } = require("http-errors");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const { SECRET_KEY } = process.env;
const { User } = require("../models/usersModel");

const auth = async (res, req, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  try {
    if (bearer !== "Bearer" || !token) {
      return next(new Unauthorized("Not authorized"));
    }
    const { id } = jwt.verify(token, SECRET_KEY);
    const user = await User.findById(id);
    if (!user || !user.token) {
      return next(new Unauthorized("Not authorized"));
    }
    req.user = user;
    next();
  } catch (err) {
    if ((err.message = "Invalid signature")) {
      err.status = 401;
    }
    next(err);
  }
};

module.exports = { auth };
