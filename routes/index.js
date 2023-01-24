var express = require('express');
var router = express.Router();
var db = require('../lib/database.js');


router.get('/', function(req, res){
    res.sendFile(__dirname + "/api.html");
})


//router.get('/users', db.getUsers)
router.get('/qrcodes', db.getQrcodes)
router.get('/qrcodelogs', db.getQrcodelogs)

//router.get('/createmessage', db.createMessage);

module.exports = router;