const db = require("../db/query");
const { validationResult } = require("express-validator");

async function getIndex(req, res) {
    if (req.isUnauthenticated()) {
        res.render("log-in-form");
    } else {
        const messages = await db.getAllMessagesWithSenderDetail();
        res.render("index", {
            user: req.user,
            messages: messages
        });
    }
}

async function editMessageGet(req, res) {
    if (req.isAuthenticated()) {
        const id = req.params.id;
        const msg = await db.findMessageById(id);

        if (!msg) {
            return res.status(404).send("Message Not Found");
        }

        res.render("edit-form", {
            message: msg,
            errors: []
        })

    } else {
        res.redirect("/")
    }
}

async function editMessagePost(req, res) {
    const errors = validationResult(req).array();
    const id = req.params.id;
    const msg = await db.findMessageById(id);

    if (errors.length > 0 ) {
        return res.render("edit-form", {
            message: msg,
            errors: errors
        })
    }

    const title = req.body.title;
    const body = req.body.message;

    try {
        await db.updateMessage(id, title, body);
        res.redirect("/");
    } catch (err) {
        console.error("There was a error processing the update: ", err);
        throw err;
    }
}

async function deleteMessage(req, res) {
    const id = req.params.id;
    try {
        await db.deleteMessageById(id);
        res.redirect("/");
    } catch (err) {
        console.error("Failed to delete message: ", err);
        throw err;
    }
}


module.exports = {
    getIndex,
    editMessageGet,
    editMessagePost,
    deleteMessage
}