const router = require("express").Router();
const {
  loginController,
  registerController,
} = require("../controllers/userController");

//POST Route for login/register
router.post("/login", loginController);
router.post("/register", registerController);
module.exports = router;
