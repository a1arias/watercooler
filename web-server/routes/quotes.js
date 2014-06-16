var express = require('express')
  , router = express.Router()
  , mongoose = require('mongoose')
  , Quote = mongoose.model('Quote')
  , debug = require('debug')('watercooler:routes:quotes')
;

/* GET /users */
router.get('/', function(req, res) {
  Quote.find({}, function(err, quotes){
    res.format({
      text: function(){
        debug("plain text representation requested")
        res.send(quotes);
      },
      json: function(){
        debug("json representation requested")
        res.json(quotes);
      },
      html: function(){
        debug("html representation requested")
        res.render('quotes', {
          title: 'Watercooler Quotes',
          quotes: quotes
        });
      }
    });
  });
});

module.exports = router;
