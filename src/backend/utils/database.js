'use strict';

const credential = require("./credential");
const resource = require("./resource");

const fs = require("fs");
const request = require("sync-request");

const aws = require("aws-sdk");
const s3 = new aws.S3({
  accessKeyId: credential.awsAccessKeyId,
  secretAccessKey: credential.awsSecretAccessKey,
  region: resource.awsS3Region
});

const mysql = require("mysql");
const pool = mysql.createPool({
  host: resource.mysqlLocation,
  user: credential.mysqlUser,
  password: credential.mysqlPassword,
  database: resource.mysqlName,
});
const query = async (sql, params) => {
    return await new Promise((resolve, reject) => {
        pool.query(sql, params, (error, results, fields) => {
            if (error) reject(error);
            else resolve(results);
            return;
        });
    });
};


const uploadImages = async (directory, locations) => {
  const results = [];
  for (var key in locations) {
    var location = locations[key];
    const filename = location.substring(location.lastIndexOf('/') + 1, location.length) || location;
    if (location.includes("http")) {
      fs.writeFileSync("/tmp/" + filename, request("GET", location).getBody());
      location = "/tmp/" + filename;
    }

    const image = {
      Bucket: resource.awsS3Name,
      Key: directory + key + "-" + filename,
      ACL: "public-read",
      Body: fs.createReadStream(location)
    };

    const result = await new Promise((resolve, reject) => {
      s3.upload(image, (err, data) => {
        if (err) {
          resolve({
            success: false,
            location: "예상치 못한 오류가 발생했습니다."
          });
        } else {
          resolve({
            success: true,
            location: data.Location
          });
        }
      });
    });

    results.push(result);
  }
  return results;



  // const r1 = await new Promise((resolve, reject) => {
  //   s3.listBuckets(function(err, data) {
  //     if (err) {
  //       console.log("Error in", err);
  //       reject(err)
  //     } else {
  //       console.log("Success", data.Buckets);
  //       resolve(data)
  //     }
  //   });
  // });
  // console.log(r1);
  // return r1;

  const result = await new Promise((resolve, reject) => {
    s3.upload(image, (err, data) => {
      if (err) {
        // return {
        //   success: false,
        //   location: ""
        // };
        console.log(err);
        reject(err);
      } else {
        // return {
        //   success: true,
        //   location: data.Location
        // };
        console.log(data);
        resolve(data);
      }
    });
  });
  return result;
};


const checkUserAuth = async (userId) => {
  const sql = 'SELECT school_mail_auth FROM user WHERE userId = ?';
  const user = await query(sql, [userId]);
  console.log(user);

  if (user.length == 0) {
    return false;
  } else {
    if (user[0] == 1) {
      return false;
    } else {
      return true;
    }
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

const authPendingAuthentication = async (userId, token) => {
  // userId: string, token: string
  // Todo: Delete pending mail authentication with userId and token,
  //       then change user[userId].school_mail_auth to true
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
  var sql = 'INSERT INTO user(userId,nickname, school_name, school_mail, school_mail_auth, timetable, openprofile, report_count, reliability_score)VALUES(?,?,?,?,?,?,?,?,?)';
  var params = ['testId2','testnick2', 'skku', 'skku.edu','1','testtimetable', 'testopenprofile.com', 3, 50];

  try {
    const insert = await query(sql, params);
    console.log(insert);
    return {
      success: true,
      message: ""
    };
  } catch (error) {
    return {
      success: false,
      message: "이미 가입되어 있습니다."
    };
  }
};

// Placeholder
const getUser = async (userId) => {
  var sql = 'SELECT * FROM user WHERE userId = ?';
  try{
    const pickuser = await query(sql, [userId]);
    return {
      userId: pickuser.userId,
      nickname: pickuser.nickname,
      school_name: pickuser.school_name,
      school_mail: pickuser.school_mail,
      school_mail_auth: 1,
      timetable: JSON.parse(pickuser.timetable),
      openprofile: pickuser.openprofile,
      report_count: pickuser.report_count,
      reliability_score: pickuser.reliability_score
    };
  }catch(error){
    return false;
  }
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
};

// Placeholder
const registNewItem = async (userId, item_name, item_price, item_detail, item_image) => {
  var sql = 'INSERT INTO item(userId, itemId, item_name, item_price, item_detail, item_image, item_date)VALUES(?,?,?,?,?,?,?)';
  var params = ['testId2','testitemid', 'itemname', 10000,'itemdetail', 'itemimage_s3url', 'date'];
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
  var sql = 'SELECT * FROM itme WHERE itemId = ?';
  try{
    const pickitem = await query(sql, [itemId]);
    return {
      userId: pickitem.userId,
      itemId: pickitem.itemId,
      item_name: pickitem.item_name,
      item_price: pickitem.item_price,
      item_detail: pickitem.item_detail,
      item_image: JSON.parse(pickitem.item_image),
      item_date: null // Please convert to some date type
      };
  }catch(error){
    return false;
  }
};

module.exports = {
  uploadImages,
  checkUserAuth,
  registPendingAuthentication,
  authPendingAuthentication,
  registNewUser,
  getUser,
  registNewItem,
  getItem
}
