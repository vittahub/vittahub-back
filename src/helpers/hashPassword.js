const bcrypt = require('bcryptjs');

module.exports = async function hashPassword(password) {
  return bcrypt.hash(password, 8);
};