import React from 'react';
import './App.css';
import { Map } from './Map';
import Login from './Login';
import { Profile } from './Profile';
import Register from './Register';
import logo from './logo.png'



const PAGES = {
  map: Map,
  login: Login,
  profile: Profile,
  register: Register
}

class App extends React.Component {

  state = { currentPage: "map"}

  navigateTo = (page) => {
    this.setState({ currentPage: page })
  }

  render() {

    const Page = PAGES[this.state.currentPage];

    return ( <>
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
              <button className="nav__btn" onClick = {() => {this.navigateTo("login")}}>Логин</button>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <section> 
          <Page setPage={this.navigateTo} />
        </section>
      </main>
      </>
    );
  }
  
}

export default App;
