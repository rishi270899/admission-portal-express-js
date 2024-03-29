const express = require("express");
const FrontController = require("../controllers/FrontController");
const route = express.Router();

//route localhost:3000(/)

route.get("/", FrontController.login);
route.get("/register", FrontController.register);
route.get("/home", FrontController.home);
route.get("/about", FrontController.home);
route.get("/contact", FrontController.contact);
route.get("/team", FrontController.team);

// insert user data

route.post("/insertuser", FrontController.insertUser);
route.post("/verifyLogin",FrontController.verifyLogin)

module.exports = route;
