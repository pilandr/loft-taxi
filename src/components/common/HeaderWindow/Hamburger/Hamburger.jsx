import style from './Hamburger.module.css';

const Hamburger = ({ isOpen }) => {
  return (
    <>
      <div className={style.hamburger}>
        <div className={`${style.burger} ${style.burger1} ${isOpen ? style.burgerOpen : ''}`} />
        <div className={`${style.burger} ${style.burger2} ${isOpen ? style.burgerOpen : ''}`} />
        <div className={`${style.burger} ${style.burger3} ${isOpen ? style.burgerOpen : ''}`} />
      </div>
    </>
  );
};

export default Hamburger;