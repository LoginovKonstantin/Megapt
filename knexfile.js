// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

module.exports = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT) || 5432,
    charset: 'utf8',
    multipleStatements: true,
  },
  pool: {
    min: Number(process.env.DB_POOL_MIN) || 10,
    max: Number(process.env.DB_POOL_MAX) || 30,
    createTimeoutMillis:
      Number(process.env.DB_POOL_CREATE_TIMEOUT_MILLIS) || 3000,
    acquireTimeoutMillis:
      Number(process.env.DB_POOL_ACQUIRE_TIMEOUT_MILLIS) || 30000,
    idleTimeoutMillis: Number(process.env.DB_POOL_IDLE_TIMEOUT_MILLIS) || 30000,
    reapIntervalMillis:
      Number(process.env.DB_POOL_REAP_INTERVAL_MILLIS) || 1000,
    createRetryIntervalMillis:
      Number(process.env.DB_POOL_CREATE_RETRY_INTERVAL_MILLIS) || 100,
    propagateCreateError:
      ['true', 'false'].includes(
        process.env.DB_POOL_PROPAGATE_CREATE_ERROR || '',
      ) || false,
  },
  debug: Number(process.env.DB_DEBUG) === 1,
  migrations: {
    tableName: process.env.MIGRATIONS_TABLE || '_migrations',
    directory: process.env.MIGRATIONS_DIRECTORY || 'src/database/migrations',
  },
  dialectOptions: {
    maxPreparedStatements:
      Number(process.env.DB_MAX_PREPARED_STATEMENTS) || 100,
  },
};
