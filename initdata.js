const fs = require('fs');
const Model = require('./models');

var obj;
fs.readFile('./words.json', 'utf8', function(err, data){
  if(err) throw err;
  obj = JSON.parse(data);
  console.log(data);
  const addWords = new Model.words(obj);
  addWords.save();
});
