import React from 'react';
import style from './LoginWindow.module.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import logo_login from '../../../img/logo_login.svg';

const LoginWindow = (props) => {
  return (<>
    {props.isLoggedIn ? (
      <Redirect to="/map" />
    ) : (
      <div className={style.wrapper}>
        <div className={style.inner}>
          <div className={style.innerLeft}>
            <div className={style.logoContainer}>
              <img className={style.logoImg} src={logo_login} alt="logo img" />
            </div>
          </div>
          <div className={style.innerRight}>
            <div className={style.login}>
              {props.children}
            </div>
          </div>
        </div>
      </div>
    )}
  </>
  );
};

export const LoginWindowWithAuth = connect(
  (state) => ({ isLoggedIn: state.auth.isLoggedIn }),
  {}
)(LoginWindow);