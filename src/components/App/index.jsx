import React from 'react';
import './App.css';
import { MapStore as Map } from '../Map/Map';
import { LoginWithAuth } from '../Login/Login';
import { ProfileWithAuth } from '../Profile/Profile';
import { RegisterWithAuth } from '../Register/Register';
import { PrivateRoute } from '../common/PrivateRoute/PrivateRoute';
import { Switch, Route } from 'react-router-dom';
import HeaderWindow from '../common/HeaderWindow/HeaderWindow';

const App = (props) => {

  return <>
    <HeaderWindow>
      <Switch>
        <Route exact path="/" component={LoginWithAuth} />
        <Route exact path="/register" component={RegisterWithAuth} />
        <PrivateRoute path="/map" component={Map} />
        <PrivateRoute path="/profile" component={ProfileWithAuth} />
      </Switch>
    </HeaderWindow>
  </>;
};

export default App;
