const path = require('path');
const fs = require('fs');

module.exports = ({ env }) => {
  const client = env('DATABASE_CLIENT', 'mysql');

  const connections = {
    mysql: {
      connection: {
        host: env('DATABASE_HOST', '10.3.0.57'),
        port: env.int('DATABASE_PORT', 3306),
        database: env('DATABASE_NAME', 'strapi'),
        user: env('DATABASE_USERNAME', 'strapi'),
        password: env('DATABASE_PASSWORD', 'strapi'),
        ssl: env.bool('DATABASE_SSL', false) ? {
          key: env('DATABASE_SSL_KEY') && fs.readFileSync(env('DATABASE_SSL_KEY'), 'utf8'),
          cert: env('DATABASE_SSL_CERT') && fs.readFileSync(env('DATABASE_SSL_CERT'), 'utf8'),
          ca: env('DATABASE_SSL_CA') && fs.readFileSync(env('DATABASE_SSL_CA'), 'utf8'),
          rejectUnauthorized: env.bool('DATABASE_SSL_REJECT_UNAUTHORIZED', true),
        } : false,
      },
      pool: {
        min: env.int('DATABASE_POOL_MIN', 2),
        max: env.int('DATABASE_POOL_MAX', 10),
      },
    },
    sqlite: {
      connection: {
        filename: path.join(__dirname, '..', env('DATABASE_FILENAME', '.tmp/data.db')),
      },
      useNullAsDefault: true,
    },
  };

  return {
    connection: {
      client,
      ...connections[client],
      acquireConnectionTimeout: env.int('DATABASE_CONNECTION_TIMEOUT', 60000),
    },
  };
};
