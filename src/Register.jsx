import React from "react";
import './Register.css';
import { connect } from 'react-redux';
import { register } from './actions';
import { Link, Redirect } from 'react-router-dom';

class Register extends React.Component {

  onReg = (e) => {
    e.preventDefault();
    const { email, password, name } = e.target;
    this.props.register(email.value, password.value, name.value);
  }

  render() {
    return ( <>
    {this.props.isLoggedIn ? (
        <Redirect to="/map" />
        ) : (
              <div className="login-wrapper">
                <div className="login">
                  <form className="form" onSubmit={this.onReg}>
                    <div className="form__title">Регистрация</div>
                    <label className="form__lbl" htmlFor="email">Email*</label>
                    <input className="input" id="email" type="email" name="email" placeholder="mail@mail.ru" size="28" />
                    <label className="form__lbl" htmlFor="username">Как вас зовут?*</label>
                    <input className="input" id="username" type="text" name="name" placeholder="Петр Александрович" size="60" />
                    <label className="form__lbl" htmlFor="password">Придумайте пароль*</label>
                    <input className="input" id="password" type="password" name="password" placeholder="*************" size="28" />
                    <input className="form__submit" type="submit" value="Зарегистрироваться" />
                  </form>
                  <div className="login__new">Уже зарегистрированы? <Link to="/" className="login__new-btn">Войти</Link></div>
                </div>
              </div>
            )}        
      </>
    );
  }
  
}

export const RegisterWithAuth = connect(
  (state) => ({ isLoggedIn: state.auth.isLoggedIn}),
  { register }
)(Register);