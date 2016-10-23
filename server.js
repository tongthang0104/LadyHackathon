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
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
let callbackUrl = "";
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended: false});
const models = require("./models");
const morgan = require('morgan');

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
  app.use(morgan('combined'));
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('/api/highlight', getHighlight);
  app.get('/api/words', getWords);
  app.post('/api/words', postWords);
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });

  // callbackUrl = 'http://local.host:8080/api/youTube/auth/callback'
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

  // callbackUrl = `https://sozaic.herokuapp.com/api/youTube/auth/callback`
}

/*
passport.use(new GoogleStrategy({
    clientID: key.youtube.clientID ||  localApiKeys.youtube.youtubeClientID,
    clientSecret: key.youtube.clientSecret ||  localApiKeys.youtube.youtubeClientSecret,
    callbackURL: callbackUrl,
    passReqToCallback: true
  },

  function(request, accessToken, refreshToken, profile, cb) {
    // console.log('TOKEN', accessToken);
    cb(null, accessToken)
  })
);


appRoute.get('api/youTube/auth', passport.authenticate('google', {scope: [
  // TODO: LOOK UP GMAIL OPTION
  'https://www.googleapis.com/auth/youtube.readonly',
  'https://www.googleapis.com/auth/plus.login'
]}));

appRoute.get('api/youTube/auth/callback', passport.authenticate('google', {failureRedirect: '/'}),
  function(req, res) {
    req.session.google = req.session.passport.user;
    console.log("this is cookie", req.session)

    res.redirect('/#/feed/youtube')
  }
);
*/

app.listen(port, '0.0.0.0', function onStart(err) {
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
    url: config.url,
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
  console.log(req);
  models.Words.findOneAndUpdate({}, {words: req.body.newWords}
   ).then(() => {
      res.status(200).json({'andrew': 'hey lady'});
    });
}
