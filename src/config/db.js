const sql = require('mssql/msnodesqlv8');

const config = {
  server: 'DESKTOP-MIH07DC',
  database: 'tasks_db',
  options: {
    trustedConnection: true,
    trustServerCertificate: true
  },
  driver: 'ODBC Driver 17 for SQL Server'
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to SQL Server');
    return pool;
  })
  .catch(err => {
    console.error('Database connection failed:', err);
    process.exit(1);
  });

module.exports = { sql, poolPromise };