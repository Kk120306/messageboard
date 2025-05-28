const db = require("../db/query");
const bcrypt = require("bcryptjs");

function getSignUpForm(req, res) {
    if (req.isUnauthenticated()) {
        res.render("sign-up-form");
    } else {
        redirect("/");
    }
}

async function handleSignUp(req, res, next) {
    try {
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