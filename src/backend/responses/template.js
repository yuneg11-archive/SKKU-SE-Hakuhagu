'use strict';

const commonResponse = require("./common");
const userResponse = require("./user");

module.exports = {
  welcome: commonResponse.welcome,
  userRegistration: userResponse.userRegistration,
  userRegistrationSuccess: userResponse.userRegistrationSuccess,
  userRegistrationFail: userResponse.userRegistrationFail,
};
