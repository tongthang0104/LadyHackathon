/*global  */
/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const webpackConfig = require('./webpack.config.js');
const axios = require('axios')
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();
const config = require('./config');
const url = `https://api.havenondemand.com/1/api/sync/highlighttext/v1`;
const sentimentUrl = `https://api.havenondemand.com/1/api/sync/analyzesentiment/v2`;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended: false});
const models = require("./models");
const morgan = require('morgan');

let words = models.Words.findOne({}).then((data) => {
  words = data.words.join(",").toLowerCase();
});


if (isDeveloping) {
  const compiler = webpack(webpackConfig);
  const middleware = webpackMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    contentBase: 'src',
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  });
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(morgan('dev'));
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('/api/highlight', getHighlight);
  app.get('/api/words', getWords);
  app.post('/api/words', postWords);
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(morgan('combined'));
  app.use(express.static(__dirname + '/dist'));
  app.get('/api/highlight', getHighlight);
  app.get('/api/words', getWords);
  app.post('/api/words', postWords);
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}


function getHighlightedText(text, filterWords){

  return axios({
    method: 'GET',
    url: url,
    params: {
      text: text,
      highlight_expression: filterWords,
      apikey: config.API_KEY
    }
  })
}

function getSentiment(text){
  return axios({
    method: 'GET',
    url: sentimentUrl,
    params: {
      text: text,
      apikey: config.API_KEY
    }
  })
}


app.post('/api/highlight', jsonParser, function (req, res) {
  const text = req.body.userEmail;
  models.Words.findOne({}).then((highlightWord) => {
    highlightWord = highlightWord.words.join(",");
    return axios.all([getHighlightedText(text, highlightWord), getSentiment(text)])
  })
  .then(axios.spread(function(highlight, sentiment) {
    let changedEmail = highlight.data;
    let emailSentiment = sentiment.data;
    res.status(200).json({changedEmail, emailSentiment});
  }))
  .catch(error => console.log(error));
});


app.listen(port, '127.0.0.1', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});


// functions

function getHighlight(req, res) {
  const text = req.body;
  const highlightWord = 'sex'
  axios({
    method: 'GET',
    url: url,
    params: {
      apikey: config.API_KEY,
      text: text,
      highlight_expression: highlightWord
    }
  });
}

function getWords(req, res) {
  models.Words.findOne({}).then((result) => {
    res.status(200).json(result);
  });
}

function postWords(req, res) {
  // console.log(req);
  const newWords = req.body.newWords;
  models.Words.findOneAndUpdate({}, {words: newWords}
   ).then((result) => {
      res.status(200).json(newWords);
    });
}
