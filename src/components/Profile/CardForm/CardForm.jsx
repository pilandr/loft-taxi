import React from 'react';
import { connect } from 'react-redux';
import { saveCard } from '../../../store/actions';
import { Form, Field } from 'react-final-form';
import InputCard from './InputCard/InputCard';
import Card from './Card/Card';
import style from './CardForm.module.css';

const СardForm = (props) => {

  const onSubmit = (values, functions) => {
    const { name, number, date, cvc } = values;
    props.saveCard({
      cardName: name,
      cardNumber: number,
      expiryDate: date,
      cvc: cvc
    });
  };

  const validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = 'Заполните имя ';
    }

    if (!values.number) {
      errors.number = 'Заполните номер карты ';
    } else if (values.number.length < 19) {
      errors.number = 'Заполните номер карты 16 цифр';
    }

    if (!values.date) {
      errors.date = 'Заполните дату ';
    } else if (values.date.length > 4) {

      const month = values.date.substr(0, 2);
      const year = values.date.substr(3, 2);
      if (Number(month) > 12 || Number(month) < 1) errors.date = 'Некорректный месяц';
      else if (Number(year) < 21) errors.date = 'Некорректный год';
    }

    if (!values.cvc) {
      errors.cvc = 'Заполните CVC';
    } else if (values.cvc.length !== 3) {
      errors.cvc = 'CVC 3 цифры';
    }

    return errors;
  };

  const formatNumber = (value) => {
    if (value) {
      if ((!/^[0-9]+$/.test(value[value.length - 1]) && value[value.length - 1] !== ' ')) value = value.substr(0, value.length - 1);
      if (value[4] !== ' ' && value.length > 4) value = value.substr(0, 4) + ' ' + value.substr(4);
      if (value[9] !== ' ' && value.length > 9) value = value.substr(0, 9) + ' ' + value.substr(9);
      if (value[14] !== ' ' && value.length > 14) value = value.substr(0, 14) + ' ' + value.substr(14);
      if (value.length === 20) value = value.substr(0, value.length - 1);
      return value;
    }
  };

  const formatDate = (value) => {
    if (value) {
      if ((!/^[0-9]+$/.test(value[value.length - 1]) && value[value.length - 1] !== ' ')) value = value.substr(0, value.length - 1);
      if (value[2] !== '/' && value.length > 2) value = value.substr(0, 2) + '/' + value.substr(2);
      if (value.length === 6) value = value.substr(0, value.length - 1);
      return value;
    }
  };

  const formatCVC = (value) => {
    if (value) {
      if ((!/^[0-9]+$/.test(value[value.length - 1]) && value[value.length - 1] !== ' ')) value = value.substr(0, value.length - 1);
      if (value.length === 4) value = value.substr(0, value.length - 1);
      return value;
    }
  };

  return <>
    <Form
      onSubmit={onSubmit}
      initialValues={{ cvc: props.card.cvc, number: props.card.cardNumber, name: props.card.cardName, date: props.card.expiryDate }}
      validate={validate}
      render={({ handleSubmit, pristine, invalid, values }) => (
        <form className={style.formProfile} onSubmit={handleSubmit}>
          <div className={style.title}>Профиль</div>
          <div className={style.titleText}>Введите платежные данные</div>
          <div className={style.body}>
            <div className={style.left}>
              <Field classNameInput={style.input} id="name" type="text" name="name" size="28" label="Имя владельца" component={InputCard} />
              <Field 
                classNameInput={style.input} 
                id="number" 
                type="text" 
                name="number" 
                size="28" 
                label="Номер карты" 
                format={formatNumber} 
                component={InputCard} 
              />
              <div className={style.row}>
                <div className={style.column}>
                  <Field 
                    classNameInput={`${style.input} ${style.inputRow}`} 
                    id="date" 
                    type="text" 
                    name="date" 
                    size="28" 
                    label="MM/YY" 
                    format={formatDate} 
                    component={InputCard} />
                </div>
                <div className={style.column}>
                  <Field 
                    classNameInput={`${style.input} ${style.inputRow}`} 
                    id="cvc" 
                    type="text" 
                    name="cvc" 
                    size="28" 
                    label="CVC" 
                    format={formatCVC} 
                    component={InputCard} 
                  />
                </div>
              </div>
            </div>
            <div className={style.right}>
              <Card date={formatDate(values.date)} number={formatNumber(values.number)} />
            </div>
          </div>
          <input className={style.submit} type="submit" value="Сохранить" />
        </form>
      )}
    />
  </>;
};

export default connect(
  (state) => ({ card: state.card.card }),
  { saveCard }
)(СardForm);