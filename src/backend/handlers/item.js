'use strict';

const parser = require("../utils/parser");
const database = require("../utils/database");
const responseTemplate = require("../responses/template");

const registration = async (event) => {
  const userId = parser.getUserId(event);
  const parameters = parser.getParameters(event);
  const item_category = parameters["item_category"].value;
  const item_name = parameters["item_name"].origin;
  const item_price = parser.getPrice(parameters["item_price"].value);
  const item_detail = parameters["item_detail"].origin;
  const item_image = parser.getImageUrls(parameters["item_image"].origin);

  const result = await database.registNewItem(userId, item_category, item_name, item_price, item_detail, item_image);
  if (result.success == true) {
    return responseTemplate.itemRegistrationSuccess(item_name, item_detail, item_price, item_image[0]);
  } else {
    return responseTemplate.itemRegistrationFail("");
  }
}

module.exports = {
    registration
};
