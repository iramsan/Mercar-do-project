require('dotenv').config();

module.exports = {
    database: {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        db_port: process.env.DB_PORT || 5000
    },
};

// console.log(process.env.DB_PASSWORD);
// console.log(process.env.DB_PORT);