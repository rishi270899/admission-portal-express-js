const CourseModel = require("../models/course");
class CourseController {
  static CourseInsert = async (req, res) => {
    try {
      console.log(req.body);
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
      res.redirect("/home");
    } catch (error) {
      console.log(error);
    }
  };

  static courseDisplay = async (req, res) => {
    try {
      const { id } = req.data;
      const { name, email, image } = req.data;
      const data = await CourseModel.find();
      // console.log(data)
      res.render("course/display", {
        uname: name,
        image: image,
        umail: email,
        d: data,
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
      console.log(data);
      res.render("course/view", {
        uname: name,
        image: image,
        umail: email,
        d: data,
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
        uname: name,
        image: image,
        umail: email,
        d: data,
      });
    } catch (error) {
      console.log(error);
    }
  };

  static courseDel = async (req, res) => {
    try {
      const data = await CourseModel.findByIdAndDelete(req.params.id);
      req.flash("success", "Course Delete Successfully");
      res.redirect("/courseDisplay");
    } catch (error) {
      console.log(error);
    }
  };

  static courseUpdate = async(req,res)=>{
    try {
       console.log(req.body)
       // console.log(req.params.id)
       const { id } = req.data
       const { cname, cmail, cmob, cbirth, cadd, cgen, ced, Ccourse } = req.body
       const update = await CourseModel.findByIdAndUpdate(req.params.id,{
          name: cname,
          email: cmail,
          mobile_no: cmob,
          dob: cbirth,
          address: cadd,
          gender: cgen,
          education: ced,
          course: Ccourse,
          user_id: id
       })
       req.flash("success", "Course Updated Successfully")
       res.redirect("/courseDisplay")
    } catch (error) {
       
    }
 }
}

module.exports = CourseController;
