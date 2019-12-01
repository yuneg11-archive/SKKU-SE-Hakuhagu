'use strict';

const builder = require("../utils/builder");

module.exports.welcome = () => {
  // Construct buyer card
  const buyerThumbnail = builder.getThumbnail("http://k.kakaocdn.net/dn/xsBdT/btqqIzbK4Hc/F39JI8XNVDMP9jPvoVdxl1/2x1.jpg"); // Temp url
  const buyerSearchTextButton = builder.getButton("상품 검색 (텍스트)", "block", "상품 텍스트 검색", "5dc5209affa74800014100c7"); // Temp action
  const buyerSearchImageButton = builder.getButton("상품 검색 (이미지)", "block", "상품 이미지 검색", "5dc5209affa74800014100c7"); // Temp action
  const buyerContractButton = builder.getButton("구매자 거래 체결", "message", "구매자 거래 체결"); // Temp action
  const buyerCardBody = builder.getBasicCardBody("구매", "상품을 구매합니다.", buyerThumbnail, [buyerSearchTextButton, buyerSearchImageButton, buyerContractButton]);

  // Construct seller card
  const sellerThumbnail = builder.getThumbnail("http://k.kakaocdn.net/dn/xsBdT/btqqIzbK4Hc/F39JI8XNVDMP9jPvoVdxl1/2x1.jpg"); // Temp url
  const sellerItemRegisterButton = builder.getButton("상품 등록", "block", "상품 등록", "5dc5209affa74800014100c7"); // Temp action
  const sellerItemListButton = builder.getButton("상품 목록", "block", "상품 목록", "5dc5209affa74800014100c7"); // Temp action
  const sellerContractButton = builder.getButton("판매자 거래 체결", "message", "판매자 거래 체결"); // Temp action
  const sellerCardBody = builder.getBasicCardBody("판매", "상품을 판매합니다.", sellerThumbnail, [sellerItemRegisterButton, sellerItemListButton, sellerContractButton]);

  // Construct user information card
  const userInfoThumbnail = builder.getThumbnail("http://k.kakaocdn.net/dn/xsBdT/btqqIzbK4Hc/F39JI8XNVDMP9jPvoVdxl1/2x1.jpg"); // Temp url
  const userInfoInquireButton = builder.getButton("회원 정보 조회", "message", "회원 정보 조회"); // Temp action
  const userInfoOpenProfileButton = builder.getButton("오픈프로필 링크 수정", "message", "오픈프로필 링크 수정"); // Temp action
  const userInfoTimeTableButton = builder.getButton("시간표 수정", "message", "시간표 수정"); // Temp action
  const userInfoCardBody = builder.getBasicCardBody("회원 정보", "회원 정보를 조회하거나 수정합니다.", userInfoThumbnail, [userInfoInquireButton, userInfoOpenProfileButton, userInfoTimeTableButton]);

  // Build response
  return builder.buildResponse([builder.getCarousel("basicCard", [buyerCardBody, sellerCardBody, userInfoCardBody])]);
};

module.exports.registration = () => {
  // Construct registration guide
  const guideThumbnail = builder.getThumbnail("http://k.kakaocdn.net/dn/xsBdT/btqqIzbK4Hc/F39JI8XNVDMP9jPvoVdxl1/2x1.jpg"); // Temp url
  const guideText = "대학생 중고 거래 서비스, 학우하구입니다!\n회원 가입을 원하시면 회원 가입 버튼을 눌러주세요.";
  const guideRegistrationButton = builder.getButton("회원 가입", "block", "회원 가입", "5dc50c568192ac0001c5d1f0"); // Temp action
  const guideCard = builder.getBasicCard("", guideText, guideThumbnail, [guideRegistrationButton]);

  // Build response
  return builder.buildResponse([guideCard]);
};

module.exports.registrationFail = (errorMessage) => {
  // Construct registration guide
  const guideThumbnail = builder.getThumbnail("http://k.kakaocdn.net/dn/xsBdT/btqqIzbK4Hc/F39JI8XNVDMP9jPvoVdxl1/2x1.jpg"); // Temp url
  const guideTitle= "회원 가입 실패";
  const guideDescription = errorMessage;
  const guideMainMenuButton = builder.getButton("처음으로", "block", "처음으로", "5dc91057ffa748000141163a");
  const guideCard = builder.getBasicCard(guideTitle, guideDescription, guideThumbnail, [guideMainMenuButton]);

  // Build response
  return builder.buildResponse([guideCard]);
};
