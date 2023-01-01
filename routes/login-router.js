const express = require('express');
const session = require('express-session');
const db = require('../routes/db-config');
const router = express.Router();
const bcrypt = require('bcryptjs');
const cookieParser = require("cookie-parser");

router.post("/", (request, response) => {
    let login = request.body.login;
    let password = request.body.password;

    try {
        const results = db.query("SELECT * FROM users WHERE login = ?", [login]);
        if (results.length == 0) {
            response.status(401).json({ status: "error", message: "Wrong login" });
        }
        else {
            let user = results[0];
            if (bcrypt.compareSync(password, user.password)) {
                request.session.user = { login: login };    // save user in session
                response.cookie('sessionId', request.session.id, { maxAge: 3600000 });  // max age in miliseconds - 1 hour
                response.status(200).json({ status: "ok", message: "Logged in" });
            }
            else {
                response.status(401).json({ status: "error", message: "Wrong password" });
            }
        }
    }
    catch (error) {
        response.status(500).json({ status: "error", message: "Database error" });
    }
});


module.exports = router;