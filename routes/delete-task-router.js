const express = require('express');
const db = require('../routes/db-config');
const router = express.Router();
const bcrypt = require('bcryptjs');
const cookieParser = require("cookie-parser");

router.post("/", (request, response) => {
    let taskId = request.body.idtask;
    console.log(taskId);
    try {
        db.query("DELETE FROM tasks WHERE idtask = ?", [taskId]);
        response.status(200).json({ status: "ok", message: "Task deleted" });
    }
    catch (error) {
        response.status(500).json({ status: "error", message: error.message });
    }
});


module.exports = router;