import React from "react";
import './Profile.css';
import { connect } from "react-redux";
import { logOut, saveCard } from "./actions";

export class Profile extends React.Component {
  state = {card: this.props.card};

  handleNameChange = event => {
    this.setState({ card: {
      cardName: event.target.value
    }});
  };

  handleNumberChange = event => {
    this.setState({ card: {
      cardNumber: event.target.value
    }});
  };

  handleDateChange = event => {
    this.setState({ card: {
      expiryDate: event.target.value
    }});
  };

  handleCVCChange = event => {
    this.setState({ card: {
      cvc: event.target.value
    }});
  };

  onSave = (e) => {
    e.preventDefault();
    const { name, number, date, cvc } = e.target;
    console.log(name.value, number.value, date.value, cvc.value);
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
                  <div className="form-profile__right"></div>
                </div>
                <input className="form-profile__submit" type="submit" value="Сохранить" />
              </form>
            </div>
          </div>
    </>
    );
  }
}

export const ProfileWithAuth = connect(
  (state) => ({ card: state.auth.card}),
  { logOut, saveCard }
)(Profile)