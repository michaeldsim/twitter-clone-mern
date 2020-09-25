import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'

// Pages
import {Home} from './pages/Home'
import {PageNotFound} from './pages/PageNotFound'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={SignIn} />
        <Route exact path='/register' component={SignUp} />
        <Route exact path='/404' component={PageNotFound} status={404} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
}

export default App;
