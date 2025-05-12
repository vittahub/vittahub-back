const db = require('../database/connection');

module.exports = {
  async findByEmail(email) {
    return db('users').where({ email }).first();
  },

  async create(user) {
    return db('users').insert(user).returning('*');
  },
};