const express = require("express");
const FrontController = require("../controllers/FrontController");
const route = express.Router();
const checkUseAuth = require("../middleware/auth");
const CourseController = require("../controllers/CourseController");
const AdminController = require("../controllers/AdminController");

//route localhost:3000(/)
route.get("/", FrontController.login);
route.get("/register", FrontController.register);
route.get("/home", checkUseAuth, FrontController.home);
route.get("/about", checkUseAuth, FrontController.about);
route.get("/contact", checkUseAuth, FrontController.contact);
route.get("/team", checkUseAuth, FrontController.team);

// insert user data
route.post("/insertuser", FrontController.insertUser);
route.post("/verifyLogin", FrontController.verifyLogin);
route.get("/logout", FrontController.logout);

// CourseController
route.post("/CourseInsert",checkUseAuth,CourseController.CourseInsert);
route.get("/courseDisplay",checkUseAuth,CourseController.courseDisplay);
route.get("/courseView/:id",checkUseAuth,CourseController.courseView);
route.get("/courseEdit/:id",checkUseAuth,CourseController.courseEdit);
route.get("/courseDel/:id",checkUseAuth,CourseController.courseDel);
route.post("/courseUpdate/:id",checkUseAuth,CourseController.courseUpdate);

// admin part 
route.get("/admin/dashboard",AdminController.dashboard);
route.get("/admin/dashboard",AdminController.display);




module.exports = route;
