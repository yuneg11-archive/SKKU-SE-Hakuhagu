'use strict';

const builder = require("../utils/builder");
const resource = require("../utils/resource");

module.exports.itemRegistrationSuccess = (itemName, itemDetail, itemPrice, imageUrl, nickname) => {
  // Construct registration guide
  const resultThumbnail = builder.getThumbnail(imageUrl);
  const resultTitle = itemName;
  const resultDescription = itemDetail;
  const resultPrice = itemPrice;
  const resultNickname = nickname;
  const resultMainMenuButton = builder.getButton("처음으로", "block", "처음으로", resource.welcomeBlockId);
  const resultCard = builder.getCommerceCard(resultTitle, resultDescription, resultPrice, resultThumbnail, result, [resultMainMenuButton]);

  // Build response
  return builder.buildResponse([resultCard]);
};


module.exports.itemRegistrationFail = (errorMessage) => {
  // Construct registration guide
  const resultThumbnail = builder.getThumbnail(resource.itemRegistrationFailThumbnailUrl);
  const resultTitle = "상품 등록 실패";
  const resultDescription = errorMessage;
  const resultMainMenuButton = builder.getButton("처음으로", "block", "처음으로", resource.welcomeBlockId);
  const resultCard = builder.getBasicCard(resultTitle, resultDescription, resultThumbnail, [resultMainMenuButton]);

  // Build response
  return builder.buildResponse([resultCard]);
};
