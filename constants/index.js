require("dotenv");

const auth = {
  type: "OAuth2",
  user: "ravibmofficial@gmail.com",
  clientId: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  refreshToken: process.env.REFRESH_TOKEN,
};

const mailOptions = {
  to: "sudheer.gsk77@gmail.com",
  from: "ravibmofficial@gmail.com",
  subject: "Gmail API using Node JS",
};

module.exports = {
  auth,
  mailOptions,
};
