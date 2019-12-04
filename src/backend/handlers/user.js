'use strict';

const parser = require("../utils/parser");
const database = require("../utils/database");
const authenticator = require("../utils/authenticator");
const responseTemplate = require("../responses/template");

const registration = (event) => {
  const userId = parser.getUserId(event);
  const parameters = parser.getParameters(event);
  const nickname = parameters["nickname"].value;
  const school_name = parameters["school_name"].value;
  const school_mail = parameters["school_mail"].value;
  const timetable_image = parameters["timetable_image"].origin;
  const timetable = ""; // Todo: Process timetable_image and get JSON data

  if (authenticator.authenticateUser(userId) == true) {
    return responseTemplate.userRegistrationFail("이미 등록된 사용자입니다.");
  } else {
    const result = database.registerNewUser(userId, nickname, school_name, school_email, timetable);
    if (result.success == true) {
      // Todo: Send authentication mail
      return responseTemplate.userRegistrationSuccess(nickname);
    } else {
      return responseTemplate.userRegistrationFail(result.message);
    }
  }
}

module.exports = {
    registration
};
