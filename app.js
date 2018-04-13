var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var pollsRouter = require("./routes/polls");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/polls", pollsRouter);

app.use(function(err, req, res, next) {
  if (req.xhr) {
    res.status(500).json(err);
  } else {
    next(err);
  }
});

module.exports = app;
