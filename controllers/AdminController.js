const CourseModel = require("../models/course");
const nodemailer = require("nodemailer");
class AdminController {
  static dashboard = async (req, res) => {
    try {
      const { name, email, image } = req.data;
      req.render("admin/dashboard", { name: name, image: image, email: email });
    } catch (error) {
      console.log(error);
    }
  };
  static display = async (req, res) => {
    try {
      const { name, email, image } = req.data;
      const data = await CourseModel.find();
      res.render("admin/display", {
        data: data,
        name: name,
        image: image,
        email: email,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static adminView = async (req, res) => {
    try {
      const { name, email, image } = req.data;
      const data = await CourseModel.findById(req.params.id);
      res.render("admin/View", {
        data: data,
        name: name,
        image: image,
        email: email,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static adminEdit = async (req, res) => {
    try {
      const { name, email, image } = req.data;
      const data = await CourseModel.findById(req.params.id);
      res.render("admin/Edit", {
        data: data,
        name: name,
        image: image,
        email: email,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static adminDel = async (req, res) => {
    try {
      const data = await CourseModel.findByIdAndDelete(req.params.id);
      res.redirect("/display");
    } catch (error) {
      console.log(error);
    }
  };

  static updatestatus = async (req, res) => {
    try {
      // console.log(req.body);
      const { comment, name, email, status } = req.body;
      await CourseModel.findByIdAndUpdate(req.params.id, {
        comment: comment,
        status: status,
      });
      this.sendEmail(name, email, status, comment);
      res.redirect("/admin/dashboard");
    } catch {
      console.log(error);
    }
  };

  // static sendEmail = async (name, email, status, comment) => {
  //   // console.log(name,email,status,comment)
  //   // connenct with the smtp server

  //   let transporter = await nodemailer.createTransport({
  //     host: "smtp.gmail.com",
  //     port: 587,

  //     auth: {
  //       user: "rishig516@gmail.com",
  //       pass: "pczoedsfgcabdino",
  //     },
  //   });
  //   let info = await transporter.sendMail({
  //     from: "test@gmail.com", // sender address
  //     to: email, // list of receivers
  //     subject: ` Course ${status}`, // Subject line
  //     text: "heelo", // plain text body
  //     html: `<b>${name}</b> Course  <b>${status}</b> successful! <br>
  //      <b>Comment from Admin</b> ${comment} `, // html body
  //   });
  // };
}

module.exports = AdminController;
