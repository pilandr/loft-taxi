import React from 'react';

import { ReactComponent as CardLogo } from '../../../../img/card_logo.svg';
import { ReactComponent as CardChip } from '../../../../img/card_chip.svg';
import { ReactComponent as CardMC } from '../../../../img/card_mc.svg';

import style from './Card.module.css';

const Сard = (props) => {

  return <>
    <div className={style.card}>
      <div className={style.row}>
        <CardLogo />
        <div className={style.date}>
          {props.date}
        </div>
      </div>
      <div className={`${style.row} ${style.rowNumber}`}>
        {props.number}
      </div>
      <div className={`${style.row} ${style.rowIcons}`}>
        <CardChip />
        <CardMC />
      </div>
    </div>
  </>;
};

export default Сard;