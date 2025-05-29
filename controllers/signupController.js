const db = require("../db/query");
const bcrypt = require("bcryptjs");
const { validationResult } = require('express-validator');

function getSignUpForm(req, res) {
    if (req.isUnauthenticated()) {
        res.render("sign-up-form", {
            errors: []
        });
    } else {
        redirect("/");
    }
}

async function handleSignUp(req, res, next) {
    try {
        const errors = validationResult(req).array();

        if (errors.length > 0) {
            return res.render("sign-up-form", {
                errors : errors
            })
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        await db.createUser(
            req.body.first_name,
            req.body.last_name,
            req.body.email,
            hashedPassword
        );

        res.redirect("/");
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getSignUpForm,
    handleSignUp
}