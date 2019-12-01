'use strict';

const builder = require("../utils/builder");

const registration = (event) => {
  // Construct registration guide

  // Todo

  const card = builder.getSimpleText("회원가입 테스트");

  // Build response
  return builder.buildResponse([card]);
}

module.exports = {
    registration
};
