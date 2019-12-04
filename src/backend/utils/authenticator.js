'use strict';

const database = require("./database");
const credential = require("./credential");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: credential.mailUserId,
    pass: credential.mailUserPassword
  }
});

const authenticateUser = async (userId) => {
  return await database.checkUserAuth(userId);
};

const sendAuthenticateMail = async (userId, userMail) => {
  // Todo: Send authenticate mail to user mail
  //       and regist pending auth to database with scheme { userId: string,
  //                                                         userMail: string}
  const mailOptions = {
    from: credential.mailUserId,
    to: userMail,
    subject: "학우하구 인증 메일",
    text: "테스트 메일입니다." // Todo: Insert verification link
  };

  const result = await transporter.sendMail(mailOptions);
  console.log(result);
  if (Object.keys(result.accepted).length == 1) {
    return true;
  } else {
    return false;
  }
};

module.exports = {
  authenticateUser,
  sendAuthenticateMail
}
