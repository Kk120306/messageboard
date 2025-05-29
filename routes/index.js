const express = require("express");
const router = express.Router();
const validationRules = require("../validations/messageValidation")

router.use(express.urlencoded({ extended: true }));

const indexController = require("../controllers/indexController");

router.get("/", indexController.getIndex);
router.get("/edit/:id", indexController.editMessageGet);
router.post("/edit/:id", validationRules, indexController.editMessagePost);
// router.post("/delete/:id", indexController.removeMessage);

module.exports = router;