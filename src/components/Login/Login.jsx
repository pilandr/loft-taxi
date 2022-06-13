import React from 'react';
import { connect } from 'react-redux';
import { authenticate } from '../../store/actions';
import { LoginForm } from './LoginForm/LoginForm';
import { LoginWindowWithAuth } from '../common/LoginWindow/LoginWindow';


const Login = (props) => {

  return <>
    <LoginWindowWithAuth>
      <div>Логин: testmail@mail.com</div>
      <div>Пароль: 12345</div>
      {props.errorPassword && <div style={{ color: 'red' }}>{'Неверный логин или пароль'}</div>}
      <LoginForm authenticate={props.authenticate} />
    </LoginWindowWithAuth>
  </>;
};

export const LoginWithAuth = connect(
  (state) => ({ isLoggedIn: state.auth.isLoggedIn, errorPassword: state.auth.errorPassword }),
  { authenticate }
)(Login);