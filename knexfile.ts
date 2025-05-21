import 'dotenv/config';
import type { Knex } from 'knex';

const ssl = process.env.NODE_ENV === 'production';

const config: { [key: string]: Knex.Config } = {
  development: {
    client: 'pg',
    connection: ssl
      ? {
          connectionString: process.env.DATABASE_URL,
          ssl: { rejectUnauthorized: false }
        }
      : process.env.DATABASE_URL,
    migrations: {
      directory: './src/database/migrations'
    }
  }
};

export default config;
