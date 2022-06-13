import React, { useEffect } from 'react';
import style from './Profile.module.css';
import { connect } from 'react-redux';
import { cardUpdatedToFalse } from '../../store/actions';
import { Link } from 'react-router-dom';
import CardForm from './CardForm/CardForm';


const Profile = (props) => {


  useEffect(() => {
    props.cardUpdatedToFalse();
    // eslint-disable-next-line
  },[])

  return (<>
    <div className={style.wrapper}>
      {props.cardUpdated ? (
        <div className={`${style.profile} ${style.profileUpdated}`}>
          <div className={style.titleUpdated}>Профиль</div>
          <div className={style.subtitileUpdated}>Платёжные данные обновлены. Теперь вы можете заказывать такси.</div>
          <Link className={`${style.btnUpdated} ${style.submit}`} to="/map">Перейти на карту</Link>
        </div>
      ) : (
        <div className={style.profile}>
          <CardForm />
        </div>
      )}
    </div>
  </>
  );
};

export const ProfileWithAuth = connect(
  (state) => ({ cardUpdated: state.card.card.updated }),
  { cardUpdatedToFalse }
)(Profile);