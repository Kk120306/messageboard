const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const pool = require("../db/pool");
const bcrypt = require("bcryptjs");

passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
        try {
            console.log("Authenticating:", email);
            const { rows } = await pool.query("SELECT * FROM users WHERE email = $1", [email]);
            const user = rows[0];
            if (!user) {
                console.log("No user found");
                return done(null, false, { message: "Incorrect email" });
            }

            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                console.log("Password mismatch");
                return done(null, false, { message: "Incorrect password" });
            }

            console.log("User authenticated successfully");
            return done(null, user);
        } catch (err) {
            console.error("Passport error:", err);
            return done(err);
        }
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        const user = rows[0];

        done(null, user);
    } catch (err) {
        done(err);
    }
});



module.exports = passport;