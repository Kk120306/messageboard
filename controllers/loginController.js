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
    console.log("handleLogin invoked");
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/log-in",
      failureFlash: true,
    })(req, res, next);
  }
  

module.exports = {
    getLogInForm,
    handleLogin
};
