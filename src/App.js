import React from 'react';
import './App.css';
import { MapStore as Map } from './Map';
import { LoginWithAuth } from './Login';
import { ProfileWithAuth } from './Profile';
import { RegisterWithAuth } from './Register';
import { PrivateRoute } from './PrivateRoute';
import logo from './img/logo.png'
import { connect } from 'react-redux';
import { logOut } from './actions';
import { Link, Switch, Route } from 'react-router-dom';

class App extends React.Component {

  onLogout = () => {
    this.props.logOut();
  }

  render() {
    return ( <>
      <div className="app-wrapper">
        { this.props.isLoggedIn ? (
          <header className="header">
          <div className="logo">
            <img className="logo__pic" src={logo} alt={"logo"}/> 
          </div>
          <nav className="nav">
            <ul className="nav__list">
              <li className="nav__item">
                <Link className="nav__btn" to="/map">Карта</Link>
              </li>
              <li className="nav__item">
                <Link className="nav__btn" to="/profile">Профиль</Link>
              </li>
              <li className="nav__item">
                <Link className="nav__btn" onClick = {this.onLogout} to="/">Выйти</Link>
              </li>
            </ul>
          </nav>
        </header>
        ) : (null)}
        
        <main>
          <section> 
            <Switch>
              <Route exact path="/" component={LoginWithAuth} />
              <Route exact path="/register" component={RegisterWithAuth} />
              <PrivateRoute path="/map" component={Map} />
              <PrivateRoute path="/profile" component={ProfileWithAuth} />
            </Switch>
          </section>
        </main>
      </div>
      </>
    );
  }
  
}

export default connect(
  state => ({ isLoggedIn: state.auth.isLoggedIn }),
  { logOut }
)(App);
