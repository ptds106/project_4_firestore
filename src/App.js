import React, { Component } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import NavBar from './components/NavBar';
import SignUp from './components/SignUp';
import Communications from './components/Communications';
import SelfCheck from './components/SelfCheck';
import PasswordForgetForm from './components/PasswordForget';
import Country from './components/Countries'
import CountryList from './components/CountryList'
import Map from './components/Map'

import './App.css';

class App extends Component {
  state = {
    currentUser: {},
    isLoggedIn: false,

  }
  doSetCurrentUser = currentUser => {
    this.setState({
      currentUser,
      isLoggedIn: currentUser ? true : false,
    })
  }

  loginUser = currentUser => {
    this.setState({
      currentUser,
      isLoggedIn: true,
    })
  }



  render() {
    const { isLoggedIn,
      currentUser
    } = this.state

    return (
      <div className="App">
               <BrowserRouter>
        <NavBar isLoggedIn={isLoggedIn} currentUser={currentUser} doSetCurrentUser={this.doSetCurrentUser} />
 
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/map' component={Map} />
          <Route exact path='/login' render={() => (<Login loginUser={this.loginUser} />)} />
          <Route exact path='/signup' render={() => (<SignUp doSetCurrentUser={this.doSetCurrentUser} />)} />
          <Route exact path='/password-forget' component={PasswordForgetForm}/>
          <Route exact path='/countrylist' component={CountryList} />
          <Route exact path='/communication' component={Communications} />
          <Route exact path='/selfcheck' component={SelfCheck} />
          <Route exact path='/:id' component={Country} />

        </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
