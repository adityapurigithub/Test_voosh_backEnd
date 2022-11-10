//requirements.....
const express = require("express");
const app = express();

const port = process.env.PORT || 8000;

const path = require("path");

const ejsLayouts = require("express-ejs-layouts");

//mongo db connection
const db = require("./config/mongoose");

//cookie parser..
const cookieParser = require("cookie-parser");

//setup's.........
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//using ejs layout
app.use(ejsLayouts);

app.use(express.static("./assets"));

//for extracting style from a ejs  to layout.ejs
app.set("layout extractStyles", true);

//parsing incoming post request...
app.use(express.urlencoded());

//using cookie parser for setting/reading id to/from cookie.
app.use(cookieParser());

//setting route...
app.use("/", require("./routes"));

app.listen(port, function (err) {
  console.log(`server up on port ${port}`);
  if (err) {
    console.log("err in running port", err);
  }
});
