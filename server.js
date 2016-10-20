var express = require ('express')
var fs = require('fs')
var path = require('path')

var app = express();


app.listen(3000, function() {
	console.log('listening on port 3000')
});

app.get('/', function(req, res) {
	res.status(200).sendFile(path.join((__dirname + '/Build/index.html')))

app.get('/map.js', function(req, res) {
	res.status(200).sendFile(path.join((__dirname + '/Build/map.js')))
})

app.get('/stylesheet.css', function(req, res) {
	res.status(200).sendFile(path.join((__dirname + '/Build/stylesheet.css')))
})

});