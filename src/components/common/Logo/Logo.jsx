import React from 'react';
import style from './Logo.module.css';
import logo from '../../../img/logo.png';

const Logo = (props) => {

  return <>
    <div className={style.logo}>
      <img className={style.pic} src={logo} alt={'logo'} />
    </div>
  </>;
};

export default Logo;

