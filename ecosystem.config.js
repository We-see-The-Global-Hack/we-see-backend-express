const dotenv = require('dotenv');

module.exports = {
  apps: [{
    name: 'ADMIN_API',
    script: 'server.js',

    instances: 1,
    exec_mode: 'fork',
    autorestart: true,
    watch: false,
    max_memory_restart: '2G',
    cron_restart: '0 */12 * * *',

    env: {
      NODE_ENV: 'local',
      ...dotenv.config({ path: './.env' }).parsed,
      DB_SUBSCRIPTION_NODE: false,
    },
    env_development: {
      NODE_ENV: 'development',
      ...dotenv.config({ path: './.development.env' }).parsed,
      DB_SUBSCRIPTION_NODE: false,
    },
    env_staging: {
      NODE_ENV: 'staging',
      ...dotenv.config({ path: './.staging.env' }).parsed,
      DB_SUBSCRIPTION_NODE: false,
    },
    env_production: {
      NODE_ENV: 'production',
      ...dotenv.config({ path: './.production.env' }).parsed,
      DB_SUBSCRIPTION_NODE: false,
    },
    env_testing: {
      NODE_ENV: 'testing',
      ...dotenv.config({ path: './.testing.env' }).parsed,
      DB_SUBSCRIPTION_NODE: false,
    },
  },
  ],
};
