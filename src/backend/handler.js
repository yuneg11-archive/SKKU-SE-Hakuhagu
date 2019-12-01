'use strict';

const parser = require("./utils/parser");
const builder = require("./utils/builder");
const database = require("./utils/database");
const authenticator = require("./utils/authenticator");
const responseTemplate = require("./responses/template");
const userHandler = require("./handlers/user");

const checkAuth = (event) => {
  const userId = parser.getUserId(event);
  return authenticator.authenticateUser(userId);
}

const selectResponseWithAuth = (event, response) => {
  const userId = parser.getUserId(event);
  if (authenticator.authenticateUser(userId)) {
    return response;
  } else {
    return responseTemplate.registration();
  }
}

const getAuthFailResponse = () => {
  return responseTemplate.userRegistration();
}

// Verification

module.exports.verifyNickName = async (event) => {
  // Todo
}

module.exports.verifyEmail = async (event) => {
  // Todo
}

// Skill

module.exports.welcome = async (event) => {
  if (checkAuth(event) == false) {
    console.log("Auth fail");
    return getAuthFailResponse();
  } else {
    const response = responseTemplate.welcome();
    console.log(response);
    return response;
  }
};

module.exports.userRegistration = async (event) => {
  if (checkAuth(event) == true) { // Avoid regist again
    console.log("Registration fail");
    return responseTemplate.userRegistrationFail("이미 가입되어 있습니다.");
  } else {
    const response = userHandler.registration(event);
    console.log(response);
    return response;
  }
};

module.exports.test = async (event) => {
  const body = parser.getBody(event);
  const userId = parser.getUserId(event);
  const blockId = parser.getBlockId(event);
  const message = parser.getMessage(event);
  const parameters = parser.getParameters(event);
  const parameterKeys = Object.keys(parameters);

  if (checkAuth(event) == false) {
    console.log("Fail user authentication");
    return getAuthFailResponse();
  }

  console.log(JSON.stringify(body, null, 2));

  const imageUrl = "http://k.kakaocdn.net/dn/xsBdT/btqqIzbK4Hc/F39JI8XNVDMP9jPvoVdxl1/2x1.jpg";
  const listItems = [builder.getListItem(userId, "userId"),
                     builder.getListItem(blockId, "blockId"),
                     builder.getListItem(message, "message")];
  if (parameterKeys.length > 0)
    listItems.push(builder.getListItem(parameters[parameterKeys[0]].origin, parameterKeys[0]));
  if (parameterKeys.length > 1)
    listItems.push(builder.getListItem(parameters[parameterKeys[1]].origin, parameterKeys[1]));
  const buttons = [builder.getButton("테스트 메시지", "message", "테스트 입니다.")];
  const listCard = builder.getListCard("요청 메아리", imageUrl, listItems, buttons);
  const response = builder.buildResponse([listCard]);

  console.log(response);

  return response;
};
