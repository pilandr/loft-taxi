import React from 'react';
import { Link } from 'react-router-dom';
import style from './NavMenu.module.css';


const NavMenu = (props) => {

  const onClickExit = () => {
    closeBurger();
    props.onLogout();
  };

  const closeBurger = () => {
    if (props.closeBurger) props.closeBurger();
  };

  return <>
    <nav className={style.nav}>
      <ul className={style.list}>
        <li className={style.item}>
          <Link className={style.btn} onClick={closeBurger} to="/map">Карта</Link>
        </li>
        <li className={style.item}>
          <Link className={style.btn} onClick={closeBurger} to="/profile">Профиль</Link>
        </li>
        <li className={style.item}>
          <Link className={style.btn} onClick={onClickExit} to="/">Выйти</Link>
        </li>
      </ul>
    </nav>
  </>;
};

export default NavMenu;
