'use strict';

// Placeholder
const checkUserAuth = async (userId) => {
  // userId: string
  // Todo: Check user is exist and authenticated
  //       True = (userId is in User table) and (User[userId].school_email_auth is true)
  //       False = Otherwise
  return true;

  const random = Math.floor(Math.random() * 2);
  if (random == 0) {
    return false;
  } else {
    return true;
  }
};

// Placeholder
const registPendingAuthentication = async (userId, school_mail, token) => {
  // userId: string, school_mail: string, token: string
  // Todo: Create pending mail authentication with scheme { userId: string,
  //                                                        school_mail: string,
  //                                                        token: string }
  return {
    success: true, // success: true, fail: false
    message: "Fill error message if success == false" // success: "", fail: error message
  };
};

// Placeholder
const registNewUser = async (userId, nickname, school_name, school_mail, timetable) => {
  // userId: string, nickname: string, school_name: string, school_mail: string, timetable: JSON object
  // Todo: Create new user with scheme { userId: string,
  //                                     nickname: string,
  //                                     school_name: string,
  //                                     school_mail: string,
  //                                     school_mail_auth: bool (false at init),
  //                          caution -> timetable: stringfied JSON (use JSON.stringfy()),
  //                                     openprofile: string (Null at init),
  //                                     report_count: integer (0 at init),
  //                                     reliability_score: integer (0 at init) }
  return {
    success: true, // success: true, fail: false
    message: "Fill error message if success == false" // success: "", fail: error message
  };
};

// Placeholder
const getUser = async (userId) => {
  // userId: string
  // Todo: Get user data of userId { userId: string,
  //       in JSON object            nickname: string,
  //                                 school_name: string,
  //                                 school_mail: string,
  //                                 school_mail_auth: bool,
  //                      caution -> timetable: JSON (use JSON.parse()),
  //                                 openprofile: string,
  //                                 report_count: integer,
  //                                 reliability_score: integer }
  return {
    userId: "",
    nickname: "",
    school_name: "",
    school_mail: "",
    school_mail_auth: true,
    timetable: JSON.parse(""),
    openprofile: "",
    report_count: 0,
    reliability_score: 50
  };
};

// Placeholder
const registNewItem = async (userId, item_name, item_price, item_detail, item_image) => {
  // userId: string, item_name: string, item_price: number, item_detail: string, item_image: JSON array
  // Todo: Create new item with scheme { userId: string,
  //                                     itemId: number (auto increment),
  //                                     item_name: string,
  //                                     item_price: number,
  //                                     item_detail: string,
  //                          caution -> item_image: stringfied JSON (use JSON.stringfy()),
  //                                     item_date: date (auto fill) }
  return {
    success: true, // success: true, fail: false
    message: "Fill error message if success == false" // success: "", fail: error message
  };
};

// Placeholder
const getItem = async (itemId) => {
  // itemId: string
  // Todo: Get item data of itemId { userId: string,
  //            in JSON object       itemId: number,
  //                                 item_name: string,
  //                                 item_price: number,
  //                                 item_detail: string,
  //                      caution -> item_image: JSON (use JSON.parse()),
  //                                 item_date: date }
  return {
    userId: "",
    itemId: 0,
    item_name: "",
    item_price: 0,
    item_detail: "",
    item_image: JSON.parse(""),
    item_date: null // Please convert to some date type
  };
};

module.exports = {
  checkUserAuth,
  registPendingAuthentication,
  registNewUser,
  getUser,
  registNewItem,
  getItem
}
