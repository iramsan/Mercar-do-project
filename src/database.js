const mysql = require('mysql');
const { database } = require('./keys');
const { promisify } = require('util');

const pool = mysql.createPool(database);
pool.getConnection( (error, connection) => {
    if (error) {
        throw error;
    } else {
        console.log('DB Connection Success');
    }
});

pool.query = promisify(pool.query);
module.exports = pool;