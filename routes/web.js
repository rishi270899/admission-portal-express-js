const express = require("express");
const FrontController = require("../controllers/FrontController");
const route = express.Router();
const checkUseAuth = require("../middleware/auth");
const CourseController = require("../controllers/CourseController");

//route localhost:3000(/)
route.get("/", FrontController.login);
route.get("/register", FrontController.register);
route.get("/home", checkUseAuth, FrontController.home);
route.get("/about", checkUseAuth, FrontController.home);
route.get("/contact", checkUseAuth, FrontController.contact);
route.get("/team", checkUseAuth, FrontController.team);

// insert user data
route.post("/insertuser", FrontController.insertUser);
route.post("/verifyLogin", FrontController.verifyLogin);
route.get("/logout", FrontController.logout);

// CourseController
route.post("./course_insert",checkUseAuth,CourseController.CourseInsert)

module.exports = route;
