var express = require("express");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");

var students = require("./routes/students");

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());


app.use(function(req, res, next) {
  
  res.set("Access-Control-Allow-Origin", "*");

  res.set("Access-Control-Allow-Credentials", "true");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
  res.set('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
  next();
});

app.use(express.static("./static"));
app.use("/api/students", students);


app.listen(3100, function() {
  console.log("API server running at port 3100");
});