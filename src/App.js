import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import thunk from 'redux-thunk'

// Pages
import {Home} from './pages/Home'
import {PageNotFound} from './pages/PageNotFound'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import './App.css';

import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import allReducer from './reducers'
import { loadUser } from './actions/authActions'

const middleware = [thunk]
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(allReducer, composeEnhancers(applyMiddleware(...middleware)))

class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser())
  }

  render() {
    return(
    <Provider store={store}>
    <Router>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={SignIn} />
        <Route exact path='/register' component={SignUp} />
        <Route exact path='/404' component={PageNotFound} status={404} />
        <Redirect to="/404" />
      </Switch>
    </Router>
    </Provider>
    )  
}
}

export default App;
