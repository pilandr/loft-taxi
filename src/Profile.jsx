import React from "react";
import './Profile.css';
import { connect } from "react-redux";
import { saveCard, cardUpdatedToFalse } from "./actions";
import { Link } from 'react-router-dom';
import { ReactComponent as CardLogo } from "./img/card_logo.svg";
import { ReactComponent as CardChip } from "./img/card_chip.svg";
import { ReactComponent as CardMC } from "./img/card_mc.svg";

export class Profile extends React.Component {
  state = {card: this.props.card};


  componentDidMount() {
    this.props.cardUpdatedToFalse();
  }


  handleNameChange = event => {
    this.setState({ card: {
      ...this.state.card,
      cardName: event.target.value
    }});
  };

  handleNumberChange = event => {
    if (event.target.selectionEnd === 5 || event.target.selectionEnd === 10 || event.target.selectionEnd === 15) event.target.value += " ";
    if (event.target.selectionEnd === 21) return
    this.setState({ card: {
      ...this.state.card,
      cardNumber: event.target.value
    }});
  };

  handleDateChange = event => {
    if (event.target.selectionEnd === 2) event.target.value += "/";
    if (event.target.selectionEnd === 6) return
    this.setState({ card: {
      ...this.state.card,
      expiryDate: event.target.value
    }});
  };

  handleCVCChange = event => {
    if (event.target.selectionEnd > 3 ) return
    this.setState({ card: {
      ...this.state.card,
      cvc: event.target.value
    }});
  };

  onSave = (e) => {
    e.preventDefault();
    const { name, number, date, cvc } = e.target;
    this.props.saveCard({
      cardName: name.value,
      cardNumber: number.value,
      expiryDate: date.value,
      cvc: cvc.value
    });
  }

  render() {
    return ( <>
          <div className="profile-wrapper">
              {this.props.card.updated ? (
                <div className="profile profile-updated">
                  <div className="profile__title-updated">Профиль</div>
                  <div className="profile__subtitile-updated">Платёжные данные обновлены. Теперь вы можете заказывать такси.</div>
                  <Link className="profile__btn-updated form-profile__submit" to="/map">Перейти на карту</Link>
                </div>
              ) : (
                <div className="profile">
                  <form className="form-profile" onSubmit={this.onSave}>
                  <div className="form-profile__title">Профиль</div>
                  <div className="form-profile__title-text">Введите платежные данные</div>
                  <div className="form-profile__body">
                    <div className="form-profile__left">
                      <label className="form-profile__label-text" htmlFor="name">Имя владельца</label>
                      <input className="form-profile__input input" id="name" type="text" name="name" size="28" value={this.state.card.cardName} onChange={this.handleNameChange} />
                      <label className="form-profile__label-text" htmlFor="number">Номер карты</label>
                      <input className="form-profile__input input" id="number" type="text" name="number" size="28" value={this.state.card.cardNumber} onChange={this.handleNumberChange} />
                      <div className="form-profile__row">
                        <div className="form-profile__column">
                          <label className="form-profile__label-text" htmlFor="date">MM/YY</label>
                          <input className="form-profile__input form-profile__input--row input" id="date" type="text" name="date" size="28" value={this.state.card.expiryDate} onChange={this.handleDateChange} />
                        </div>
                        <div className="form-profile__column">
                          <label className="form-profile__label-text" htmlFor="cvc">CVC</label>
                          <input className="form-profile__input form-profile__input--row input" id="cvc" type="text" name="cvc" size="28" value={this.state.card.cvc} onChange={this.handleCVCChange} />
                        </div>
                      </div>
                    </div>
                    <div className="form-profile__right">
                      <div className="card">
                        <div className="card__row">
                            <CardLogo />
                          <div className="card__date">
                            {this.state.card.expiryDate}
                          </div>
                        </div>
                        <div className="card__row card__row--number">
                          {this.state.card.cardNumber}
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
              </div>
              )}
              
            
          </div>
    </>
    );
  }
}

export const ProfileWithAuth = connect(
  (state) => ({ card: state.auth.card}),
  { saveCard, cardUpdatedToFalse }
)(Profile)