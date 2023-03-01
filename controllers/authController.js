const service = require("../service/authService");
const files = require("../service/filesService");

const registration = async (req, res) => {
  const user = await service.registration(req.body);
  res.status(201).json({
    user: {
      username: user.username,
      email: user.email,
      subscription: user.subscription,
      avatarURL: user.avatarURL,
    },
  });
};

const login = async (req, res) => {
  const { token, userWithToken } = await service.login(req.body);
  const { username, email, subscription } = userWithToken;

  res.status(200).json({
    token: token,
    user: {
      username,
      email,
      subscription,
    },
  });
};

const logout = async (req, res) => {
  await service.logout(req.user._id);
  res.status(204).json();
};

const getUser = async (req, res) => {
  const { username, email, subscription, avatarURL } = req.user;
  res.json({
    user: { username, email, subscription, avatarURL },
  });
};

const updateUser = async (req, res) => {
  const user = await service.updateUser(req.user._id, req.body);
  const { username, email, subscription } = user;
  res.json({
    user: { username, email, subscription },
  });
};

const updateAvatar = async (req, res) => {
  const avatarURL = await files.updateFiles("avatars", req.file);
  await service.updateUser(req.user._id, { avatarURL });
  res.json({
    avatarURL,
  });
}

module.exports = {
  registration,
  login,
  logout,
  getUser,
  updateUser,
  updateAvatar,
};
