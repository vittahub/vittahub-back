const knex = require('knex');
const config = require('../config/database');
const db = knex(config.development);
module.exports = db;