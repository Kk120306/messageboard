const express = require("express");
const router = express.Router();
const validationRules = require("../validations/memberValidation");

router.use(express.urlencoded({ extended: true }));

const membershipController = require("../controllers/membershipController");

router.get("/", membershipController.getMembership);
router.post("/", validationRules, membershipController.handleMembership);


module.exports = router;