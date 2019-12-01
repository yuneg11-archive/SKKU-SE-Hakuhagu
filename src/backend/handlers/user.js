'use strict';

const responseTemplate = require("../responses/template");

const registration = (event) => {
  // Construct registration guide

  // Todo

  return responseTemplate.userRegistrationSuccess("임시닉네임");
}

module.exports = {
    registration
};
