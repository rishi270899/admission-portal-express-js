const express = require("express");
const app = express();
const port = 3000;
const web = require("./routes/web");
const connectDB = require("./db/connectDB");

// connect DB
connectDB();

// connect flash and session
const session = require("express-session");
const flash = require("connect-flash");
//message
app.use(
  session({
    secret: "secret",
    cookies: { maxAge: 6000 },
    resave: false,
    saveUninitialized: false,
  })
);

//Flash message
app.use(flash());

// data get
// parse application/x - www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

// ejs set html css
app.set("view engine", "ejs");

// image and css link
app.use(express.static("public"));

// link write always above route code

// route load
app.use("/", web);

// server create
app.listen(port, () => {
  console.log(`Server start localHost : ${port}`);
});
