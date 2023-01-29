const express = require("express");
const router = express.Router();
const path = require("path")

router.get("/", (req,res) => {
    res.sendFile(path.join(__dirname, "../views/Bought_Idea_Page_Test-main/index.html"));
});


module.exports = router;