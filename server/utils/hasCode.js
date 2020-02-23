var crypto = require("crypto");
// 生成salt盐
var genRandomString = function(length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex") /** convert to hexadecimal format */
    .slice(0, length); /** return required number of characters */
};
/**
 * 加密函数
 * @function
 * @param {string} password - List of required fields.
 * @param {string} salt - Data to be validated.
 */
var sha512 = function(password, salt) {
  var hash = crypto.createHmac("sha512", salt);
  hash.update(password);
  var value = hash.digest("hex");
  return {
    salt: salt,
    passwordHash: value
  };
};

// 生成加密字符串
module.exports = function saltHashPassword(userpassword, salt = genRandomString(16)) {
  var passwordData = sha512(userpassword, salt);
  return passwordData;
};