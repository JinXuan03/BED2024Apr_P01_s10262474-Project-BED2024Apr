const sql = require('mssql');

const dbConfig = {
    user: "week-11",
    password: "123",
    server: "localhost",
    database: "week-11",
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to false for production
    }
};

const poolPromise = new sql.ConnectionPool(dbConfig)
    .connect()
    .then(pool => {
        console.log('Connected to MSSQL');
        return pool;
    })
    .catch(err => console.log('Database Connection Failed!', err));

module.exports = {
    sql, poolPromise
};
