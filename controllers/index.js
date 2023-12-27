require("dotenv").config();
const axios = require("axios");
const { createConfig } = require("../utils/index");
const nodemailer = require("nodemailer");
const CONSTANTS = require("../constants/index");
const { google } = require("googleapis");

const oAuth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oAuth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const sendMail = async (req, res) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    let token = accessToken.token;

    const transport = nodemailer.createTransport({
      service: "gmail",
      auth: {
        ...CONSTANTS.auth,
        accessToken: token,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    const mailOptions = {
      ...CONSTANTS.mailOptions,
      text: "This is a test mail using Gmail API",
    };

    const result = await transport.sendMail(mailOptions);
    res.json(result);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const getUser = async (req, res) => {
  try {
    const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/profile`;
    console.log(url);
    const { token } = await oAuth2Client.getAccessToken();
    const config = createConfig(url, token);
    const response = await axios.get(config);
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const getMails = async (req, res) => {
  try {
    const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/threads?maxResults=100`;
    const { token } = await oAuth2Client.getAccessToken();
    const config = createConfig(url, token);
    const response = await axios(config);
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const getDrafts = async (req, res) => {
  try {
    const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/drafts`;
    const { token } = await oAuth2Client.getAccessToken();
    const config = createConfig(url, token);
    const response = await axios(config);
    res.json(response.data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const readMail = async (req, res) => {
  try {
    const url = `https://gmail.googleapis.com/gmail/v1/users/${req.params.email}/messages/${req.params.messageId}`;
    const { token } = await oAuth2Client.getAccessToken();
    const config = createConfig(url, token);
    const response = await axios(config);

    let data = await response.data;
    res.json(data);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

module.exports = {
  getUser,
  getMails,
  getDrafts,
  readMail,
  sendMail,
};
