var createError = require("http-errors");
var express = require("express");
var path = require("path");
// var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
require("dotenv").config();
require("./config/database");

const port = process.env.PORT || 3001;

var app = express();
app.use(cors());
app.use(logger("dev"));
app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));

app.use("/users", require("./routes/users"));
app.use("/auth", require("./routes/auth"));
app.use("/expenses", require("./routes/expenses"))

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

// serve client
app.use(express.static(path.join(__dirname, "../client/build/")));


// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

app.listen(port, function () {
	console.log(`Express app running on port ${port}`);
  });

app.get("/*", function (req, res) {
  res.sendFile("index.html", {
	root: path.join(__dirname, "../client/build/"),
  });
});

// module.exports = app;
