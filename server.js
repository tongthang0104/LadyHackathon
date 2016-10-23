/* eslint no-console: 0 */

const path = require('path');
const express = require('express');
const webpack = require('webpack');
const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config.js');
const axios = require('axios')
const isDeveloping = process.env.NODE_ENV !== 'production';
const port = isDeveloping ? 3000 : process.env.PORT;
const app = express();
const url = `https://api.havenondemand.com/1/api/async/`
const API_KEY = require('./config').API;
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuthStrategy;
let callbackUrl = "";

if (isDeveloping) {
  const compiler = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath: config.output.publicPath,
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

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });

  callbackUrl = 'http://local.host:8080/api/youTube/auth/callback'
} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });

  callbackUrl = `https://sozaic.herokuapp.com/api/youTube/auth/callback`
}

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

app.get('/api/highlight', function(req, res) {
  const text = req.body;
  const highlightWord = 'sex'
  axios({
    method: 'GET',
    url: url,
    params: {
      apikey: API_KEY,
      text: text,
      highlight_expression: highlightWord
    }
  });
});


app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
