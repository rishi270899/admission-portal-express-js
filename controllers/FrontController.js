const UserModel = require("../models/user");
const teacherModel = require("../models/teacher");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");
const jwt = require("jsonwebtoken");

cloudinary.config({
  cloud_name: "dyxjmoreb",
  api_key: "595882299239783",
  api_secret: "OJod9Gs00wDZv6As9mmwp4WujSA",
});
class FrontController {
  static login = async (req, res) => {
    try {
      res.render("login", {
        msg: req.flash("success"),
        msg1: req.flash("error"),
      });
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
      const { name, email, image } = req.data;
      res.render("home", { n: name, i: image });
    } catch (error) {
      console.log(error);
    }
  };

  static about = async (req, res) => {
    try {
      const { name, email, image } = req.data;
      res.render("about", { n: name, i: image });
    } catch (error) {
      console.log(error);
    }
  };

  static contact = async (req, res) => {
    try {
      const { name, email, image } = req.data;
      res.render("contact", { n: name, i: image });
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
      // console.log(req.files.image);
      const file = req.files.image;
      //***image upload cloudinary */
      const imageUpload = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: "userprofile",
      });
      console.log(imageUpload);
      const { n, e, p, cp } = req.body;
      const user = await UserModel.findOne({ email: e });
      // console.log(user)
      if (user) {
        req.flash("error", "Email Already Exits.");
        res.redirect("/register");
      } else {
        if (n && e && p && cp) {
          if (p == cp) {
            const hashPassword = await bcrypt.hash(p, 10);
            const result = new UserModel({
              name: n,
              email: e,
              password: hashPassword,
              image: {
                public_id: imageUpload.public_id,
                url: imageUpload.secure_url,
              },
            });
            await result.save();
            req.flash("success", "Registration Success! Please Login");
            res.redirect("/"); // url
          } else {
            req.flash("error", "password not match");
            res.redirect("/register");
          }
        } else {
          req.flash("error", "All feilds are required");
          res.redirect("/register");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // verify login data
  static verifyLogin = async (req, res) => {
    try {
      // console.log(req.body)
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email: email });
      // console.log(user);
      if (user != null) {
        const ismatch = await bcrypt.compare(password, user.password);
        // console.log(ismatch)
        if (ismatch) {
          // token
          const token = jwt.sign({ ID: user._id }, "rishigoyal@27");
          // console.log(token);
          res.cookie("token", token);
          res.redirect("/home");
        } else {
          req.flash("error", "Email or Password not valid");
          res.redirect("/");
        }
      } else {
        req.flash("error", "Not Registered Email");
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  static logout = async (req, res) => {
    try {
      res.clearCookie("token");
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = FrontController;
