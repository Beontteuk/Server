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

// app.use('/team', require('./routes/team.js'))

http.listen(port, () => {
  console.log(`server listening on *:${port}`)
})
console.log("------- server is running -------");

