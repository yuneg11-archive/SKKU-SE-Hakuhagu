'use strict';

const database = require("./database");

const authenticateUser = (userId) => {
  return database.getUserExistence(userId);
}

module.exports = {
  authenticateUser
}
