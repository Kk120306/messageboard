const db = require("../db/query");
const passport = require("passport");

function getLogInForm(req, res) {
    if (req.isUnauthenticated()) {
        res.render("log-in-form"); 
    } else {
        res.redirect("/"); 
    }
}

function handleLogin(req, res, next) {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/"
    })(req, res, next); 
}

module.exports = {
    getLogInForm,
    handleLogin
};
