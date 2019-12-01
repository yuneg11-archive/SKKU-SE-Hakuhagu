'use strict';

const getBody = (event) => {
  return ("body" in event ? JSON.parse(event.body) : event);
}

const getUserId = (event) => {
  return getBody(event).userRequest.user.id;
};

const getMessage = (event) => {
  return getBody(event).userRequest.utterance;
}

const getParameters = (event) => {
  return getBody(event).action.detailParams;
}

const getBlockId = (event) => {
  return getBody(event).userRequest.block.id;
}

module.exports = {
  getBody,
  getUserId,
  getMessage,
  getParameters,
  getBlockId
}
