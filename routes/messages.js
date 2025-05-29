const express = require("express");
const router = express.Router();
const validationRules = require('../validations/messageValidation');

router.use(express.urlencoded({ extended: true }));

const messageController = require("../controllers/messageController");

router.get("/", messageController.getMessageForm);
router.post("/", validationRules, messageController.handleMessage);

module.exports = router;