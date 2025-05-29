const db = require("../db/query");

async function getIndex(req, res) {
    if (req.isUnauthenticated()) {
        res.render("log-in-form");
    } else {
        const messages = await db.getAllMessagesWithSenderNames();
        res.render("index", {
            user: req.user,
            messages : messages
        });
    }
}

module.exports = {
    getIndex
}