const express = require("express");
const app = express();
const port = 3000;
const web = require("./routes/web");

// ejs set html css
app.set('view engine','ejs')

// image and css link
app.use(express.static('public'))


// link write always above route code 

// route load
app.use("/", web);

// server create
app.listen(port, () => {
  console.log(`Server start localHost : ${port}`);
});
