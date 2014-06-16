var debug = require('debug')('watercooler:csv2mongo')
  , mongoose = require('mongoose')
  , fs = require('fs')
  , path = require('path')
  , csv = require('fast-csv')
  ;

var argsLength = process.argv.length;
var modelsPath = __dirname + '/../models';

mongoose.connect('mongodb://localhost/watercooler');

if(argsLength != 3){
  process.stdout.write('invalid parameters\n')
  process.exit(1);
}

var csvFile = process.argv[2];

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', function callback(){

  // read models dir and require models.
  fs.readdirSync(modelsPath).forEach(function cb(file){
    if(file.indexOf('.js') >= 0 && path.extname(file) == '.js'){
      debug('loading model: ' + file);
      require(modelsPath + '/' + file);
    }
  });

  // read csv
  var stat = fs.statSync(csvFile);
  if(!stat){
    process.stdout.write('specified file does not exist: ' + csvFile);
    process.exit(2);
  };
  process.stdout.write('Processing file: ' + csvFile + '\n');
  debugger;

  var Quote = mongoose.model('Quote')
    , fsStream = fs.createReadStream(csvFile)
    ;

  csv.fromStream(fsStream)
  .on('record', function(data){
     console.log(data);
    // store line in mongo
    var quote = new Quote({
      phrase: data[1],
      contributor: data[2],
      createDate: data[3]
    });
    quote.save(function(err, q){
      if(err) console.error(err);
    });
  })
  .on('end', function(){
     console.log('done');
     process.stdout.write('Completed processing ' + csvFile + '\n');
     process.exit(0);
  });
});

