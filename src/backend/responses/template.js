'use strict';

const commonResponse = require("./common");
const userResponse = require("./user");
const itemResponse = require("./item");

module.exports = {
  welcome: commonResponse.welcome,
  userRegistration: userResponse.userRegistration,
  userRegistrationSuccess: userResponse.userRegistrationSuccess,
  userRegistrationFail: userResponse.userRegistrationFail,
  itemRegistrationSuccess: itemResponse.itemRegistrationSuccess,
  itemRegistrationFail: itemResponse.itemRegistrationFail
};
