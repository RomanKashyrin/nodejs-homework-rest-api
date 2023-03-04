const sendgridMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY, DB_HOST } = process.env;
const BASE_URL = `http://localhost:${DB_HOST}/api`;
sendgridMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (email, verifyCode) => {
  const url = `${BASE_URL}/users/verify${verifyCode}`;
  const message = {
    to: email,
    from: "kashirin10031992@gmail.com",
    subject: "Please verify your email address",
    html: `<p>Please verify your email address: </p><a href="${url}" target="_blank">Confirm email</a>`,
  };
  try {
    await sendgridMail.send(message);
  } catch (err) {
    throw err;
  }
};

module.exports = sendEmail;
