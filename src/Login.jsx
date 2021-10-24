import React from "react";
import './Login.css';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { authenticate } from './actions'
import { Link, Redirect } from 'react-router-dom';

class Login extends React.Component {
  static propTypes = {
    setPage: PropTypes.func
  }
  
  onLogin = (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    this.props.authenticate(email.value, password.value);
  }

  // onReg = () => {
  //   this.props.setPage("register");
  // }

  render() {
    // if (this.props.isLoggedIn) {
    //   this.props.setPage("map");
    // }
    return ( <>
      {this.props.isLoggedIn ? (
        <Redirect to="/map" />
        ) : (
          <div className="login-wrapper">
            <div className="login">
              <form className="form" onSubmit={this.onLogin}>
                <div className="form__title">Войти</div>
                <label className="form__email-lbl" htmlFor="email">Email</label>
                <input className="input" id="email" type="email" name="email" placeholder="mail@mail.ru" size="28" />
                <label className="form__pass-lbl" htmlFor="password">Пароль</label>
                <input className="input" id="password" type="password" name="password" placeholder="*************" size="28" />
                <div className="form__forget-pass">Забыли пароль?</div>
                <input className="form__submit" type="submit" value="Войти" />
              </form>
              <div className="login__new">Новый пользователь? <Link to="/register" className="login__new-btn">Регистрация</Link></div>
            </div>
          </div>
        )}
    </>
    );
  }
}

export const LoginWithAuth = connect(
  (state) => ({ isLoggedIn: state.auth.isLoggedIn}),
  { authenticate }
)(Login);