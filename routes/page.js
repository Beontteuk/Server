const express = require("express");
const router = express.Router();
const path = require("path")
const db = require('../lib/database')

router.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "../views/api.html"));
});


module.exports = router;