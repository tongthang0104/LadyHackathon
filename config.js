
const config = {
  url : `https://api.havenondemand.com/1/api/async/`,
  API_KEY : "e5b8af7d-df82-498c-9f64-711f7ea74b98",
  mlocal : 'mongodb://localhost:27017/ladyproblem',
  mlab : 'mongodb://hello:hello@ds063946.mlab.com:63946/ladyproblem'
};

if (process.argv.includes('--mlocal')) {
  config.mlab = config.mlocal;
}

module.exports = config;
