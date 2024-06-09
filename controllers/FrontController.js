const UserModel = require("../models/user");
const teacherModel = require("../models/teacher");
const CourseModel = require("../models/course");
const bcrypt = require("bcrypt");
const cloudinary = require("cloudinary");
const jwt = require("jsonwebtoken");
const nodeMailer = require("nodemailer");
const randomstring = require("randomstring");
const { RollerSkating } = require("@mui/icons-material");

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
      const { name, email, image, id, role } = req.data;
      const btech = await CourseModel.findOne({
        user_id: id,
        course: "B.Tech",
      });
      const bca = await CourseModel.findOne({ user_id: id, course: "BCA" });
      const mca = await CourseModel.findOne({ user_id: id, course: "MCA" });
      res.render("home", {
        name: name,
        image: image,
        email: email,
        btech: btech,
        bca: bca,
        mca: mca,
        role: role,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static about = async (req, res) => {
    try {
      const { name, email, image } = req.data;
      res.render("about", { name: name, image: image });
    } catch (error) {
      console.log(error);
    }
  };

  static contact = async (req, res) => {
    try {
      const { name, email, image } = req.data;
      res.render("contact", { name: name, image: image });
    } catch (error) {
      console.log(error);
    }
  };

  static logout = async (req, res) => {
    try {
      res.clearCookie("Token");
      res.redirect("/");
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
      // console.log(imageUpload);
      const { name, email, password, confirmPassword } = req.body;
      const user = await UserModel.findOne({ email: email });
      // console.log(user)
      if (user) {
        req.flash("error", "Email Already Exits.");
        res.redirect("/register");
      } else {
        if (name && email && password && confirmPassword) {
          if (password == confirmPassword) {
            const hashPassword = await bcrypt.hash(password, 10);
            const result = new UserModel({
              name: name,
              email: email,
              password: hashPassword,
              image: {
                public_id: imageUpload.public_id,
                url: imageUpload.secure_url,
              },
            });
            const userdata = await result.save();
            if (userdata) {
              var token = jwt.sign({ ID: userdata._id }, "rishigoyal@27");

              // var token = jwt.sign({ ID: user._id }, "rishigoyal@27");
              // console.log(token)
              res.cookie("Token", token);
              this.sendVerifymail(name, email, userdata._id);
              req.flash("error", "Registration Success! Please Login");
              res.redirect("/register");
            }
          } else {
            req.flash("error", "Not Register");
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

  static verifyLogin = async (req, res) => {
    try {
      // console.log(req.body)
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email: email });
      // console.log(user)
      if (user != null) {
        const isMatch = await bcrypt.compare(password, user.password);
        // console.log(isMatch)
        if (isMatch) {
          if (user.role == "user" && user.is_verified == 1) {
            var token = jwt.sign({ ID: user._id }, "rishigoyal@27");
            // console.log(token)
            res.cookie("Token", token);
            res.redirect("/home");
          } else if (user.role == "admin" && user.is_verified == 1) {
            var token = jwt.sign({ ID: user._id }, "rishigoyal@27");
            // console.log(token)
            res.cookie("Token", token);
            res.redirect("admin/dashboard");
          } else {
            req.flash("error", "Please verify your email address.");
            res.redirect("/");
          }
        } else {
          req.flash("error", "Invalid Username & Password.");
          res.redirect("/");
        }
      } else {
        req.flash("error", "You are not a registered user.");
        res.redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  static profile = (req, res) => {
    try {
      const { name, email, image } = req.data;
      res.render("profile", { n: name, i: image, e: email });
    } catch (error) {
      console.log(error);
    }
  };

  static changePassword = async (req, res) => {
    try {
      const { id } = req.data;
      //console.log(req.body)
      const { op, np, cp } = req.body;
      if (op && np && cp) {
        const user = await UserModel.findById(id);
        const isMatched = await bcrypt.compare(op, user.password);
        //console.log(isMatched)
        if (!isMatched) {
          req.flash("error", "Current password is incorrect ");
          res.redirect("/profile");
        } else {
          if (np != cp) {
            req.flash("error", "Password does not match");
            res.redirect("/profile");
          } else {
            const newHashPassword = await bcrypt.hash(np, 10);
            await UserModel.findByIdAndUpdate(id, {
              password: newHashPassword,
            });
            req.flash("success", "Password Updated successfully ");
            res.redirect("/");
          }
        }
      } else {
        req.flash("error", "ALL fields are required ");
        res.redirect("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  static updateProfile = async (req, res) => {
    try {
      const { id } = req.data;
      const { name, email, role } = req.body;
      if (req.files) {
        const user = await UserModel.findById(id);
        const imageID = user.image.public_id;
        // console.log(imageID);

        //deleting image from Cloudinary
        await cloudinary.uploader.destroy(imageID);
        //new image update
        const imagefile = req.files.image;
        const imageupload = await cloudinary.uploader.upload(
          imagefile.tempFilePath,
          {
            folder: "userProfile",
          }
        );
        var data = {
          name: name,
          email: email,
          image: {
            public_id: imageupload.public_id,
            url: imageupload.secure_url,
          },
        };
      } else {
        var data = {
          name: name,
          email: email,
        };
      }
      await UserModel.findByIdAndUpdate(id, data);
      req.flash("success", "Update Profile successfully");
      res.redirect("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  static sendVerifymail = async (name, email, user_id) => {
    //console.log(name, email, user_id);
    // connenct with the smtp server

    let transporter = await nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,

      auth: {
        user: "rishig516@gmail.com",
        pass: "tzciiqmckalntdtr",
      },
    });
    let info = await transporter.sendMail({
      from: "test@gmail.com", // sender address
      to: email, // list of receivers
      subject: "For Verification mail", // Subject line
      text: "hello", // plain text body
      html:
        "<p>Hii " +
        name +
        ',Please click here to <a href="http://localhost:3000/verify?id=' +
        user_id +
        '">Verify</a>Your mail</p>.',
    });
    //console.log(info);
  };
  static verifyMail = async (req, res) => {
    try {
      const updateinfo = await UserModel.findByIdAndUpdate(req.query.id, {
        is_verified: 1,
      });
      if (updateinfo) {
        res.redirect("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };
  static forgotPassword = async (req, res) => {
    try {
      res.render("forgotPassword", { msg: req.flash("error") });
    } catch (error) {
      console.log(error);
    }
  };
  static forgetPasswordVerify = async (req, res) => {
    try {
      const { email } = req.body;
      const userData = await UserModel.findOne({ email: email });
      //console.log(userData)
      if (userData) {
        const randomString = randomstring.generate();
        await UserModel.updateOne(
          { email: email },
          { $set: { token: randomString } }
        );
        this.sendEmail(userData.name, userData.email, randomString);
        req.flash("success", "Plz Check Your mail to reset Your Password!");
        res.redirect("/");
      } else {
        req.flash("error", "You are not a registered Email");
        res.redirect("/forgotpassword");
      }
    } catch (error) {
      console.log(error);
    }
  };
  static sendEmail = async (name, email, token) => {
    // console.log(name,email,status,comment)
    // connenct with the smtp server

    let transporter = await nodeMailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,

      auth: {
        user: "rishig516@gmail.com",
        pass: "tzciiqmckalntdtr",
      },
    });
    let info = await transporter.sendMail({
      from: "test@gmail.com", // sender address
      to: email, // list of receivers
      subject: "Reset Password", // Subject line
      text: "heelo", // plain text body
      html:
        "<p>Hii " +
        name +
        ',Please click here to <a href="http://localhost:3000/reset-password?token=' +
        token +
        '">Reset</a>Your Password.',
    });
  };
  static resetPassword = async (req, res) => {
    try {
      const token = req.query.token;
      const tokenData = await UserModel.findOne({ token: token });
      if (tokenData) {
        res.render("reset-password", { user_id: tokenData._id });
      } else {
        res.render("404");
      }
    } catch (error) {
      console.log(error);
    }
  };
  static reset_password1 = async (req, res) => {
    try {
      const { password, user_id } = req.body;
      const newHashPassword = await bcrypt.hash(password, 10);
      await UserModel.findByIdAndUpdate(user_id, {
        password: newHashPassword,
        token: "",
      });
      req.flash("success", "Reset password Updated successfully");
      res.redirect("/");
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = FrontController;
