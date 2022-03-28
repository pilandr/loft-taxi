import React from "react";
import './Register.css';
import { connect } from 'react-redux';
import { register } from '../../store/actions';
import { Link, Redirect } from 'react-router-dom';
import { Form, Field } from "react-final-form";
import logo_login from '../../img/logo_login.svg'

const InputRegister = ({ input, meta, label, nameReg, typeReg, placeholder }) => {
  return (
    <>
      <label className="form__lbl" htmlFor={nameReg}>{label}</label>
      <input {...input} className="input input__register" id={nameReg} type={typeReg} name={nameReg} placeholder={placeholder} size="28" />
      {meta.error && meta.visited && !meta.active && (
        <pre className="input__error--email">{meta.error}</pre>
      )}
    </>
  );
};

class Register extends React.Component {

  onSubmit = (values, functions) => {
    console.log(values);
    const { email, password, username } = values;
    this.props.register(email, password, username);
  }

  validate = (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = "Заполните email ";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Некорректный email';
    }

    if (!values.password) {
      errors.password = "Заполните пароль ";
    }

    if (!values.username) {
      errors.username = "Заполните имя ";
    }
    return errors;
  }

  render() {
    return (<>
      {this.props.isLoggedIn ? (
        <Redirect to="/map" />
      ) : (
        <div className="login-wrapper">
          <div className="login-inner">
            <div className="login-inner__left">
              <div className="logo-container">
                <img className="logo-img" src={logo_login} alt="logo img" />
              </div>
            </div>
            <div className="login-inner__right">
              <div className="login">
                <Form
                  onSubmit={this.onSubmit}
                  validate={this.validate}
                  render={({ handleSubmit, pristine, invalid }) => (
                    <form className="form" onSubmit={handleSubmit}>
                      <div className="form__title">Регистрация</div>
                      <Field className="input" name="email" nameReg="email" typeReg="email" placeholder="mail@mail.ru" component={InputRegister} label="Email*" />
                      <Field name="username" nameReg="username" typeReg="text" placeholder="Петр Александрович" component={InputRegister} label="Как вас зовут?*" />
                      <Field name="password" nameReg="password" typeReg="password" placeholder="*************" component={InputRegister} label="Придумайте пароль*" />
                      <input className="form__submit" type="submit" value="Зарегистрироваться" />
                    </form>
                  )}
                />
                <div className="login__new">Уже зарегистрированы? <Link to="/" className="login__new-btn">Войти</Link></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
    );
  }

}

export const RegisterWithAuth = connect(
  (state) => ({ isLoggedIn: state.auth.isLoggedIn }),
  { register }
)(Register);