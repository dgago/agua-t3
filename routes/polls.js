var express = require("express");
var router = express.Router();

var mysql = require("mysql");

/* GET polls listing. */
router.get("/", function(req, res, next) {
  var connection = mysql.createConnection({
    host: "192.168.174.135",
    user: "root",
    password: "abc123",
    database: "test"
  });

  connection.connect(function(error) {
    if (error) {
      throw error;
    }
  });

  connection.query("SELECT * FROM polls", function(error, results, fields) {
    if (error) {
      throw error;
    }

    console.log("results", results);
    res.send(results);
  });

  connection.end();
});

module.exports = router;
