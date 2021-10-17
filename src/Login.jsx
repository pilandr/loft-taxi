import React from "react";
import './Login.css';
import { withAuth } from './AuthContext'
import PropTypes from "prop-types";

class Login extends React.Component {
  static propTypes = {
    setPage: PropTypes.func
  }
  
  onLogin = (e) => {
    e.preventDefault();
    const { email, password } = e.target;
    this.props.logIn(email.value, password.value);
  }

  onReg = () => {
    this.props.setPage("register");
  }

  render() {
    if (this.props.isLoggedIn) {
      this.props.setPage("map");
    }
    return ( <>
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
          <div className="login__new">Новый пользователь? <button onClick={this.onReg} className="login__new-btn">Регистрация</button></div>
        </div>
      </div>
      
    </>
    );
  }
}

export const LoginWithAuth = withAuth(Login);