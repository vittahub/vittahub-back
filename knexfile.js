require('dotenv').config();

const ssl = process.env.SSL_DB === 'true';

module.exports = {
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
