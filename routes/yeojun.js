const express = require("express");
const router = express.Router();
const path = require("path")

router.get("/idea", (req,res) => {
    res.sendFile(path.join(__dirname, "../views/Bought_Idea_Page_Test-main/index.html"));

});

router.get("/review", (req,res) => {
    res.sendFile(path.join(__dirname, "../views/Bought_Idea_Page_Test-main/index.html"));
});

router.get("/mail", (req,res) => {
    res.sendFile(path.join(__dirname, "../views/Bought_Idea_Page_Test-main/index.html"));
});

router.get("/report", (req,res) => {
    res.sendFile(path.join(__dirname, "../views/Bought_Idea_Page_Test-main/index.html"));
});

router.get("/point", (req,res) => {
    res.sendFile(path.join(__dirname, "../views/Bought_Idea_Page_Test-main/index.html"));
});

router.get("/purchase", (req,res) => {
    res.sendFile(path.join(__dirname, "../views/Bought_Idea_Page_Test-main/index.html"));
});



module.exports = router;