var express = require('express');
var router = express.Router();
var db = require('../lib/database.js');
const jwt = require('jsonwebtoken');
const SECRET_KEY = 'INEINE';

router.get('/', db.getUsers)

router.post('/test', db.logintest)

router.post('/signup', db.createUser)

router.post('/signin', db.signin)

router.post('/addqrlog', db.addQrcodelog)

router.post('/qrcounts', db.getQrCount)

router.post('/pleges', db.getPleges)
router.post('/addpleges', db.addPleges)

router.post('/myqrcodes', db.getMyQrcodes)

//router.post('/signin', db.signinProcess);

module.exports = router;