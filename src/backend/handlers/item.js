'use strict';

const parser = require("../utils/parser");
const database = require("../utils/database");
const authenticator = require("../utils/authenticator");
const responseTemplate = require("../responses/template");

const registration = async (event) => {
  const userId = parser.getUserId(event);
  const parameters = parser.getParameters(event);
  const item_name = parameters["item_name"].origin;
  const item_price_raw = parameters["item_price"].value;
  const item_detail = parameters["item_detail"].origin;
  const item_image = parameters["item_image"].origin;

  // Todo: Regist item to database

  return responseTemplate.itemRegistrationSuccess(item_name);
}

module.exports = {
    registration
};
