import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  browserHistory as history
} from 'react-router-dom';
import AppContainer from './containers/AppContainer';

function Routes() {
  return (
    <Router history={history}>
      <Route path="/" component={AppContainer} />
    </Router>
  );
}

export default Routes;
