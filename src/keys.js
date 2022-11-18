const {PORT, DB_HOST, DB_NAME, DB_PORT, DB_PASSWORD, DB_USER} = require('./env');
module.exports = {
    database: {
        host: DB_HOST,
        database: DB_NAME,
        user: DB_USER,
        password: DB_PASSWORD,
    },
};