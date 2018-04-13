var mysql = require("mysql");

class MySql {
  constructor() {
    this.table = "";
  }

  getConnection() {
    var connection = mysql.createConnection({
      host: process.env.MYSQL_HOST,
      port: process.env.MYSQL_PORT,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PWD,
      database: process.env.MYSQL_DB
    });

    return connection;
  }

  find(skip, take, callback) {
    skip = skip || 0;
    take = take || 10;

    const countquery = `SELECT COUNT(*) count FROM ${this.table}`;
    const query = `SELECT * FROM ${this.table} LIMIT ${skip},${take}`;

    const connection = this.getConnection();
    connection.query(countquery, function(
      countError,
      countResults,
      countFields
    ) {
      if (countError) {
        callback({
          message: countError.sqlMessage,
          code: countError.code,
          countError
        });
        return;
      }

      connection.query(query, function(queryError, queryResults, queryFields) {
        if (queryError) {
          callback({
            message: queryError.sqlMessage,
            code: queryError.code,
            queryError
          });
          return;
        }
        callback({
          skip,
          take,
          count: countResults[0].count,
          results: queryResults
        });
      });
      connection.end();
    });
  }
}

module.exports = MySql;
