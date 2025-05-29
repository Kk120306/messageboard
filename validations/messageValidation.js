const { check } = require('express-validator');

const validationRules = [
    check("title")
        .trim()
        .notEmpty()
        .withMessage("Title must not be empty")
        .isLength({ max: 45 })
        .withMessage("Title cannot exceed more than 45 characters"),
    check("message")
        .trim()
        .notEmpty()
        .withMessage("Message cannot be empty?")
        .isLength({ max: 600 })
        .withMessage("Message cannot exceed 600 characters"),
]

module.exports = validationRules;