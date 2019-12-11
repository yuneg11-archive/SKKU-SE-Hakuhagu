'use strict';

const builder = require("../utils/builder");
const resource = require("../utils/resource");

module.exports.itemRegistrationSuccess = (itemName, itemDetail, itemPrice, imageUrl) => {
  // Construct registration guide
  const resultThumbnail = builder.getThumbnail(imageUrl);
  const resultTitle = itemName;
  const resultDescription = itemDetail;
  const resultPrice = itemPrice;
  const resultCard = builder.getCommerceCard(resultTitle, resultDescription, resultPrice, resultThumbnail, null);

  // Build response
  return builder.buildResponse([resultCard]);
};

module.exports.itemRegistrationFail = (errorMessage) => {
  // Construct registration guide
  const resultThumbnail = builder.getThumbnail(resource.itemRegistrationFailThumbnailUrl);
  const resultTitle = "상품 등록 실패";
  const resultDescription = errorMessage;
  const resultCard = builder.getBasicCard(resultTitle, resultDescription, resultThumbnail);

  // Build response
  return builder.buildResponse([resultCard]);
};

module.exports.itemListSuccess = (itemList, mode="search") => {
  const modes = ["list", "search", "contract"];

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
      } else if (mode == "contract") {
        buttons.push(builder.getButton("판매", "block", "판매", resource.sellerContractBlockId, {itemId: resultItemId}));
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
  const resultCard = builder.getBasicCard(resultTitle, resultDescription, resultThumbnail);

  // Build response
  return builder.buildResponse([resultCard]);
};

module.exports.itemDetail = (item, mode="list", user=null) => {
  // Construct registration guide
  const resultThumbnail = builder.getThumbnail(item.item_image[0], true, 500, 500);
  const resultUserId = (user != null ? user.userId : null);
  const resultItemId = item.itemId;
  const resultTitle = item.item_name + "(" + item.item_price + "원)";
  const resultDescription = item.item_detail + "\n"+ item.item_date;
  const resultMainMenuButton = (mode == "list" ? builder.getButton("삭제", "block", "삭제", resource.itemDeleteBlockId) : builder.getButton("구매", "block", "구매", resource.itemBuyBlockId, {userId: resultUserId, itemId: resultItemId}));
  const resultCard1 = builder.getBasicCardBody(resultTitle, resultDescription, "", [resultMainMenuButton, resultMainMenuButton]);
  const resultCard2 = builder.getBasicCardBody("", "", resultThumbnail);

  // Build response
  return builder.buildResponse([builder.getCarousel("basicCard", [resultCard1, resultCard2, resultCard2])]);
};

module.exports.itemSellerContractSuccess = (qrcodePath, itemId) => {
  const resultThumbnail = builder.getThumbnail(qrcodePath, true, 200, 200);
  const resultText = "구매자에게 '구매자 거래 체결' 메뉴를 이용해 QR코드를 스캔하도록 안내해 주세요.";
  const resultOkButton = builder.getButton("스캔완료", "block", "스캔완료", resource.itemSellerContractVerifyBlockId, {itemId: itemId});
  const basicCard = builder.getBasicCard("", resultText, resultThumbnail, [resultOkButton]);
  return builder.buildResponse([basicCard]);
};

module.exports.itemBuyerContractSuccess = (item) => {
  const resultThumbnail = builder.getThumbnail(item.item_image[0]);
  const resultTitle = item.item_name;
  const resultDescription = item.item_detail + "\n" + item.item_date;
  const resultPrice = item.item_price;
  const resultNickname = item.nickname;
  const commerceCard = builder.getCommerceCard(resultTitle, resultDescription, resultPrice, resultThumbnail, resultNickname);
  const simpleTextCard = builder.getSimpleText("상품 구매가 완료되었습니다.");
  return builder.buildResponse([commerceCard, simpleTextCard]);
};
