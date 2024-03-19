const UserModel = require("../models/user");
const teacherModel = require("../models/teacher");
const bcrypt = require("bcrypt");
class FrontController {
  static login = async (req, res) => {
    try {
      res.render("login", { msg: req.flash("success") });
    } catch (error) {
      console.log(error);
    }
  };

  static register = async (req, res) => {
    try {
      res.render("register", { msg: req.flash("error") });
    } catch (error) {
      console.log(error);
    }
  };

  static home = async (req, res) => {
    try {
      res.render("home");
    } catch (error) {
      console.log(error);
    }
  };

  static about = async (req, res) => {
    try {
      res.render("about");
    } catch (error) {
      console.log(error);
    }
  };

  static contact = async (req, res) => {
    try {
      res.render("contact");
    } catch (error) {
      console.log(error);
    }
  };

  static team = async (req, res) => {
    try {
      res.send("team");
    } catch (error) {
      console.log(error);
    }
  };

  // insertUser method
  static insertUser = async (req, res) => {
    try {
      console.log(req.files.image)
      // const { n, e, p, cp } = req.body;
      // const user = await UserModel.findOne({ email: e });
      // // console.log(user)
      // if (user) {
      //   req.flash("error", "Email Already Exits.");
      //   res.redirect("/register");
      // } else {
      //   if (n && e && p && cp) {
      //     if (p == cp) {
      //       const hashPassword = await bcrypt.hash(p, 10);
      //       const result = new UserModel({
      //         name: n,
      //         email: e,
      //         password: hashPassword,
      //       });
      //       await result.save();
      //       req.flash("success", "Registration Success! Please Login");
      //       res.redirect("/"); // url
      //     } else {
      //       req.flash("error", "password not match");
      //       res.redirect("/register");
      //     }
      //   } else {
      //     req.flash("error", "All feilds are required");
      //     res.redirect("/register");
      //   }
      // }
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = FrontController;
