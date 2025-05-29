const db = require("../db/query");
const { validationResult } = require('express-validator');

function getMessageForm(req, res) {
    if (req.isAuthenticated()) {
        res.render("message-form", {
            errors: []
        })
    } else {
        res.redirect("/")
    }
}

async function handleMessage(req, res, next) {
    const errors = validationResult(req).array();

    if (errors.length > 0) {
        return res.render("message-form", {
            errors: errors
        })
    }

    try {
        await db.createMessage(req.user.id, req.body.title, req.body.message)
        res.redirect("/")
    } catch (err) {
        return next(new Error("There was a error processing your message."))
    }
}

module.exports = {
    getMessageForm,
    handleMessage
}