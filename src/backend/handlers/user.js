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
    const mail_success = authenticator.sendAuthenticateMail(userId, school_mail);
    if (mail_success == true) {
      const result = database.registNewUser(userId, nickname, school_name, school_mail, timetable);
      if (result.success == true) {
        return responseTemplate.userRegistrationSuccess(nickname);
      } else {
        return responseTemplate.userRegistrationFail(result.message);
      }
    } else {
      return responseTemplate.userRegistrationFail("인증 메일 발송에 실패하였습니다.");
    }
  }
}

module.exports = {
    registration
};
