const path = require("node:path");
const express = require("express");
const session = require("express-session");
const passport = require("./config/passportConfig");
const flash = require("connect-flash");



const signUpRouter = require('./routes/signup');
const logInRouter = require('./routes/login');
const memberRouter = require('./routes/membership');
const messageRouter = require('./routes/messages');
const indexRouter = require('./routes/index');


const app = express();
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
    session({
        secret: process.env.COOKIE_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: process.env.NODE_ENV === "production",
            maxAge: 24 * 60 * 60 * 1000,
        },
    }),
);

app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
    res.locals.currentUser = req.user;
    next();
});

app.use((req, res, next) => {
    console.log("Session:", req.session);
    console.log("User:", req.user);
    next();
  });
  


app.use(express.urlencoded({ extended: false }));
app.use(flash()); 

app.use("/",indexRouter);
app.use("/sign-up", signUpRouter);
app.use("/log-in", logInRouter);
app.use("/membership", memberRouter);
app.use("/new-message", messageRouter);


app.get("/log-out", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        res.redirect("/");
    });
});


app.listen(3000, () => console.log("app listening on port 3000!"));
