import React from "react";
import './Login.css';
import { connect } from 'react-redux';
import { authenticate } from '../../store/actions'
import { Link, Redirect } from 'react-router-dom';
import { Form, Field } from "react-final-form";
import logo_login from '../../img/logo_login.svg'


const InputEmail = ({ input, meta, label }) => {
  return (
    <>
      <label className="form__email-lbl" htmlFor="email">{label}</label>
      <input {...input} className="input" id="email" type="email" name="email" placeholder="mail@mail.ru" size="28" />
      {meta.error && meta.visited && !meta.active && (
        <pre className="input__error--email">{meta.error}</pre>
      )}
    </>
  );
};

const InputPassword = ({ input, meta, label }) => {
  return (
    <>
      <label className="form__pass-lbl" htmlFor="password">{label}</label>
      <input {...input} className="input" id="password" type="password" name="password" placeholder="*************" size="28" />
      {meta.error && meta.visited && !meta.active && (
        <pre className="input__error--password">{meta.error}</pre>
      )}
    </>
  );
};
const InputSubmit = ({ input, meta, label }) => {
  return (
    <>
      <input {...input} className="form__submit" type="submit" value="Войти" />
    </>
  );
};


class Login extends React.Component {

  onSubmit = (values, functions) => {
    const { email, password } = values;
    this.props.authenticate(email, password);
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
    return errors;
  }

  componentDidMount() {

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
                <div>Логин: testmail@mail.com</div>
                <div>Пароль: 12345</div>
              
                <Form
                  onSubmit={this.onSubmit}
                  validate={this.validate}
                  render={({ handleSubmit, pristine, invalid }) => (
                    <form className="form" onSubmit={handleSubmit}>
                      <div className="form__title">Войти</div>
                      <Field name="email" label="Email" component={InputEmail} />
                      <Field name="password" label="Пароль" component={InputPassword} />
                      {/* <div className="form__forget-pass">Забыли пароль?</div> */}
                      <Field name="submit" component={InputSubmit} />
                      { this.props.errorPassword && <div className="input__error--password">Неверный логин или пароль</div>}
                    </form>
                  )}
                />
                <div className="login__new">Новый пользователь? <Link to="/register" className="login__new-btn">Регистрация</Link></div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
    );
  }
}

export const LoginWithAuth = connect(
  (state) => ({ isLoggedIn: state.auth.isLoggedIn, errorPassword: state.auth.errorPassword }),
  { authenticate }
)(Login);