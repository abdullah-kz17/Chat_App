const express = require("express");
const {
  registerUser,
  authUser,
  getUsers,
} = require("../controllers/userController");

const router = express.Router();

router.route("/register").post(registerUser);
router.post("/login", authUser);
router.route("/").get(getUsers);

module.exports = router;
