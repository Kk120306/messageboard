const db = require("../db/query");
const { validationResult } = require('express-validator');
const { get } = require("../routes/signup");
require('dotenv').config();

async function getMembership(req, res) {
    if (req.isAuthenticated()) {
        const result = await db.getUserById(req.user.id);
        const isMember = result.rows[0]?.is_member;
        if (isMember) {
            res.render("errors", {
                message : "You are already a member!"
            })
        } else {
            res.render("member-form", {
                errors: []
            })
        }
        
    } else {
        res.redirect("/");
    }
}

async function handleMembership(req, res, next) {
    const errors = validationResult(req).array();

    if (errors.length > 0) {
        return res.render("member-form", {
            errors: errors
        })
    }

    if (
        req.body.membershipCode === process.env.MEMBERSHIP_CODE ||
        req.body.membershipCode === true
    ) {
        try {
            await db.modifyMembership(req.user.id);
            res.redirect("/");
        } catch (err) {
            return next(new Error("Something went wrong while checking for your membership"));
        }
    } else {
        res.status(400).send("Invalid membership code");
    }
}

module.exports = {
    getMembership,
    handleMembership
};
