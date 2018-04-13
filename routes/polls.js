var express = require("express");
var router = express.Router();

var url = require("url");
const Polls = require("../components/data/Polls");

/* GET polls listing. */
router.get("/", function(req, res, next) {
  var ps = url.parse(req.url, true).query;

  find(res, ps.skip, ps.take);
});

function find(res, skip, take) {
  const polls = new Polls();
  polls.find(skip, take, function(r) {
    res.send(r);
  });
}

module.exports = router;
