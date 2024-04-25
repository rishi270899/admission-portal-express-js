class AdminController {
  static dashboard = async (req, res) => {
    try {
      res.render("admin/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  static display = async (req, res) => {
    try {
      res.render("admin/display");
    } catch (error) {
      console.log(error);
    }
  };
}

module.exports = AdminController;
