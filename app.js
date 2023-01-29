const express = require('express')
const app = express()
var http     = require('http').Server(app);// create a http web server using the http library
const port = 8080


var cors = require('cors');
app.use(cors())

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true }));
app.use(express.json());


app.use(express.static(__dirname + "/"));
app.use('/style', express.static(__dirname + '/stylesheets'))
app.use('/images', express.static(__dirname + '/images'))

app.use('/', require('./routes/page.js'))
app.use('/data', require('./routes/data.js'))
app.use('/account', require('./routes/account.js'))
app.use('/idea', require('./routes/idea.js'))
app.use('/collection', require('./routes/collection.js'))
app.use('/trade', require('./routes/trade.js'))
app.use('/review', require('./routes/review.js'))
app.use('/userinfo', require('./routes/userinfo.js'))
app.use('/mail', require('./routes/mail.js'))
app.use('/upload', require('./routes/upload.js'))
app.use('/search', require('./routes/search.js'))

http.listen(port, () => {
  console.log(`server listening on *:${port}`)
})
console.log("------- server is running -------");