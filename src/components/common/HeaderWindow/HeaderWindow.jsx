import React, { useState } from 'react';
import style from './HeaderWindow.module.css';
import Logo from '../Logo/Logo';
import { connect } from 'react-redux';
import { logOutSaga } from '../../../store/actions';
import NavMenu from './NavMenu/NavMenu';
import Hamburger from './Hamburger/Hamburger';

const HeaderWindow = (props) => {

  const [hamburgerOpen, setHamburgerOpen] = useState(false);

  const onLogout = () => {
    props.logOutSaga();
  };

  const toggleHamburger = () => {
    setHamburgerOpen(!hamburgerOpen);
  };

  return (<>
    <div className={style.wrapper}>
      {props.isLoggedIn ? (
        <header className={style.header}>
          <Logo />
          <nav className={style.nav}>
            <div className={style.hamburger} onClick={toggleHamburger}>
              <Hamburger isOpen={hamburgerOpen} />
            </div>
            <div className={style.navMenu}>
              <NavMenu onLogout={onLogout} />
            </div>

          </nav>
        </header>
      ) : (null)}

      <main>
        {hamburgerOpen ?
          <NavMenu onLogout={onLogout} closeBurger = {toggleHamburger} /> :
          <section>
            {props.children}
          </section>
        }

      </main>
    </div>
  </>
  );
};

export default connect(
  state => ({ isLoggedIn: state.auth.isLoggedIn }),
  { logOutSaga }
)(HeaderWindow);
