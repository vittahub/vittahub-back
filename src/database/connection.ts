import knex, { Knex } from 'knex';
import config from '../config/database';

const db: Knex = knex(config.development);

export default db;