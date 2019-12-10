'use strict';

const builder = require("../utils/builder");
const resource = require("../utils/resource");

module.exports.itemRegistrationSuccess = (itemName, itemDetail, itemPrice, imageUrl) => {
  // Construct registration guide
  const resultThumbnail = builder.getThumbnail(imageUrl);
  const resultTitle = itemName;
  const resultDescription = itemDetail;
  const resultPrice = itemPrice;
  const resultMainMenuButton = builder.getButton("처음으로", "block", "처음으로", resource.welcomeBlockId);
  const resultCard = builder.getCommerceCard(resultTitle, resultDescription, resultPrice, resultThumbnail, null, [resultMainMenuButton]);

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

module.exports.itemListSuccess = (itemList, mode="search") => {
  const modes = ["list", "search"];

  if (modes.includes(mode)) {
    // Construct commerce cards
    const bodys = [];
    for (var key in itemList) {
      if (key > 9) {
        break;
      }
      const item = itemList[key];
      const resultUserId = (item.userId != undefined ? item.userId : null);
      const resultItemId = item.itemId;
      const resultThumbnail = builder.getThumbnail(item.item_image[0]);
      const resultTitle = item.item_name;
      const resultDescription = item.item_detail + "\n" + item.item_date;
      const resultPrice = item.item_price;
      const resultNickname = (item.nickname != undefined ? item.nickname : null);
      const buttons = [];
      if (mode == "list") {
        buttons.push(builder.getButton("상세정보", "block", "상세정보", resource.itemDetailBlockId, {itemId: resultItemId, mode: "list"}));
        buttons.push(builder.getButton("삭제", "block", "삭제", resource.itemDeleteBlockId, {itemId: resultItemId}));
      } else if (mode == "search") {
        buttons.push(builder.getButton("구매", "block", "구매", resource.itemBuyBlockId, {userId: resultUserId, itemId: resultItemId}));
        buttons.push(builder.getButton("상세정보", "block", "상세정보", resource.itemDetailBlockId, {userId: resultUserId, itemId: resultItemId, mode: "search"}));
        // buttons.push(builder.getButton("신고", "block", "신고", resource.itemReportBlockId, {userId: resultUserId, itemId: resultItemId}));
      } else if (mode == "transaction") {
        buttons.push(builder.getButton("판매", "block", "판매", resource.itemSellBlockId, {itemId: resultItemId}));
      }
      bodys.push(builder.getCommerceCardBody(resultTitle, resultDescription, resultPrice, resultThumbnail, resultNickname, buttons));
    }

    // Build response
    return builder.buildResponse([builder.getCarousel("commerceCard", bodys)]);
  } else {
    throw "mode type error";
  }
};

module.exports.itemListFail = (errorMessage) => {
  // Construct result card
  const resultThumbnail = builder.getThumbnail(resource.itemRegistrationFailThumbnailUrl);
  const resultTitle = "상품 조회 실패";
  const resultDescription = errorMessage;
  const resultMainMenuButton = builder.getButton("처음으로", "block", "처음으로", resource.welcomeBlockId);
  const resultCard = builder.getBasicCard(resultTitle, resultDescription, resultThumbnail, [resultMainMenuButton]);

  // Build response
  return builder.buildResponse([resultCard]);
};

module.exports.itemDetail = (item, mode="list", user=null) => {
  // Construct registration guide
  const resultThumbnail = builder.getThumbnail(item.item_image[0]);
  const resultUserId = (user.userId != undefined ? user.userId : null);
  const resultItemId = item.itemId;
  const resultTitle = item.item_name + "(" + item.item_price + "원)";
  const resultDescription = item.item_detail + "\n";// + item.item_date;
  const resultMainMenuButton = (mode == "list" ? builder.getButton("삭제", "block", "삭제", resource.itemDeleteBlockId) : builder.getButton("구매", "block", "구매", resource.itemBuyBlockId, {userId: resultUserId, itemId: resultItemId}));
  const resultCard1 = builder.getBasicCardBody(resultTitle, resultDescription, "", [resultMainMenuButton, resultMainMenuButton]);
  const resultCard2 = builder.getBasicCardBody("", "uiiyfiyiyfi", resultThumbnail);

  // Build response
  return builder.buildResponse([builder.getCarousel("basicCard", [resultCard1, resultCard2, resultCard2])]);
};
