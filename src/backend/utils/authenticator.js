'use strict';

const database = require("./database");

const authenticateUser = (userId) => {
  return database.checkUserAuth(userId);
};

const sendAuthenticateMail = (userId, userMail) => {
  // Todo: Send authenticate mail to user mail
  //       and regist pending auth to database with scheme { userId: string,
  //                                                         userMail: string}
  return true; // True: No error occurs, False: Error occurs
};

module.exports = {
  authenticateUser,
  sendAuthenticateMail
}
