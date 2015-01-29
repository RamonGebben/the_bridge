var express = require('express');
var request = require('request');
var app = express();
var exec = require('child_process').exec;

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  	res.send( 200 )
});

app.get('/terminal', function(req, res){
	exec('/usr/local/bin/node ./apps/terminal/app.js', function (error, stdout, stderr) {
	    res.json({'stdout': stdout, 'stderr':  stderr });
	    if (error !== null) {
	      res.json({'exec error': error});
	    }
	});
});

app.get('/projects', function( req, res ){
	request('http://rara:shift123@editor.devstar.ra-ge.net/sites.json', function (error, response, body) {
	  if (!error && response.statusCode == 200) {
	    res.json( JSON.parse( body ) );
	  }else {
	  	console.log( [error, response] );
	  }
	})
});

var server = app.listen(1337, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Listening at http://%s:%s', host, port)

});