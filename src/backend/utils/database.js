'use strict';

// Placeholder
const checkUserAuth = async (userId) => {
  // userId: string
  // Todo: Check user is exist and authenticated
  //       True = (userId is in User table) and (User[userId].school_email_auth is true)
  //       False = Otherwise

  return false;

  const random = Math.floor(Math.random() * 3);
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

module.exports = {
  checkUserAuth,
  registPendingAuthentication,
  registNewUser,
  getUser
}
