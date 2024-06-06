const CourseModel = require("../models/course");
const nodemailer = require("nodemailer");
class CourseController {
  static CourseInsert = async (req, res) => {
    try {
      // console.log(req.body);
      const { id } = req.data;
      const { name, email, phone, dob, address, gender, education, course } =
        req.body;
      const result = new CourseModel({
        name: name,
        email: email,
        phone: phone,
        dob: dob,
        gender: gender,
        address: address,
        education: education,
        course: course,
        user_id: id,
      });
      await result.save();
      this.sendMail(name, course, email);
      res.redirect("/Display");
    } catch (error) {
      console.log(error);
    }
  };

  static courseDisplay = async (req, res) => {
    try {
      const { id } = req.data;
      const { name, email, image } = req.data;
      const data = await CourseModel.find({user_id:id});
      // console.log(data)
      res.render("course/display", {
        name: name,
        image: image,
        email: email,
        data: data,
        msg: req.flash("success"),
      });
    } catch (error) {
      console.log(error);
    }
  };

  static courseView = async (req, res) => {
    try {
      // const { id } = req.data
      // console.log(req.params.id)//ig ko get krna ke liye
      const { name, email, image } = req.data;
      const data = await CourseModel.findById(req.params.id);
      // console.log(data);
      res.render("course/view", {
        name: name,
        image: image,
        email: email,
        data: data,
      });
    } catch (error) {
      console.log(error);
    }
  };
  static courseEdit = async (req, res) => {
    try {
      // const { id } = req.data
      // console.log(req.params.id)//ig ko get krna ke liye
      const { name, email, image } = req.data;
      const data = await CourseModel.findById(req.params.id);
      // console.log(data)
      res.render("course/edit", {
        name: name,
        image: image,
        email: email,
        data: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static courseUpdate = async(req,res)=>{
    try {
       console.log(req.body)
       // console.log(req.params.id)
       const { id } = req.data
       const { name, email, phone,dob , gender, education, course } = req.body
       const update = await CourseModel.findByIdAndUpdate(req.params.id,{
          name: name,
          email: email,
          phone: phone,
          dob: dob,
          address: address,
          gender: gender,
          education: education,
          course: course,
          user_id: id
       })
       req.flash("success", "Course Updated Successfully")
       res.redirect("/courseDisplay")
    } catch (error) {
       
    }
 }
  static courseDel = async (req, res) => {
    try {
      const data = await CourseModel.findByIdAndDelete(req.params.id);
      req.flash("success", "Course Delete Successfully");
      res.redirect("/courseDisplay");
    } catch (error) {
      console.log(error);
    }
  };


  static sendEmail = async (name, course) => {
    // console.log(name,email,status,comment)
    // connenct with the smtp server

    let transporter = await nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,

      auth: {
        user: "rishig516@gmail.com",
        pass: "pczoedsfgcabdino",
      },
    });
    let info = await transporter.sendMail({
      from: "test@gmail.com", // sender address
      to: email, // list of receivers
      subject: ` Course ${course}`, // Subject line
      text: "heelo", // plain text body
      html: `<b>${name}</b> Course  <b>${course}</b> successful! Insert <br>
     <b>Comment from Admin</b> `, // html body
    });
  };
}

module.exports = CourseController;
