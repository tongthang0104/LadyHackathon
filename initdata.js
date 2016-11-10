const fs = require('fs');
const Model = require('./models');

Model.Words.remove({}, () => {
  fs.readFile('./words.json', 'utf8', function(err, data){
    if(err) throw err;
    var obj = JSON.parse(data);
    console.log(data);
    const addWords = new Model.Words(obj);
    addWords.save(() => {
      process.exit();
    });
  });
});
