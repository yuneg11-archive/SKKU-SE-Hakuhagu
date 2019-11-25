'use strict';

// Placeholder
const getUserExistence = (userId) => {
  const random = Math.floor(Math.random() * 5);
  if (random == 0) {
    return false;
  } else {
    return true;
  }
};

module.exports = {
  getUserExistence
}
