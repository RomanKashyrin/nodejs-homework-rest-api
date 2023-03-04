const service = require("../service/authService");
const files = require("../service/filesService");
const sendEmail = require("../helpers/sendEmail");

const registration = async (req, res) => {
  const user = await service.registration(req.body);
  const { username, email, subscription, avatarURL, verificationToken } = user;
  await sendEmail(email, verificationToken);
  res.status(201).json({
    user: {
      username: username,
      email: email,
      subscription: subscription,
      avatarURL: avatarURL,
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

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  await service.verifyEmail(verificationToken);
  res.json({
    message: "Verification successful",
  });
};

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const { verificationToken } = req.params;
  await service.resendVerifyEmail(email);
  await sendEmail(email, verificationToken);
  res.json({
    message: "Verification email sent",
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
};

module.exports = {
  registration,
  login,
  logout,
  getUser,
  verifyEmail,
  resendVerifyEmail,
  updateUser,
  updateAvatar,
};
