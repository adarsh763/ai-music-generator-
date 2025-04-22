const dotenv = require('dotenv');

dotenv.config();

const serverConfig = {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
    apiPrefix: '/api/v1',
};

module.exports = serverConfig;