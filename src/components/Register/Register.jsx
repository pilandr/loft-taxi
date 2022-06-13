import React from 'react';
import { register } from '../../store/actions';
import { RegisterForm } from './RegisterForm/RegisterForm';
import { connect } from 'react-redux';
import { LoginWindowWithAuth } from '../common/LoginWindow/LoginWindow';


const Register = (props) => {

  return <>
    <LoginWindowWithAuth>
      {props.errorRegister && <div style={{ color: 'red' }}>{props.errorRegister}</div>}
      <RegisterForm register={props.register} />
    </LoginWindowWithAuth>
  </>;
};

export const RegisterWithAuth = connect(
  (state) => ({ errorRegister: state.auth.errorRegister }),
  { register }
)(Register);