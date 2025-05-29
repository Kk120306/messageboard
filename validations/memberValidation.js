const { check } = require('express-validator');
require('dotenv').config();

const validationRules = [
    check("membershipCode")
        .trim()
        .notEmpty()
        .withMessage("Cant Be Empty!")
        .equals(process.env.MEMBERSHIP_CODE)
        .withMessage("Wrong Code!"),
]

module.exports = validationRules;