import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCard, addressList, getRouteSaga, notRoute } from '../../../store/actions';
import dot from '../../../img/order_dot.png';
import arrow from '../../../img/order_arrow.png';
import style from './Order.module.css';

const Order = (props) => {

  const [address1, setAddress1] = useState(props.addresses);
  const [address2, setAddress2] = useState(props.addresses);

  useEffect(() => {
    props.getCard();
    props.addressList();
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    const setDefaultInputs = () => {
      if (!props.routes && props.addresses.length > 1) {
        setAddress1(props.addresses.map(address => address));
        setAddress2(props.addresses.filter((address, ind) => {
          if (ind === 0) return false;
          return true;
        }));

      }
    };

    setDefaultInputs();
    // eslint-disable-next-line
  }, [props.routes, props.addresses])

  const onOrder = (e) => {
    e.preventDefault();
    const { address1, address2 } = e.target;
    props.getRouteSaga(address1.value, address2.value, props.onOrder);
  };

  const onClickNextOrder = (e) => {
    props.notRoute();
    props.onClickNextOrder();
  };

  const onChangeAddress1 = (e) => {
    setAddress2(props.addresses.filter((address) => {
      if (address !== e.target.value) return true;
      return false;
    }));
  };

  const onChangeAddress2 = (e) => {
    setAddress1(props.addresses.filter((address) => {
      if (address !== e.target.value) return true;
      return false;
    }));
  };

  return <>
    {props.card.cvc === undefined || props.card.cardNumber === undefined || props.card.expiryDate === undefined ? (
      <div className={`${style.order} ${style.end}`}>
        <div className={style.title}>Платежные данные не заполнены</div>
        <Link className={style.btn} to="/profile">Перейти в профиль</Link>
      </div>
    ) : (
      props.routes ? (
        <div className={`${style.order} ${style.end}`}>
          <div className={`${style.title} ${style.titleEnd}`}>Заказ размещен</div>
          <div className={style.text}>Ваше такси уже едет к вам. Прибудет приблизительно через 10 минут.</div>
          <button className={`${style.btn} ${style.btnEnd}`} onClick={onClickNextOrder}>Сделать новый заказ</button>
        </div>
      ) : (
        <div className={style.order}>
          <form className={style.form} onSubmit={onOrder}>
            <div className={style.row}>
              <img className={style.img} src={dot} alt="dot" />
              <select className={style.select} name="address1" onChange={onChangeAddress1} >
                {address1?.map(address => (
                  <option className={style.selectItem1} key={address} value={address}>{address}</option>
                ))}
              </select>
            </div>
            <div className={style.row}>
              <img className={style.img} src={arrow} alt="dot" />
              <select className={style.select} name="address2" onChange={onChangeAddress2} >
                {address2?.map(address => (
                  <option className={style.selectItem2} key={address} value={address}>{address}</option>
                ))}
              </select>
            </div>
            <div className={style.area}>
              <input className={style.submit} type="submit" value="Заказать" />
            </div>
          </form>
        </div>
      )

    )}
  </>;
};

export default connect(
  (state) => ({ isLoggedIn: state.auth.isLoggedIn, card: state.card.card, addresses: state.address.addresses, routes: state.route.routes }),
  { getCard, addressList, getRouteSaga, notRoute }
)(Order);
