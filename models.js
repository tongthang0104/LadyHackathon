const config = require('./config');
const mongoose = require('mongoose');
var q = require('q');
var Schema = mongoose.Schema;

mongoose.Promise = q.Promise; // NOTE: original mongoose.mpromise is deprecated

var WordsSchema = Schema({
  // category : { type : String, required :  false },
  words: [ { type: String, required: false } ]
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
});

var models = {
  Words: mongoose.model('Words', WordsSchema)
};

let did_crudify = false;
if (!did_crudify) {
  crudify_models();
  did_crudify = true;
}

module.exports = models;

function crudify_models() {

  mongoose.connection.on('connected', connected);
  mongoose.connection.on('disconnected', disconnected);
  mongoose.connection.on('error', error);
  mongoose.connection.once('open', ready);

  var db = mongoose.connect(config.mlab);
  var mlab = config.mlab;

  function ready() {
    console.log("mongoose ready!");
  }

  function connected() {
    console.log('OK', 'connected', 'mongoose server', mlab);
  }

  function disconnected() {
    console.log('OK', 'disconnected', 'mongoose server', mlab);
  }

  function error() {
    console.log('NO', 'error', 'mongoose server', mlab);
  }
}
