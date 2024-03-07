const UserModel = require('../models/user');
const teacherModel = require('../models/teacher');
class FrontController {
  static login = async (req, res) => {
    try {
      res.render("login");
    } catch (error) {
      console.log(error);
    }
  };

  static register = async (req, res) => {
    try {
      res.render("register");
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

  static team = async (req, res)=>{
    try{
      res.send("team");
    } catch (error){
      console.log(error)
    }
  };

}

module.exports = FrontController;
