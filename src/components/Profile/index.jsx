import React from "react";
import './Profile.css';
import { connect } from "react-redux";
import { saveCard, cardUpdatedToFalse } from "../../store/actions";
import { Link } from 'react-router-dom';
import { ReactComponent as CardLogo } from "../../img/card_logo.svg";
import { ReactComponent as CardChip } from "../../img/card_chip.svg";
import { ReactComponent as CardMC } from "../../img/card_mc.svg";
import { Form, Field } from "react-final-form";


const InputCard = ({ input, meta, label, id, classNameInput }) => {
  return (
    <>
      <label className="form-profile__label-text" htmlFor={input.name}>{label}</label>
      <input {...input} className={classNameInput} id={id} />
      {meta.error && meta.visited && !meta.active && (
        <pre className={"input__error--" + input.name}>{meta.error}</pre>
      )}
    </>
  );
};


export class Profile extends React.Component {

  onSubmit = (values, functions) => {
    const { name, number, date, cvc } = values;
    console.log( name, number, date, cvc);
    this.props.saveCard({
      cardName: name,
      cardNumber: number,
      expiryDate: date,
      cvc: cvc
    });
  }

  componentDidMount() {
    this.props.cardUpdatedToFalse();
  }

  validate = (values) => {
    const errors = {};

    if (!values.name) {
      errors.name = "Заполните имя ";
    }

    if (!values.number) {
      errors.number = "Заполните номер карты ";
    } else if (values.number.length < 19) {
      errors.number = "Заполните номер карты 16 цифр";
    }

    if (!values.date) {
      errors.date = "Заполните дату ";
    } else if (values.date.length > 4){
      
      const month = values.date.substr(0,2);
      const year = values.date.substr(3,2);
      if (Number(month) > 12 || Number(month) < 1) errors.date = "Некорректный месяц";
      else if (Number(year) < 21) errors.date = "Некорректный год";
    }

    if (!values.cvc) {
      errors.cvc = "Заполните CVC";
    } else if (values.cvc.length !== 3) {
      errors.cvc = "CVC 3 цифры";
    }

    return errors;
  }

  formatNumber = (value) => {
    if (value) {
      if ((!/^[0-9]+$/.test(value[value.length - 1]) && value[value.length - 1] !== " ")) value = value.substr(0, value.length - 1);
      if (value[4] !== " " && value.length > 4) value = value.substr(0, 4) + " " + value.substr(4);
      if (value[9] !== " " && value.length > 9) value = value.substr(0, 9) + " " + value.substr(9);
      if (value[14] !== " " && value.length > 14) value = value.substr(0, 14) + " " + value.substr(14);
      if (value.length === 20) value = value.substr(0, value.length - 1);
      return value;
    }
  };

  formatDate = (value) => {
    if (value) {
      if ((!/^[0-9]+$/.test(value[value.length - 1]) && value[value.length - 1] !== " ")) value = value.substr(0, value.length - 1);
      if (value[2] !== "/" && value.length > 2) value = value.substr(0, 2) + "/" + value.substr(2);
      if (value.length === 6) value = value.substr(0, value.length - 1);
      return value;
    }
  };

  formatCVC = (value) => {
    if (value) {
      if ((!/^[0-9]+$/.test(value[value.length - 1]) && value[value.length - 1] !== " ")) value = value.substr(0, value.length - 1);
      if (value.length === 4) value = value.substr(0, value.length - 1);
      return value;
    }
  };

  render() {
    return (<>
      <div className="profile-wrapper">
        {this.props.card.updated ? (
          <div className="profile profile-updated">
            <div className="profile__title-updated">Профиль</div>
            <div className="profile__subtitile-updated">Платёжные данные обновлены. Теперь вы можете заказывать такси.</div>
            <Link className="profile__btn-updated form-profile__submit" to="/map">Перейти на карту</Link>
          </div>
        ) : (
          <div className="profile">
            <Form
              onSubmit={this.onSubmit}
              initialValues={{ cvc: this.props.card.cvc, number: this.props.card.cardNumber, name: this.props.card.cardName, date: this.props.card.expiryDate }}
              validate={this.validate}
              render={({ handleSubmit, pristine, invalid, values }) => (
                <form className="form-profile" onSubmit={handleSubmit}>
                  <div className="form-profile__title">Профиль</div>
                  <div className="form-profile__title-text">Введите платежные данные</div>
                  <div className="form-profile__body">
                    <div className="form-profile__left">
                      <Field classNameInput="form-profile__input input" id="name" type="text" name="name" size="28" label="Имя владельца" component={InputCard} />
                      <Field classNameInput="form-profile__input input" id="number" type="text" name="number" size="28" label="Номер карты" format={this.formatNumber} component={InputCard} />
                      <div className="form-profile__row">
                        <div className="form-profile__column">
                          <Field classNameInput="form-profile__input form-profile__input--row input" id="date" type="text" name="date" size="28" label="MM/YY" format={this.formatDate} component={InputCard} />
                        </div>
                        <div className="form-profile__column">
                          <Field classNameInput="form-profile__input form-profile__input--row input" id="cvc" type="text" name="cvc" size="28" label="CVC" format={this.formatCVC} component={InputCard} />
                        </div>
                      </div>
                    </div>
                    <div className="form-profile__right">
                      <div className="card">
                        <div className="card__row">
                          <CardLogo />
                          <div className="card__date">
                            {this.formatDate(values.date)}
                          </div>
                        </div>
                        <div className="card__row card__row--number">
                          {this.formatNumber(values.number)}
                        </div>
                        <div className="card__row card__row--icons">
                          <CardChip />
                          <CardMC />
                        </div>
                      </div>
                    </div>
                  </div>
                  <input className="form-profile__submit" type="submit" value="Сохранить" />
                </form>
              )}
            />
          </div>
        )}


      </div>
    </>
    );
  }
}

export const ProfileWithAuth = connect(
  (state) => ({ card: state.card.card }),
  { saveCard, cardUpdatedToFalse }
)(Profile)