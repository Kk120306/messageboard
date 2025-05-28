const express = require("express");
const router = express.Router();
// TODO : add some validation for the sign up - 

router.use(express.urlencoded({ extended: true }));

const signUpController = require("../controllers/signupController");

router.get("/", signUpController.getSignUpForm);
router.post("/", signUpController.handleSignUp);

module.exports = router;