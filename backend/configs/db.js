const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: 'REPLACE_WITH_RDS_ENDPOINT',
  user: 'MySqlDB',
  password: 'rohini123',
  database: 'MYDB',
  connectionLimit: 5
});

module.exports = pool;
