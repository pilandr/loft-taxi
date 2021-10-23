import React from 'react';
import './App.css';
import { Map } from './Map';
import { LoginWithAuth } from './Login';
import { ProfileWithAuth } from './Profile';
import Register from './Register';
import logo from './logo.png'
import { withAuth } from './AuthContext';


const PAGES = {
  map: Map,
  login: LoginWithAuth,
  profile: ProfileWithAuth,
  register: Register
}

class App extends React.Component {

  state = { currentPage: "login"}

  navigateTo = (page) => {
    if (this.props.isLoggedIn || page === "register") {
      this.setState({ currentPage: page })
    }else {
      this.setState({ currentPage: "login" })
    }
  }

  onLogout = () => {
    this.props.logOut();
    this.navigateTo("login");
  }

  render() {

    const Page = PAGES[this.state.currentPage];

    return ( <>
      <div className="app-wrapper">
        <header className="header">
          <div className="logo">
            <img className="logo__pic" src={logo} alt={"logo"}/> 
          </div>
          <nav className="nav">
            <ul className="nav__list">
              <li className="nav__item">
                <button className="nav__btn" onClick = {() => {this.navigateTo("map")}}>Карта</button>
              </li>
              <li className="nav__item">
              <button className="nav__btn" onClick = {() => {this.navigateTo("profile")}}>Профиль</button>
              </li>
              <li className="nav__item">
                <button className="nav__btn" onClick = {this.onLogout}>Выйти</button>
              </li>
            </ul>
          </nav>
        </header>
        <main>
          <section> 
            <Page setPage={this.navigateTo} />
          </section>
        </main>
      </div>
      </>
    );
  }
  
}

export default withAuth(App);
