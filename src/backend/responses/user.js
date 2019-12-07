'use strict';

const builder = require("../utils/builder");
const resource = require("../utils/resource");

module.exports.userRegistration = () => {
  // Construct registration guide
  const guideThumbnail = builder.getThumbnail(resource.userRegistrationThumbnailUrl);
  const guideText = "대학생 중고 거래 서비스, 학우하구입니다!\n회원 가입을 원하시면 회원 가입 버튼을 눌러주세요.\n이미 회원 가입 신청을 하신 경우, 메일 인증을 완료하신 후 메일 인증 완료 버튼을 눌러주세요.";
  const guideRegistrationButton = builder.getButton("회원 가입", "block", "회원 가입", resource.registrationBlockId);
  const guideMainMenuButton = builder.getButton("메일 인증 완료", "block", "처음으로", resource.welcomeBlockId);
  const guideCard = builder.getBasicCard("", guideText, guideThumbnail, [guideRegistrationButton, guideMainMenuButton]);

  // Build response
  return builder.buildResponse([guideCard]);
};

module.exports.userRegistrationSuccess = (userName) => {
  // Construct registration guide
  const guideThumbnail = builder.getThumbnail(resource.userRegistrationSuccessThumbnailUrl);
  const guideTitle= "회원 가입 성공";
  const guideDescription = "안녕하세요, " + userName + "님!\n학교 인증이 완료된 후 서비스를 이용하실 수 있습니다.\n메일 인증을 완료하신 후에 완료 버튼을 눌러주세요.";
  const guideMainMenuButton = builder.getButton("메일 인증 완료", "block", "처음으로", resource.welcomeBlockId);
  const guideCard = builder.getBasicCard(guideTitle, guideDescription, guideThumbnail, [guideMainMenuButton]);

  // Build response
  return builder.buildResponse([guideCard]);
};


module.exports.userRegistrationFail = (errorMessage) => {
  // Construct registration guide
  const guideThumbnail = builder.getThumbnail(resource.userRegistrationFailThumbnailUrl);
  const guideTitle= "회원 가입 실패";
  const guideDescription = errorMessage;
  const guideMainMenuButton = builder.getButton("처음으로", "block", "처음으로", resource.welcomeBlockId);
  const guideCard = builder.getBasicCard(guideTitle, guideDescription, guideThumbnail, [guideMainMenuButton]);

  // Build response
  return builder.buildResponse([guideCard]);
};

module.exports.userAuthenticationSuccess = () => {
  return builder.buildAWSResponse("메일 인증에 성공하였습니다.");
};

module.exports.userAuthenticationFail = () => {
  return builder.buildAWSResponse("메일 인증에 실패하였습니다.");
};
