var mongoose = require('mongoose');

var quoteSchema = mongoose.Schema({
  phrase: String,
  createDate: Date,
  contributor: String
});

quoteSchema.statics.random = function(callback) {
  this.count(function(err, count) {
    if (err) {
      return callback(err);
    }
    var rand = Math.floor(Math.random() * count);
    this.findOne().skip(rand).exec(callback);
  }.bind(this));
};

var Quote = mongoose.model('Quote', quoteSchema);
