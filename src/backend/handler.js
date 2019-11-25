'use strict';

const parser = require("./parser");
const builder = require("./builder");
const database = require("./database");
const authenticator = require("./authenticator");

const predefinedResponse = {
  userAuthenticateFail: {
    statusCode: 200,
    body: JSON.stringify({
      version: "2.0",
      template: { outputs: [ { simpleText: { text: "사용자 인증에 실패했습니다." } } ] }
    })
  }
}

module.exports.test = async (event) => {
  const body = parser.getBody(event);
  const userId = parser.getUserId(event);
  const message = parser.getMessage(event);
  const parameters = parser.getParameters(event);
  const parameterKeys = Object.keys(parameters);

  if (authenticator.authenticateUser(userId) == false) {
    console.log("Fail user authentication");
    return predefinedResponse.userAuthenticateFail;
  }

  console.log(JSON.stringify(body, null, 2));

  const imageUrl = "http://k.kakaocdn.net/dn/xsBdT/btqqIzbK4Hc/F39JI8XNVDMP9jPvoVdxl1/2x1.jpg";
  const listItems = [builder.getListItem(userId, "userId"),
                     builder.getListItem(message, "message")];
  if (parameterKeys.length > 0)
    listItems.push(builder.getListItem(parameters[parameterKeys[0]].origin, parameterKeys[0]));
  if (parameterKeys.length > 1)
    listItems.push(builder.getListItem(parameters[parameterKeys[1]].origin, parameterKeys[1]));
  if (parameterKeys.length > 2)
    listItems.push(builder.getListItem(parameters[parameterKeys[2]].origin, parameterKeys[2]));
  const buttons = [builder.getButton("테스트 메시지", "message", "테스트 입니다.")];
  const listCard = builder.getListCard("요청 메아리", imageUrl, listItems, buttons);
  const response = builder.buildResponse("2.0", [listCard]);

  console.log(response);

  return {
    statusCode: 200,
    body: response
  };
};
