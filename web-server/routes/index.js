var express = require('express')
  , router = express.Router()
  , mongoose = require('mongoose')
  , Quote = mongoose.model('Quote')
;

/* GET home page. */
router.get('/', function(req, res) {
  Quote.random(function cb(err, quote){
    res.render('index', {
      title: 'Watercooler',
      quote: quote
     });
  });
});

module.exports = router;
