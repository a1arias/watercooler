var http = require('http')
  , fs = require('fs')
  , path = require('path')
  , mongoose = require('mongoose')
  , debug = require('debug')('watercooler:web-server:server')
;

mongoose.connect('mongodb://localhost/watercooler');
var db = mongoose.connection;

var modelsPath = __dirname + '/../models';

db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', function callback(){

  fs.readdirSync(modelsPath).forEach(function cb(file){
    if(file.indexOf('.js') >= 0 && path.extname(file) == '.js'){
      debug('loading model: ' + file);
      require(modelsPath + '/' + file);
    }
  });

  var app = require('../app');
  app.set('port', process.env.PORT || 3000);

  var server = http.createServer(app);
  var io = require('socket.io')(server);
  var Quote = mongoose.model('Quote');

  io.on('connection', function(socket){
    debug('socket connected');
  });

  server.listen(app.get('port'), function() {
    debug('Express server listening on port ' + server.address().port);
    
    setInterval(function cb(){
      Quote.random(function(err, quote){
        io.emit('timeout', quote);
      });
    }, 5000);

  });
});

