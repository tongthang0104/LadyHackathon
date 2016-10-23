
import React from 'react';
import { Route, Router, browserHistory} from 'react-router';
import App from './components/app';
import Dictionary from './components/dictionary';

export default (
 <Router history={browserHistory}>
  <Route path="/" component={App} />
  <Route path="/add" component={Dictionary} />
 </Router>
);
